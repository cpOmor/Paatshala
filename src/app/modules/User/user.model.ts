import { Schema, model } from 'mongoose';
import { TProfile, TUser } from './user.interface';

const userSchema = new Schema<TUser & TProfile>(
  {
    profileId: {
      type: Schema.Types.ObjectId,
      ref: 'Profiles',
      // required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    alterNumber: {
      type: String,
      required: false,
      trim: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      trim: true,
    },
    status: {
      type: String,
      enum: ['blocked', 'in-progress'],
      default: 'in-progress',
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
      minlength: 8,
      trim: true,
    },
    verification: {
      code: { type: String },
      expired: { type: Date },
      verification: { type: Boolean },
    },
    rememberPassword: {
      type: Boolean,
      default: false,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const profileSchema = new Schema<TProfile>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const Profile = model<TProfile>('Profiles', profileSchema);
export const User = model<TUser & TProfile>('Users', userSchema);
