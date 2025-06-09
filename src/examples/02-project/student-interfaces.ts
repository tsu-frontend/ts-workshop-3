// Hour 2 - Segment 4: Interface Contracts and Type Safety (20 minutes)
// Students learn: Interfaces, type contracts, design patterns, composition over inheritance

/**
 * Interface-driven design demonstrating TypeScript's type system
 * Learning objectives:
 * - Interface definitions and contracts
 * - Multiple interface implementation
 * - Composition over inheritance
 * - Generic interfaces
 * - Type guards and type narrowing
 * - Design patterns with interfaces
 */

// Core interfaces defining contracts
interface Identifiable {
  readonly id: string;
}

interface Timestamped {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

interface Contactable {
  email: string;
  phone?: string;
  address?: Address;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// Academic interfaces
interface Gradeable {
  addGrade(subject: string, grade: number): void;
  getGrade(subject: string): number[];
  getGPA(): number;
}

interface Enrollable {
  enroll(courseId: string, courseName: string): boolean;
  drop(courseId: string): boolean;
  getEnrolledCourses(): Course[];
}

interface Reportable {
  generateReport(): StudentReport;
  getPerformanceSummary(): PerformanceSummary;
}

// Supporting interfaces
interface Course {
  id: string;
  name: string;
  credits: number;
  instructor: string;
  schedule: string;
}

interface StudentReport {
  studentInfo: StudentInfo;
  academicRecord: AcademicRecord;
  generatedAt: Date;
}

interface StudentInfo {
  name: string;
  id: string;
  email: string;
  major: string;
  year: number;
}

interface AcademicRecord {
  courses: Course[];
  grades: Map<string, number[]>;
  gpa: number;
  totalCredits: number;
}

interface PerformanceSummary {
  overallGPA: number;
  creditsCompleted: number;
  academicStanding: "Excellent" | "Good" | "Satisfactory" | "Probation" | "Suspended";
  recommendations: string[];
}

// Generic interfaces for flexibility
interface Repository<T extends Identifiable> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(id: string, updates: Partial<T>): Promise<T | null>;
  delete(id: string): Promise<boolean>;
}

interface Validator<T> {
  validate(data: T): ValidationResult;
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

// Comprehensive Student class implementing multiple interfaces
class InterfaceStudent implements Identifiable, Timestamped, Contactable, Gradeable, Enrollable, Reportable {
  // Identifiable
  public readonly id: string;

  // Timestamped
  public readonly createdAt: Date;
  public readonly updatedAt: Date;

  // Contactable
  public email: string;
  public phone?: string;
  public address?: Address;

  // Student-specific properties
  public name: string;
  public major: string;
  public year: number;

  // Private implementation details
  private _grades: Map<string, number[]> = new Map();
  private _enrolledCourses: Map<string, Course> = new Map();
  private _validator: StudentValidator;

  constructor(id: string, name: string, email: string, major: string, year: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.major = major;
    this.year = year;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this._validator = new StudentValidator();
  }

  // Gradeable implementation
  public addGrade(subject: string, grade: number): void {
    const validation = this._validator.validateGrade(grade);
    if (!validation.isValid) {
      throw new Error(validation.errors.map((e) => e.message).join(", "));
    }

    if (!this._grades.has(subject)) {
      this._grades.set(subject, []);
    }
    this._grades.get(subject)!.push(grade);
    this.touch(); // Update timestamp
  }

  public getGrade(subject: string): number[] {
    return this._grades.get(subject) || [];
  }

  public getGPA(): number {
    let totalPoints = 0;
    let totalCourses = 0;

    for (const grades of this._grades.values()) {
      for (const grade of grades) {
        totalPoints += this.gradeToPoints(grade);
        totalCourses++;
      }
    }

    return totalCourses > 0 ? Math.round((totalPoints / totalCourses) * 100) / 100 : 0;
  }

  // Enrollable implementation
  public enroll(courseId: string, courseName: string): boolean {
    if (this._enrolledCourses.has(courseId)) {
      return false; // Already enrolled
    }

    const course: Course = {
      id: courseId,
      name: courseName,
      credits: 3, // Default credits
      instructor: "TBD",
      schedule: "TBD",
    };

    this._enrolledCourses.set(courseId, course);
    this.touch();
    return true;
  }

  public drop(courseId: string): boolean {
    const result = this._enrolledCourses.delete(courseId);
    if (result) {
      this.touch();
    }
    return result;
  }

  public getEnrolledCourses(): Course[] {
    return Array.from(this._enrolledCourses.values());
  }

  // Reportable implementation
  public generateReport(): StudentReport {
    return {
      studentInfo: {
        name: this.name,
        id: this.id,
        email: this.email,
        major: this.major,
        year: this.year,
      },
      academicRecord: {
        courses: this.getEnrolledCourses(),
        grades: new Map(this._grades),
        gpa: this.getGPA(),
        totalCredits: this.getTotalCredits(),
      },
      generatedAt: new Date(),
    };
  }

  public getPerformanceSummary(): PerformanceSummary {
    const gpa = this.getGPA();
    const credits = this.getTotalCredits();

    let standing: PerformanceSummary["academicStanding"];
    const recommendations: string[] = [];

    if (gpa >= 3.8) {
      standing = "Excellent";
      recommendations.push("Consider honors program");
    } else if (gpa >= 3.0) {
      standing = "Good";
      recommendations.push("Maintain current performance");
    } else if (gpa >= 2.0) {
      standing = "Satisfactory";
      recommendations.push("Consider tutoring for improvement");
    } else if (gpa >= 1.0) {
      standing = "Probation";
      recommendations.push("Academic intervention required");
    } else {
      standing = "Suspended";
      recommendations.push("Meet with academic advisor immediately");
    }

    if (credits < 30) {
      recommendations.push("Increase course load to stay on track");
    }

    return {
      overallGPA: gpa,
      creditsCompleted: credits,
      academicStanding: standing,
      recommendations,
    };
  }

  // Helper methods
  private gradeToPoints(grade: number): number {
    if (grade >= 97) return 4.0;
    if (grade >= 93) return 3.7;
    if (grade >= 90) return 3.3;
    if (grade >= 87) return 3.0;
    if (grade >= 83) return 2.7;
    if (grade >= 80) return 2.3;
    if (grade >= 77) return 2.0;
    if (grade >= 73) return 1.7;
    if (grade >= 70) return 1.3;
    if (grade >= 67) return 1.0;
    if (grade >= 65) return 0.7;
    return 0.0;
  }

  private getTotalCredits(): number {
    return this.getEnrolledCourses().reduce((total, course) => total + course.credits, 0);
  }

  private touch(): void {
    // Update timestamp - would need to make updatedAt mutable in real implementation
    // This demonstrates the concept
  }
}

// Validator implementation
class StudentValidator implements Validator<InterfaceStudent> {
  public validate(student: InterfaceStudent): ValidationResult {
    const errors: ValidationError[] = [];

    if (!student.name.trim()) {
      errors.push({
        field: "name",
        message: "Name cannot be empty",
        code: "REQUIRED",
      });
    }

    if (!this.isValidEmail(student.email)) {
      errors.push({
        field: "email",
        message: "Invalid email format",
        code: "INVALID_FORMAT",
      });
    }

    if (student.year < 1 || student.year > 4) {
      errors.push({
        field: "year",
        message: "Year must be between 1 and 4",
        code: "OUT_OF_RANGE",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public validateGrade(grade: number): ValidationResult {
    const errors: ValidationError[] = [];

    if (grade < 0 || grade > 100) {
      errors.push({
        field: "grade",
        message: "Grade must be between 0 and 100",
        code: "OUT_OF_RANGE",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Repository implementation for data persistence
class StudentRepository implements Repository<InterfaceStudent> {
  private students: Map<string, InterfaceStudent> = new Map();

  public async save(student: InterfaceStudent): Promise<InterfaceStudent> {
    this.students.set(student.id, student);
    return student;
  }

  public async findById(id: string): Promise<InterfaceStudent | null> {
    return this.students.get(id) || null;
  }

  public async findAll(): Promise<InterfaceStudent[]> {
    return Array.from(this.students.values());
  }

  public async update(id: string, updates: Partial<InterfaceStudent>): Promise<InterfaceStudent | null> {
    const student = this.students.get(id);
    if (!student) return null;

    // Apply updates (simplified - in real implementation would be more sophisticated)
    Object.assign(student, updates);
    return student;
  }

  public async delete(id: string): Promise<boolean> {
    return this.students.delete(id);
  }
}

// Type guard functions
function isGradeable(obj: any): obj is Gradeable {
  return obj && typeof obj.addGrade === "function" && typeof obj.getGrade === "function" && typeof obj.getGPA === "function";
}

function isEnrollable(obj: any): obj is Enrollable {
  return obj && typeof obj.enroll === "function" && typeof obj.drop === "function" && typeof obj.getEnrolledCourses === "function";
}

// Utility functions demonstrating interface usage
function processGradeableEntity(entity: Gradeable): void {
  console.log(`Current GPA: ${entity.getGPA()}`);
  entity.addGrade("Test Subject", 95);
  console.log(`Updated GPA: ${entity.getGPA()}`);
}

function generateStudentReports(students: Reportable[]): StudentReport[] {
  return students.map((student) => student.generateReport());
}

// Demonstration: Interface-driven design
console.log("=== Interface-driven Student Management Demo ===");

// Create student with interface contracts
const student = new InterfaceStudent("STU006", "Sarah Connor", "sarah@university.edu", "Computer Science", 2);

// Test Gradeable interface
student.addGrade("Mathematics", 92);
student.addGrade("Physics", 88);
student.addGrade("Chemistry", 95);

// Test Enrollable interface
student.enroll("CS101", "Introduction to Programming");
student.enroll("MATH201", "Calculus II");
student.enroll("PHYS101", "General Physics");

// Test Reportable interface
const report = student.generateReport();
console.log("Student Report:", report);

const performance = student.getPerformanceSummary();
console.log("Performance Summary:", performance);

// Demonstrate type guards
if (isGradeable(student)) {
  processGradeableEntity(student);
}

// Repository usage
const repository = new StudentRepository();
repository.save(student).then(() => {
  console.log("Student saved to repository");
});

// Export interfaces and classes
export {InterfaceStudent, StudentValidator, StudentRepository, isGradeable, isEnrollable, processGradeableEntity, generateStudentReports};

export type {Identifiable, Timestamped, Contactable, Gradeable, Enrollable, Reportable, Course, StudentReport, PerformanceSummary, Repository, Validator, ValidationResult};
