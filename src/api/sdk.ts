import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EventEmitterClass } from "../dispatcher/eventemitter"; 
import { LOGIN_URL, LOGOUT_URL, METHOD } from "../constants";

export class sdk {
  baseUrl: string;
  axiosInstance: AxiosInstance;
  excludeAPIAuthentication = [
    LOGIN_URL,
    LOGOUT_URL 
  ];

  private static _instance: sdk = new sdk();
  public static getInstance(): sdk {
    return sdk._instance;
  }

  constructor() {}

  setBaseUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      withCredentials: true,
    });
  } 
  
  isRequiredAutentication(url: string) {
    return this.excludeAPIAuthentication.indexOf(url) === -1;
  } 
  
  public async doFetch<T>(
    url: string,
    body: any = {},
    method: METHOD = METHOD.GET
  ): Promise<T> {
    let response: AxiosResponse;
    switch (method) {
      case METHOD.POST:
        response = await this.axiosInstance.post<
          Map<string, any>,
          AxiosResponse
        >(url, body);
        break;
      case METHOD.PUT:
        response = await this.axiosInstance.put<
          Map<string, any>,
          AxiosResponse
        >(url, body);
        break;
      case METHOD.DELETE:
        response = await this.axiosInstance.delete<
          Map<string, any>,
          AxiosResponse
        >(url, { data: body });
        break;
      default:
        response = await this.axiosInstance.get<
          Map<string, any>,
          AxiosResponse
        >(url);
        break;
    }

    let data = await response.data;
    if (data && data.message) {      
      if (data.message === "logout") {
        this.onLogout();
      }
    }
    return data as T;
  } 

  onLogout() {     
    try {
      // emit the logout event
      EventEmitterClass.getInstance().emit("logout", null);
    } catch (ex) {
      console.log(ex);
    }
  }
}
