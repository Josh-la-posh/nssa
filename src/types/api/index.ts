import { AxiosError } from 'axios';

export interface GenericResponse {
  status: number;
  message: string;
}
export interface ApiResponse<TData> extends GenericResponse {
  data: TData;
}

export type APIError = IError | AxiosError;
interface IError extends Error {
  status?: number;
}
