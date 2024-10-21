import express from 'express'

import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAllJob, postJob,getJobById, getAdminJobs } from '../controllers/job.controller.js';
const router=express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJob);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);

export default router;