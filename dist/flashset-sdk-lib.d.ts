// Generated by dts-bundle v0.7.3

export class LoginRequest {
    username: string;
    password: string;
}
export class LoginResponse {
    isSuccess: boolean;
    message: string;
    token: string;
    result: {
        displayName: string;
    };
}

export class LanguageResponse {
    isSuccess: boolean;
    message: string;
    result: Array<{
        id: string;
        language: string;
    }>;
}

