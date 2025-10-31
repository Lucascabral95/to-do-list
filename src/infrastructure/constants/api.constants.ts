export const API_ENDPOINTS = {
    TASKS: '/addtasks',
    TASK_BY_ID: (id: string) => `/addtasks/${id}`,
    CREATE_TASK: '/addtasks',
    UPDATE_TASK: (id: string) => `/addtasks/${id}`,
    DELETE_TASK: (id: string) => `/eliminar-tareas/${id}`,
    COMPLETE_TASK: (id: string) => `/eliminar-tareas/${id}`,
} as const;

export const API_CONFIG = {
    TIMEOUT: 10000,
    RETRY_ATTEMPTS: 3,
} as const;
