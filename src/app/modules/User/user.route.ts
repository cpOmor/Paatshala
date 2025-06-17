import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { upload } from '../../utils/sendImageToCloudinary';
import { USER_ROLE } from '../Auth/auth.utils';

const router = express.Router();
 /**
  * This route handles user creation.
  * It expects a request body with user details (e.g., firstName,lastName, phone, email, image, password, ).
  * If the user is created successfully, it returns the created user data.
  * It requires authentication with admin, student, or teacher roles.
  * The request body should be in JSON format.
  */
router.post('/create-user', UserControllers.createUser);

/**
 * This route handles find user.
 * It expects a request body with a params id.
 * If the user is found, it returns the user data.
 */
router.get(
  '/user/:id',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher),
  UserControllers.getUser,
);

// Get a me
router.get('/get-me', auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher), UserControllers.getMe);

// Get all users
router.get('/users', auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher), UserControllers.getUsers);

// Update an existing user
router.put(
  '/update-user',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher),
  UserControllers.updateUser,
);

// Delete a user
router.delete('/delete-user/:id', auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher), UserControllers.deleteUser);

export const userRoutes = router;
