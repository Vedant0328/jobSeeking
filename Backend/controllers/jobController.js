import { catchAsyncError } from '../middlewares/catchAsyncError.js';
import ErrorHandler from '../middlewares/error.js';
import { Job } from '../models/jobSchema.js';

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === 'Job Seeker') {
    return next(
      new ErrorHandler(
        'Job Seeker in not allowed to access this resources',
        400
      )
    );
  }

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryUpto,
  } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler('Please provide all job deatails', 400));
  }

  if ((!salaryFrom || !salaryUpto) && !fixedSalary) {
    return next(new ErrorHandler('Please Provide salary details'));
  }

  if (salaryFrom && salaryUpto && fixedSalary) {
    return next(
      new ErrorHandler('Cannot enter fixed salary and ranged salary together')
    );
  }

  const PostedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryUpto,
    PostedBy,
  });
  res.status(200).json({
    success: true,
    message: 'Job posted successfully',
    job,
  });
});

export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === 'Job Seeker') {
    return next(
      new ErrorHandler(
        'Job Seeker in not allowed to access this resources',
        400
      )
    );
  }
  const myjobs = await Job.find({ PostedBy: req.user._id });
  res.status(200).json({
    success: true,
    myjobs,
  });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === 'Job Seeker') {
    return next(
      new ErrorHandler(
        'Job Seeker in not allowed to access this resources',
        400
      )
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }

  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    job,
    message: 'Job Details Updated Successfully',
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === 'Job Seeker') {
    return next(
      new ErrorHandler(
        'Job Seeker in not allowed to access this resources',
        400
      )
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler('Job not found', 404));
  }
  job = await Job.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: 'Job Deleted Successfully',
  });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler('Job not Found', 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler('Invalid Id', 400));
  }
});
