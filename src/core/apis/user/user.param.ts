import { IUser } from "src/types/auth.type";

export interface aUserParam {
  userId: string;
}

export interface updatePasswordParam {
  pw: string;
}

export interface updateGenerationParam {
  generation: number;
}

export interface UserResponse extends Response {
  data: IUser;
}
