export interface TokenReissuanceParam {
  refreshToken: string;
}

export interface LoginParam {
  id: string | undefined;
  pw: string | undefined;
}

export interface RegisterParam {
  userId: string | undefined;
  name: string | undefined;
  pw: string | undefined;
  generation: string | undefined;
}
