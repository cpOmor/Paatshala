import { Schema } from 'mongoose';
import { USER_ROLE } from './user.constant';
import { BaseType } from '../../utils/utils.interface';

export type TVerification = BaseType & {
  code: string;
  verification: boolean;
  expired: Date;
};

//  Represents a user type.
export type TUser = BaseType & {
  profileId: Schema.Types.ObjectId;
  email: string;
  alterNumber: string;
  role: 'user' | 'admin';
  password: string;
  status: 'in-progress' | 'blocked';
  verification?: TVerification;
  rememberPassword: boolean;
};



// Represents a profile type.
export type TProfile = BaseType & {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image?: string;
};

export type TUserRole = keyof typeof USER_ROLE;
