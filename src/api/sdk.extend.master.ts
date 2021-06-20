import { sdk } from "./sdk";
import { 
  LanguageResponse 
} from "../models"; 
import axios from "axios";
import { GET_LANGUAGES } from "../constants";

export class MasterSDK extends sdk {
  constructor() {
    super();
  }
  private static _masterInstance: MasterSDK = new MasterSDK();
  public static getInstance(): MasterSDK {
    return MasterSDK._masterInstance;
  }
 
  setUrl(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      withCredentials: false,
    });
  }
   
  // Get all languages
  public async getLanguages(): Promise<LanguageResponse> {
    try {
      let response = await this.doFetch<LanguageResponse>(GET_LANGUAGES);
      return response;
    } catch (error) {      
      return Promise.reject(`${error}`);
    }
  }
 
}
