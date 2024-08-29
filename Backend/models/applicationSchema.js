import mongoose from 'mongoose';
import validator from 'validator';

const applicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
  },
  email: {
    type: String,
    validator: [validator.isEmail < 'Please enter a valid email'],
    required: [true, 'Please provide your email'],
  },
  coverLetter: {
    type: String,
    required: [true, 'Please provide your cover letter'],
  },
  phone: {
    type: Number,
    required: [true, 'Please provide a phone number'],
  },
  address: {
    type: String,
    required: [true, , 'Please provide a address'],
  },
  resume: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  applicantID: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['Job Seeker'],
      required: true,
    },
  },
  employerID: {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    role: {
      type: String,
      enum: ['Employer'],
      required: true,
    },
  },
});

export const Application = mongoose.model('Application', applicationSchema);
