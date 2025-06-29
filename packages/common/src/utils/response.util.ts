export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp?: string;
  error?: any;
}

export function createSuccessResponse<T>(
  data: T,
  message?: string,
): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message || 'Operation successful',
    timestamp: new Date().toISOString(),
  };
}

export function createErrorResponse(
  message: string,
  error?: any,
): ApiResponse {
  return {
    success: false,
    message,
    error,
    timestamp: new Date().toISOString(),
  };
}