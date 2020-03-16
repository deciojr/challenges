export interface User {
  id?: string | number;
  email: string;
  password?: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
  secretQuestion: string;
  secretAnswer: string;
}
