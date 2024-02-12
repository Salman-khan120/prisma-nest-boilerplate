export type JwtPayload = {
  email: string;
};

export type UserIntoRoleBasedGuard = {
  email: string;
  id: number;
  role: string;
  name: string;
  status: boolean;
};
