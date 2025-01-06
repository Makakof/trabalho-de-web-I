export interface User extends Partial<Login>{
  id: number;
  name: string;
  email: string;
  dateCreated: Date;
  lastUpdated: Date;
}

export interface Login {
  access_token: string;
  token_type: string;
}

export interface CreateUserDto{
  name: string;
  email: string;
  password: string;
}
