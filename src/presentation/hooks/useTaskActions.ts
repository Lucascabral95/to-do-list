// presentation/hooks/useTaskActions.ts

import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { tasksService } from '@/infrastructure/services/tasks.service';
import { MESSAGES } from '@/infrastructure/constants/messages.constants';
import useStore from '../../../zustand';
import { TOAST_CONFIG } from '@/infrastructure/constants';

export const useTaskActions = () => {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [completingId, setCompletingId] = useState<string | null>(null);
    const { setActualizador } = useStore();

    const deleteTask = useCallback(async (id: string): Promise<boolean> => {
        setDeletingId(id);

        try {
            const [data, error] = await tasksService.deleteTask(id);

            if (error) {
                toast.error(MESSAGES.ERRORS.DELETE_TASK);
                return false;
            }

            toast.success(MESSAGES.SUCCESS.TASK_DELETED);
            setActualizador();
            return true;
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
            toast.error(MESSAGES.ERRORS.DELETE_TASK);
            return false;
        } finally {
            setDeletingId(null);
        }
    }, [setActualizador]);

    const completeTask = useCallback(async (id: string): Promise<boolean> => {
        setCompletingId(id);

        try {
            const [data, error] = await tasksService.completeTask(id);

            if (error) {
                toast.error(MESSAGES.ERRORS.COMPLETE_TASK);
                return false;
            }

            toast.success(MESSAGES.SUCCESS.TASK_COMPLETED);
            setActualizador();
            return true;
        } catch (error) {
            console.error('Error al terminar la tarea:', error);
            toast.error(MESSAGES.ERRORS.COMPLETE_TASK);
            return false;
        } finally {
            setCompletingId(null);
        }
    }, [setActualizador]);

    return {
        deleteTask,
        completeTask,
        isDeletingTask: (id: string) => deletingId === id,
        isCompletingTask: (id: string) => completingId === id,
    };
};
