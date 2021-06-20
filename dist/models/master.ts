export class LanguageResponse {
  isSuccess: boolean;
  message: string;
  result: Array<{
    id:string,
    language: string; 
  }>;
}
