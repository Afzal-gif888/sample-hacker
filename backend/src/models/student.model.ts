import mongoose, { Document, Schema } from 'mongoose';
import { Student } from '../types/student.types';

export interface StudentDocument extends Omit<Student, '_id'>, Document {}

const SUPPORTED_BRANCHES = [
  'Computer Science Engineering',
  'Information Technology',
  'Electronics & Communication Engineering',
  'Electrical & Electronics Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Other'
];

const studentSchema = new Schema<StudentDocument>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    collegeName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    branch: {
      type: String,
      required: true,
      trim: true,
      enum: SUPPORTED_BRANCHES
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Compound index to prevent duplicate registrations in the same college
studentSchema.index({ collegeName: 1, rollNumber: 1 }, { unique: true });

export const StudentModel = mongoose.model<StudentDocument>('Student', studentSchema);
