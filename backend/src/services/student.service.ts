import { StudentModel } from '../models/student.model';
import { CreateStudentInput, StudentResponse } from '../types/student.types';

export class StudentService {
  /**
   * Registers a new student.
   * Duplicate checks are primarily handled by MongoDB unique indexes.
   */
  async createStudent(input: CreateStudentInput): Promise<StudentResponse> {
    const student = new StudentModel(input);
    const savedStudent = await student.save();
    return this.mapToResponse(savedStudent);
  }

  /**
   * Retrieves a student by ID.
   */
  async getStudentById(id: string): Promise<StudentResponse | null> {
    const student = await StudentModel.findById(id);
    if (!student) {
      return null;
    }
    return this.mapToResponse(student);
  }

  /**
   * Retrieves a paginated list of students.
   */
  async listStudents(page: number, limit: number): Promise<{ data: StudentResponse[]; total: number; totalPages: number }> {
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      StudentModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      StudentModel.countDocuments()
    ]);

    return {
      data: students.map((student) => this.mapToResponse(student)),
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  /**
   * Maps a Mongoose document to a clean response object.
   */
  private mapToResponse(student: any): StudentResponse {
    return {
      id: student._id.toString(),
      fullName: student.fullName,
      email: student.email,
      collegeName: student.collegeName,
      branch: student.branch,
      rollNumber: student.rollNumber,
      createdAt: student.createdAt
    };
  }
}
