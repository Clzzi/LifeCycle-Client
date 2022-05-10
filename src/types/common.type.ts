export interface Response {
  status: number;
  message: string;
}
export interface IToast {
  id?: string;
  content: string;
  duration?: number;
  bottom?: number;
}