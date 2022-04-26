export interface IRegisterUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IRegisterUserResponse {
  data: IData;
  token: string;
}
