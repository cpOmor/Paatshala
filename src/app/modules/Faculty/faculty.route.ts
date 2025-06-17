import express from 'express';
import { FacultyControllers } from './faculty.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../Auth/auth.utils';

const router = express.Router();

// Create a new user
// This route is typically used for admin to create users
// or for user registration
router.post('/create-faculty', FacultyControllers.createFaculty);

// Get a single faculty member
router.get(
  '/faculty/:id',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher),
  FacultyControllers.getFaculty,
);

// Get all users
router.get(
  '/faculties',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.teacher),
  FacultyControllers.getFaculties,
);

export const facultyRoutes = router;
