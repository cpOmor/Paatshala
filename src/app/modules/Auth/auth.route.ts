import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './auth.utils';

const router = express.Router();



// Route: Login a user and return an access token
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema), // Validates the login request body (e.g., email and password)
  AuthControllers.loginUser, // Controller handles the login logic
);

// Route: Log out a user by clearing tokens or sessions
router.post('/logout', AuthControllers.logoutUser); // Controller handles logout logic

// Route: Refresh access token using a refresh token
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema), // Validates the refresh token request
  AuthControllers.refreshToken, // Controller generates a new access token
);

// Route: Verify a user's account using a verification code
// This is typically used after registration to confirm the user's email
// code expire time is 5 minutes

router.post(
  '/verification',
  // validateRequest(AuthValidation.verificationSchema), // Optional: Validate the verification request body
  AuthControllers.verification, // Controller verifies the user's account
);

// Route: Request a password reset (forget password)
router.post(
  '/forget-password',
  AuthControllers.forgerPassword, // Controller handles sending a password reset email or code
);

// Route: Verify the code sent for password reset
router.put(
  '/new-password-verification',
  AuthControllers.verificationForgetPassword, // Controller verifies the reset password code
);

// Route: Set a new password after verification
router.post(
  '/set-new-password',
  AuthControllers.setNewPassword, // Controller allows the user to set a new password
);

// Route: Resend the account verification code
// This is useful if the user did not receive the initial verification code
// or if it has expired
router.put(
  '/resend-verification-code',
  AuthControllers.verificationCodeReSend, // Controller resends a new verification code to the user
);

// Route: Change the password for logged-in users
router.put(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher ), // Middleware ensures the user is authenticated and has the required role
  AuthControllers.changePassword, // Controller updates the user's password
);


export const AuthRoutes = router;
