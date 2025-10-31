export const TASK_PRIORITIES = {
    P1: 'Prioridad 1',
    P2: 'Prioridad 2',
    P3: 'Prioridad 3',
    NONE: '',
} as const;

export const TASK_STATUS = {
    PENDING: 'Pendiente',
    IN_PROGRESS: 'En progreso',
    COMPLETED: 'Completada',
} as const;

export const VALIDATION_RULES = {
    TITULO: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 100,
    },
    DESCRIPCION: {
        MAX_LENGTH: 500,
    },
} as const;

export const TOAST_CONFIG = {
    DURATION: 3500,
    POSITION: 'top-center' as const,
    STYLE: {
        fontWeight: 600,
    },
} as const;

export const PRIORITY_OPTIONS = [
    { key: 'p1', label: 'Prioridad 1', value: TASK_PRIORITIES.P1 },
    { key: 'p2', label: 'Prioridad 2', value: TASK_PRIORITIES.P2 },
    { key: 'p3', label: 'Prioridad 3', value: TASK_PRIORITIES.P3 },
    { key: 'none', label: 'Ninguna prioridad', value: TASK_PRIORITIES.NONE, isDanger: true },
] as const;
