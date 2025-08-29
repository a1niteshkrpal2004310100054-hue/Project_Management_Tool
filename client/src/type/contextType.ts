export  interface User {
  _id: string;
  name: string;
  email: string;
}

export  interface AuthContext {
  user: User | null;
  loading: boolean;
}


