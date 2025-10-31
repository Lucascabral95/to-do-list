// presentation/hooks/useFilteredTasks.ts

import { useState, useEffect, useMemo } from 'react';
import { useTasks } from './useTasks';
import type { Task } from '@/infrastructure/types/task.types';

export type TaskFilter = 'todas' | 'Terminada' | 'Pendiente' | 'sinRealizar';

export const useFilteredTasks = () => {
    const [filter, setFilter] = useState<TaskFilter>('todas');
    const { tasks, loading, error, isEmpty, refetch } = useTasks();

    const filteredTasks = useMemo(() => {
        if (!tasks.length) return [];
        
        let filtered = [...tasks];
        
        switch (filter) {
            case 'Terminada':
                filtered = tasks.filter(task => task.estado === 'Terminada');
                break;
            case 'Pendiente':
                filtered = tasks.filter(task => task.estado === 'Pendiente');
                break;
            case 'sinRealizar':
                filtered = tasks.filter(task => 
                    task.estado === 'Pendiente' && 
                    new Date(task.fechaDeTarea) < new Date()
                );
                break;
            case 'todas':
            default:
                filtered = tasks;
                break;
        }
        
        // Sort by date (newest first)
        return filtered.sort((a, b) => 
            new Date(b.fechaDeTarea).getTime() - new Date(a.fechaDeTarea).getTime()
        );
    }, [tasks, filter]);

    const getFilterColor = (): 'default' | 'success' | 'warning' | 'danger' => {
        switch (filter) {
            case 'Terminada':
                return 'success';
            case 'Pendiente':
                return 'warning';
            case 'sinRealizar':
                return 'danger';
            case 'todas':
            default:
                return 'default';
        }
    };

    const isTaskOverdue = (task: Task): boolean => {
        return task.estado === 'Pendiente' && 
               new Date(task.fechaDeTarea) < new Date();
    };

    return {
        tasks: filteredTasks,
        loading,
        error,
        isEmpty: !loading && filteredTasks.length === 0,
        filter,
        setFilter,
        filterColor: getFilterColor(),
        refetch,
        isTaskOverdue,
    };
};
