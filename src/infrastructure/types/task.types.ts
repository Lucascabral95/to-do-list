export type TaskPriority = 'Prioridad 1' | 'Prioridad 2' | 'Prioridad 3' | '';

export type TaskStatus = 'Pendiente' | 'En progreso' | 'Terminada';

export interface ApiError {
    message: string;
    code?: string;
    statusCode?: number;
}

export interface Task {
    _id: string;
    tarea: string;
    descripcion?: string;
    estado: TaskStatus;
    prioridad: TaskPriority;
    fechaDeTarea: string;
    client: string;
    projects?: string;
    createdAt: string;
    updatedAt: string;
}

export interface TasksResponse {
    tasks: Task[];
    total?: number;
}

export interface CreateTaskPayload {
    tarea: string;
    descripcion?: string;
    estado: TaskStatus;
    prioridad: TaskPriority;
    fechaDeTarea: string;
    client: string;
    projects?: string;
}

export interface TaskFormData {
    titulo: string;
    descripcion: string;
    prioridad: TaskPriority;
    vencimiento: string;
}

export interface TaskFormErrors {
    titulo?: string;
    descripcion?: string;
    prioridad?: string;
    vencimiento?: string;
}
