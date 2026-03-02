interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  toDoes: Task[];
  // createdDate:any,
  // lastModifiedDate:any,
  roles: Role[];
}
export interface LoggedUser {
  jwtToken: string;
  loggedUser: User;
}
export interface Role {
  id: number;
  name: string;
  users: User[];
  createdDate: any;
  lastModifiedDate: any;
}
export interface Task {
  id: number;
  name: string;
  category: string;
  subTasks: SubTask[];
  fromTime: string;
  toTime: string;
  done: boolean;
}
export interface SubTask {
  id: number;
  name: string;
  fromTime: string;
  toTime: string;
  done: boolean;
}
