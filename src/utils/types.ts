export interface TypeForRegUser{
  username: string;
  nickname: string;
  password: string;
  adminpass?: string;
  tel?: string;
  ccn?: number;
}

export interface UserResType{
  username: string;
  nickname: string;
  password: string;
  admin: boolean;
  tel: string;
  ccn: number | null;
}

export interface TypeForLogUser {
  nickname: string;
  password: string;
}

export interface FormType {
  username: string
  nickname: string
  password: string
  tel: string
}