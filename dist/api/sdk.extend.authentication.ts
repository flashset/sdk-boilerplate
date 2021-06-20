import { sdk } from "./sdk";
import {
  LoginResponse,
  LoginRequest
} from "../models";  
import { LOGIN_URL, LOGOUT_URL, METHOD } from "../constants";

export class AuthenticationSDK extends sdk {
  constructor() {
    super();
  } 
  private static _authenticationInstance: AuthenticationSDK = new AuthenticationSDK();
  public static getInstance(): AuthenticationSDK {
    return AuthenticationSDK._authenticationInstance;
  }

  public async login(
    username: string,
    password: string
  ): Promise<LoginResponse> {
    try {
      let model = new LoginRequest();
      model.username = username;
      model.password = password;

      let response = await this.doFetch<LoginResponse>(
        LOGIN_URL,
        model,
        METHOD.POST
      ); 
      if (typeof response.result === "object") { 
        return response;
      } else { 
        return Promise.reject(`Error occurred in login ${response.message}`);
      }
    } catch (error) { 
      return Promise.reject(`${error}`);
    }
  }

  public async logout() {
    try {
      await this.doFetch<any>(
        LOGOUT_URL,
        {},
        METHOD.POST
      ); 
    } catch (error) { 
      return Promise.reject(`${error}`);
    }
  } 
}
