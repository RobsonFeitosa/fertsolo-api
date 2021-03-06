export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  old_password?: string;
  level: 1 | 2;
  cpf: string;
  phone_number: string;
  actived: boolean;
}
