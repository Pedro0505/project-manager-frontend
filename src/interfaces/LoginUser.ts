export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  uuid?: string;
  logging: boolean;
}

export interface IUserAuth0 {
  email: string;
  uuid?: string;
}
