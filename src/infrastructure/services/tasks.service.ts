// infrastructure/services/tasks.service.ts

import { apiService } from './api.service';
import { API_ENDPOINTS } from '../constants/api.constants';
import type { Task, TasksResponse, CreateTaskPayload } from '../types/task.types';
import { ApiError } from 'next/dist/server/api-utils';
import { Result } from '../types';

export class TasksService {
    async getTasks(): Promise<Result<TasksResponse, ApiError>> {
        return apiService.get<TasksResponse>(API_ENDPOINTS.TASKS);
    }

    async getTaskById(id: string): Promise<Result<Task, ApiError>> {
        return apiService.get<Task>(API_ENDPOINTS.TASK_BY_ID(id));
    }

    async createTask(payload: CreateTaskPayload): Promise<Result<Task, ApiError>> {
        return apiService.post<Task>(API_ENDPOINTS.CREATE_TASK, payload);
    }

    async updateTask(id: string, payload: Partial<Task>): Promise<Result<Task, ApiError>> {
        return apiService.put<Task>(API_ENDPOINTS.UPDATE_TASK(id), payload);
    }

    async deleteTask(id: string): Promise<Result<void, ApiError>> {
        return apiService.delete<void>(API_ENDPOINTS.DELETE_TASK(id));
    }

    async completeTask(id: string): Promise<Result<Task, ApiError>> {
        return apiService.put<Task>(API_ENDPOINTS.COMPLETE_TASK(id));
    }
}

export const tasksService = new TasksService();
