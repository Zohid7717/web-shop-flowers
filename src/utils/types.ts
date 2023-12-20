export interface TypeForRegUser{
  username: string;
  nickname: string;
  password: string;
  adminpass?: string;
  tel?: string;
  ccn?: number | null | string;
}

export interface UserResType{
  username: string;
  nickname: string;
  password: string;
  admin: boolean;
  tel: string;
  ccn: number | null | string;
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

export interface BouquetSizeType{
  size_used: boolean
  size_name: string
  size_price: number
  discount_price?: number
}

export interface BouquetType {
  name: string
  category: string
  composition: FlowerType[]
  size: BouquetSizeType[]
  count?: number
  status?: string
  flower_img: string[]
}

export interface FlowerType{
  _id: string
  flower_name: string
}