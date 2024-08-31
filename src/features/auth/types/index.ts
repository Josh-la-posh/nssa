import { ActionEnum, UserAccountTypeEnum } from '@/lib/authorization';
import { ApiResponse } from '@/types/api';

export type Country = {
  id: string;
  name: string;
  alpha2code: string;
  alpha3code: string;
  callingCode: string;
  continent: string;
  currencies: string[];
};

export type CountryState = {
  id: string;
  name: string;
};

export type Attachment = {
  id: string;
  type: string;
  name: string;
  url: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type AuthUser = {
  id: string;
  username?: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar?: Attachment;
  age?: number;
  country?: Country;
  gender?: string;
  phoneNumber?: string;
  emailConfirm?: boolean;
  hasChangedPassword?: boolean;
  accountType: UserAccountTypeEnum;
  accountStatus: string;
  roles: AuthRole[];
  school: School | null;
  strategy: string;
  createdAt: Date;
};

export type TokenResponse = {
  accessToken: string;
  expires: number;
  refreshToken: string;
};

export type RefreshTokenResponse = ApiResponse<{
  accessToken: string;
  expires: number;
  refreshToken: string;
}>;

export type UserResponse = ApiResponse<{
  token: TokenResponse;
  user: AuthUser;
}>;

export type AuthPermissionAction = {
  action: ActionEnum;
  description: string;
};

export type AuthPermission = {
  name: string;
  scope: string;
  actions: AuthPermissionAction[];
  description?: string;
};

export type AuthRole = {
  id: string;
  name: string;
  description: string;
  permissions: AuthPermission[];
  createdBy?: AuthUser;
  autoCreated: boolean;
  school: School;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type School = {
  id: string;
  name: string;
  code: string;
  motto: string;
  logo: Attachment;
  colorCode: string;
  phoneNumber: string;
  zipCode: string;
  address: string;
  city: string;
  state: CountryState;
  country: Country;
  status: SchoolStatus;
  createdAt: Date;
};

export enum SchoolStatus {
  ACTIVE,
  BANNED,
  SUSPENDED,
  SUBSCRIPTION_EXPIRED,
}
