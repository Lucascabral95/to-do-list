import { useState, useEffect, useCallback } from 'react';
import { tasksService } from '@/infrastructure/services/tasks.service';
import { MESSAGES } from '@/infrastructure/constants/messages.constants';
import type { Task } from '@/infrastructure/types/task.types';
import type { AsyncState } from '@/infrastructure/types/common.types';
import useStore from '../../../zustand';
import { filterTasksByToday } from '../utils';

export const useTodayTasks = () => {
    const [state, setState] = useState<AsyncState<Task[]>>({
        data: null,
        loading: false,
        error: {
            message: "",
            statusCode: 0,
        },
    });

    const { actualizador } = useStore();

    const fetchTodayTasks = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const [data, error] = await tasksService.getTasks();

        if (error) {
            setState({
                data: null,
                loading: false,
                error: {
                    message: error.message || MESSAGES.ERRORS.FETCH_TASKS,
                    statusCode: error.statusCode,
                },
            });
            return;
        }

        const todayTasks = filterTasksByToday(data?.tasks || []);

        setState({
            data: todayTasks,
            loading: false,
            error: null,
        });
    }, []);

    useEffect(() => {
        fetchTodayTasks();
    }, [actualizador, fetchTodayTasks]);

    const isEmpty = !state.loading && (!state.data || state.data.length === 0);

    return {
        tasks: state.data || [],
        loading: state.loading,
        error: state.error,
        isEmpty,
        refetch: fetchTodayTasks,
    };
};
