
import { useState, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { tasksService } from '@/infrastructure/services/tasks.service';
import type { TaskFormData, CreateTaskPayload } from '@/infrastructure/types/task.types';
import useStore from '../../../zustand';
import { TASK_PRIORITIES, TASK_STATUS } from '@/infrastructure/constants/tasks.constants';
import { adjustDateForBackend } from '../utils';

interface UseCreateTaskProps {
    onSuccess?: () => void;
    childrenProject?: string;
}

export const useCreateTask = ({ onSuccess, childrenProject }: UseCreateTaskProps = {}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();
    const { setActualizador } = useStore();

    const createTask = useCallback(async (formData: TaskFormData): Promise<boolean> => {
        if (!session?.user?.id) {
            toast.error('Mensaje', {
                duration: 3500,
                position: 'top-center',
                style: {
                    fontWeight: 600,
                },
            });
            return false;
        }

        setIsSubmitting(true);

        try {
            const payload: CreateTaskPayload = {
                tarea: formData.titulo,
                descripcion: formData.descripcion,
                estado: TASK_STATUS.PENDING,
                prioridad: formData.prioridad || TASK_PRIORITIES.P1,
                fechaDeTarea: adjustDateForBackend(formData.vencimiento),
                client: session.user.id,
                projects: childrenProject,
            };

            const [data, error] = await tasksService.createTask(payload);

            if (error) {
                toast.error('Mensaje', {
                    duration: 3500,
                    position: 'top-center',
                    style: {
                        fontWeight: 600,
                    },
                });
                return false;
            }

            toast.success('Tarea creada', {
                duration: 3500,
                position: 'top-center',
                style: {
                    fontWeight: 600,
                },
            });
            setActualizador();
            onSuccess?.();
            return true;
        } catch (error) {
            console.error('Error al crear la tarea:', error);
            toast.error('Error al crear la tarea', {
                duration: 3500,
                position: 'top-center',
                style: {
                    fontWeight: 600,
                },
            });
            return false;
        } finally {
            setIsSubmitting(false);
        }
    }, [session, childrenProject, setActualizador, onSuccess]);

    return {
        createTask,
        isSubmitting,
    };
};
