export interface RequestUser extends Request {
  user: Payload;
}

export interface Payload {
  id: string;
  name: string;
  email: string;
  role: string;
}
