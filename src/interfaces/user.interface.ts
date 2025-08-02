import type { Role } from "../enums/role.enum";

export interface UpdateUserRoleInterface {
  role: Role;
}

export interface UserInterface {
  id: number;
  userName: string;
  email: string;
  profileImage?: string;
  role: string;
  UserPlan: string;
  isPaid: boolean;
  isBlocked: boolean;
  googleId?: string;
  createdAt: string;
  updatedAt: string;
}
