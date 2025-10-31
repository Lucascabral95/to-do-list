
import { useState, useCallback } from 'react';
import type { TaskFormData, TaskFormErrors, TaskPriority } from '@/infrastructure/types/task.types';
import { getTodayISO, hasErrors, validateTaskForm } from '../utils';

const initialFormState: TaskFormData = {
    titulo: '',
    descripcion: '',
    prioridad: '',
    vencimiento: getTodayISO(),
};

export const useTaskForm = () => {
    const [formData, setFormData] = useState<TaskFormData>(initialFormState);
    const [errors, setErrors] = useState<TaskFormErrors>({});
    const [touched, setTouched] = useState<Record<keyof TaskFormData, boolean>>({
        titulo: false,
        descripcion: false,
        prioridad: false,
        vencimiento: false,
    });

    const setTitulo = useCallback((value: string) => {
        setFormData(prev => ({ ...prev, titulo: value }));
        setTouched(prev => ({ ...prev, titulo: true }));
    }, []);

    const setDescripcion = useCallback((value: string) => {
        setFormData(prev => ({ ...prev, descripcion: value }));
        setTouched(prev => ({ ...prev, descripcion: true }));
    }, []);

    const setPrioridad = useCallback((value: TaskPriority) => {
        setFormData(prev => ({ ...prev, prioridad: value }));
        setTouched(prev => ({ ...prev, prioridad: true }));
    }, []);

    const setVencimiento = useCallback((value: string) => {
        setFormData(prev => ({ ...prev, vencimiento: value }));
        setTouched(prev => ({ ...prev, vencimiento: true }));
    }, []);

    const validateForm = useCallback((): boolean => {
        const validationErrors = validateTaskForm(formData);
        setErrors(validationErrors);
        return !hasErrors(validationErrors);
    }, [formData]);

    const resetForm = useCallback(() => {
        setFormData(initialFormState);
        setErrors({});
        setTouched({
            titulo: false,
            descripcion: false,
            prioridad: false,
            vencimiento: false,
        });
    }, []);

    const getFieldError = useCallback((field: keyof TaskFormData): string | undefined => {
        return touched[field] ? errors[field] : undefined;
    }, [errors, touched]);

    return {
        formData,
        errors,
        touched,
        setTitulo,
        setDescripcion,
        setPrioridad,
        setVencimiento,
        validateForm,
        resetForm,
        getFieldError,
        isValid: !hasErrors(errors),
    };
};
