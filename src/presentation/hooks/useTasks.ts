// presentation/hooks/useTasks.ts

import { useState, useEffect, useCallback } from 'react';
import { tasksService } from '@/infrastructure/services/tasks.service';
import { MESSAGES } from '@/infrastructure/constants/messages.constants';
import type { Task } from '@/infrastructure/types/task.types';
import type { AsyncState } from '@/infrastructure/types/common.types';
import useStore from '../../../zustand';


export const useTasks = () => {
    const [state, setState] = useState<AsyncState<Task[]>>({
        data: null,
        loading: true,
        error: null,
    });

    const { actualizador } = useStore();

    const fetchTasks = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const [data, error] = await tasksService.getTasks();

        if (error) {
            setState({
                data: null,
                loading: false,
                error: {
                    message: error.message || MESSAGES.ERRORS.FETCH_TASKS,
                    code: error.code,
                    statusCode: error.statusCode,
                },
            });
            return;
        }

        setState({
            data: data?.tasks || [],
            loading: false,
            error: null,
        });
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [actualizador, fetchTasks]);

    const isEmpty = !state.loading && (!state.data || state.data.length === 0);

    return {
        tasks: state.data || [],
        loading: state.loading,
        error: state.error,
        isEmpty,
        refetch: fetchTasks,
    };
};
