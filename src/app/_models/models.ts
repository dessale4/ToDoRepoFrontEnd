interface User{
id:number,
firstName:string,
lastName:string,
email:string,
password:string,
toDoes :any,
createdDate:any,
lastModifiedDate:any,
roles:Role[],
}
export interface LoggedUser{
jwtToken:string,
loggedUser: User
}
export interface Role{
  id:number,
  name:string,
  users: User[],
  createdDate: any,
  lastModifiedDate:any
}

export interface RegistrationRequest{
  firstName: string,
  lastName: string,
  email: string,
  password: string
}
