import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter job title'],
  },
  description: {
    type: String,
    required: [true, 'Please enter job description'],
  },
  category: {
    type: String,
    required: [true, 'Job category is required'],
  },
  country: {
    type: String,
    required: [true, 'Job country is required'],
  },
  city: {
    type: String,
    required: [true, 'Job city is required'],
  },
  location: {
    type: String,
    required: [true, 'Job location is required'],
  },
  fixedSalary: {
    type: Number,
    required: false,
  },
  salaryFrom: {
    type: Number,
    required: false,
  },
  salaryUpto: {
    type: Number,
    required: false,
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now,
  },
  PostedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const Job = mongoose.model('Job', jobSchema);
