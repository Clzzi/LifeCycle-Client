export interface RegisterValues {
  id: string | undefined;
  pw: string | undefined;
  name: string | undefined;
  generation: number | undefined;
  isTermsCheck: boolean | undefined;
}

export interface LoginValues {
  id: string | undefined;
  pw: string | undefined;
}

export interface IToken {
  refreshToken: string;
  token: string;
}

export interface IUser {
  userId: string;
  name: string;
  generation: number;
  resume: {
    idx: number;
    createdAt: string;
    title: string;
    company: string;
    stack: string;
    thumbnail: string;
    content: string;
  };
}

export interface ILogin extends IToken {
  user: IUser;
}
