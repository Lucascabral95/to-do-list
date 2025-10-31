import { VALIDATION_RULES } from "@/infrastructure/constants";
import { TaskFormData, TaskFormErrors } from "@/infrastructure/types";


export const validateTaskForm = (formData: TaskFormData): TaskFormErrors => {
    const errors: TaskFormErrors = {};

    if (!formData.titulo.trim()) {
        errors.titulo = 'El título es obligatorio';
    } else if (formData.titulo.trim().length < VALIDATION_RULES.TITULO.MIN_LENGTH) {
        errors.titulo = `El título debe tener al menos ${VALIDATION_RULES.TITULO.MIN_LENGTH} caracteres`;
    } else if (formData.titulo.length > VALIDATION_RULES.TITULO.MAX_LENGTH) {
        errors.titulo = `El título no puede exceder ${VALIDATION_RULES.TITULO.MAX_LENGTH} caracteres`;
    }

    if (formData.descripcion && formData.descripcion.length > VALIDATION_RULES.DESCRIPCION.MAX_LENGTH) {
        errors.descripcion = `La descripción no puede exceder ${VALIDATION_RULES.DESCRIPCION.MAX_LENGTH} caracteres`;
    }

    if (!formData.vencimiento) {
        errors.vencimiento = 'La fecha de vencimiento es obligatoria';
    }

    return errors;
};

export const hasErrors = (errors: TaskFormErrors): boolean => {
    return Object.keys(errors).length > 0;
};
