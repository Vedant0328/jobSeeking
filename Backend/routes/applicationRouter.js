import express from 'express';
import {
  employerGetAllApplications,
  jobSeekerDeleteApplications,
  jobseekerGetAllApplications,
  postApplication,
} from '../controllers/applicationController.js';
import { isAuthorized } from '../middlewares/auth.js';

const router = express.Router();

router.get('/jobseeker/getall', isAuthorized, jobseekerGetAllApplications);
router.get('/employer/getall', isAuthorized, employerGetAllApplications);
router.delete('/delete/:id', isAuthorized, jobSeekerDeleteApplications);
router.post('/post', isAuthorized, postApplication);

export default router;
