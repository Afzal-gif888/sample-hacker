export interface Student {
  _id?: string;
  fullName: string;
  email: string;
  collegeName: string;
  branch: string;
  rollNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateStudentInput {
  fullName: string;
  email: string;
  collegeName: string;
  branch: string;
  rollNumber: string;
}

export interface StudentResponse {
  id: string;
  fullName: string;
  email: string;
  collegeName: string;
  branch: string;
  rollNumber: string;
  createdAt: Date;
}
