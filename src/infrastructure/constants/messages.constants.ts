// infrastructure/constants/messages.constants.ts

export const MESSAGES = {
    EMPTY_TASKS: {
        TITLE: '¡Bienvenido!',
        SUBTITLE: 'No tenés tareas pendientes',
    },
    EMPTY_TODAY_TASKS: {
        TITLE: '¡Que nada se te escape hoy!',
        SUBTITLE: 'Anotá tus tareas y convertí el día en un día.',
    },
    ERRORS: {
        FETCH_TASKS: 'Error al cargar las tareas',
        CREATE_TASK: 'Error al crear la tarea',
        UPDATE_TASK: 'Error al actualizar la tarea',
        DELETE_TASK: 'Error al eliminar la tarea',
        COMPLETE_TASK: 'Error al completar la tarea',
        NETWORK_ERROR: 'Error de conexión. Verificá tu internet.',
    },
    SUCCESS: {
        TASK_CREATED: 'Tarea creada',
        TASK_UPDATED: 'Tarea actualizada',
        TASK_DELETED: 'Tarea eliminada',
        TASK_COMPLETED: 'La tarea pasa a estar realizada',
    },
} as const;
