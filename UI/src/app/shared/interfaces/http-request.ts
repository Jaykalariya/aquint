export interface Responsebody<T> {
    // Message: string;
    // ResponseException?: ResponseException;
    // Result?: T;
    // StatusCode: number;
    // Version: number;
    value?: any;
}

export interface ResponseException {
    Details: null;
    ExceptionMessage: string;
    IsError: boolean;
    ValidationErrors: Array<any>;
}

export interface RequestObj {
    uri: string;
    object?: any;
    options?: any; 
    formdata?: FormData;
    baseApiUrl?: string;
    message?: {
      successMessage?: string;
      errorMessage?: string;
      showMessage?: boolean; // pass if you don't want to show any message
    };
}