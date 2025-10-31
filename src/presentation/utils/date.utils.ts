// infrastructure/utils/date.utils.ts

/**
 * Ajusta una fecha agregando un día y devuelve el formato ISO (YYYY-MM-DD)
 */
export const adjustDateForBackend = (dateString: string): string => {
    if (!dateString) {
        return getTodayISO();
    }

    const inputDate = new Date(dateString);
    inputDate.setDate(inputDate.getDate() + 1);
    return inputDate.toISOString().split('T')[0];
};

/**
 * Obtiene la fecha actual en formato ISO (YYYY-MM-DD)
 */
export const getTodayISO = (): string => {
    return new Date().toISOString().split('T')[0];
};

/**
 * Formatea una fecha para el input date HTML5
 */
export const formatDateForInput = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toISOString().split('T')[0];
};

/**
 * Valida si una fecha es válida
 */
export const isValidDate = (dateString: string): boolean => {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
};

/**
 * Compara si una fecha es hoy
 */
export const isToday = (dateString: string): boolean => {
    const taskDate = new Date(dateString);
    const today = new Date();
    return taskDate.toDateString() === today.toDateString();
};

/**
 * Filtra tareas por fecha de hoy
 */
export const filterTasksByToday = <T extends { fechaDeTarea: string }>(tasks: T[]): T[] => {
    return tasks.filter(task => isToday(task.fechaDeTarea));
};
