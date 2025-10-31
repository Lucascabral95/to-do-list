import { ApiError } from "./task.types";

export type AsyncState<T> = {
    data: T | null;
    loading: boolean;
    error: ApiError | null;
};

export type Result<T, E = Error> = [T | null, E | null];
