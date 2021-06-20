export class LoginRequest {
  username: string;
  password: string;
}

export class LoginResponse {
  isSuccess: boolean;
  message: string; 
  token: string; 
}

