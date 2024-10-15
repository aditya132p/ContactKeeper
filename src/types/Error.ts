export interface ErrorResponse {
  error: string;
}

export interface User {
  id?:number;
  company: string;
  email: string;
  title: string;
  name: string;
  phone: string;
}
