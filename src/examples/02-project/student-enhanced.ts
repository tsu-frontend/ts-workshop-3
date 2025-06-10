// Hour 2 - Segment 2: Enhanced Student Class with Grade Management (25 minutes)
// Students learn: Private properties, encapsulation, Map data structure, validation, getters/setters

/**
 * Enhanced Student class demonstrating advanced TypeScript concepts
 * Learning objectives:
 * - Private properties for encapsulation
 * - Map data structure for grade management
 * - Getter and setter methods
 * - Advanced validation and error handling
 * - Data manipulation and calculation methods
 */

class EnhancedStudent {
  // Public properties
  public name: string;
  public age: number;
  public studentId: string;

  // Private properties for encapsulation
  private _email: string;
  private _grades: Map<string, number[]> = new Map();
  private _enrollmentDate: Date;

  constructor(name: string, age: number, studentId: string, email: string) {
    // Validation
    if (age < 0 || age > 120) {
      throw new Error("Age must be between 0 and 120");
    }
    if (!studentId.match(/^STU\d{3}$/)) {
      throw new Error("Student ID must follow format: STU001");
    }
    if (!this.isValidEmail(email)) {
      throw new Error("Invalid email format");
    }

    this.name = name;
    this.age = age;
    this.studentId = studentId;
    this._email = email;
    this._enrollmentDate = new Date();
  }

  // Getter for email (controlled access)
  public get email(): string {
    return this._email;
  }

  // Setter for email (with validation)
  public set email(newEmail: string) {
    if (!this.isValidEmail(newEmail)) {
      throw new Error("Invalid email format");
    }
    this._email = newEmail;
  }

  // Getter for enrollment date
  public get enrollmentDate(): Date {
    return new Date(this._enrollmentDate); // Return copy to prevent mutation
  }

  // Private helper method for email validation
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Grade management methods
  public addGrade(subject: string, grade: number): void {
    // Validate grade
    if (grade < 0 || grade > 100) {
      throw new Error("Grade must be between 0 and 100");
    }

    // Validate subject
    if (!subject.trim()) {
      throw new Error("Subject cannot be empty");
    }

    // Add grade to subject
    if (!this._grades.has(subject)) {
      this._grades.set(subject, []);
    }
    this._grades.get(subject)!.push(grade);
  }

  public getGrades(subject: string): number[] {
    const grades = this._grades.get(subject);
    return grades ? [...grades] : []; // Return copy to prevent mutation
  }

  public getAllGrades(): Map<string, number[]> {
    // Return deep copy to prevent external mutation
    const copy = new Map<string, number[]>();
    for (const [subject, grades] of this._grades) {
      copy.set(subject, [...grades]);
    }
    return copy;
  }

  public getSubjectAverage(subject: string): number {
    const grades = this._grades.get(subject);
    if (!grades || grades.length === 0) {
      return 0;
    }

    const sum = grades.reduce((total, grade) => total + grade, 0);
    return Math.round((sum / grades.length) * 100) / 100; // Round to 2 decimal places
  }

  public getOverallAverage(): number {
    let totalGrades = 0;
    let gradeCount = 0;

    for (const grades of this._grades.values()) {
      totalGrades += grades.reduce((sum, grade) => sum + grade, 0);
      gradeCount += grades.length;
    }

    return gradeCount > 0 ? Math.round((totalGrades / gradeCount) * 100) / 100 : 0;
  }

  public getSubjects(): string[] {
    return Array.from(this._grades.keys()).sort();
  }

  public removeGrade(subject: string, gradeIndex: number): boolean {
    const grades = this._grades.get(subject);
    if (!grades || gradeIndex < 0 || gradeIndex >= grades.length) {
      return false;
    }

    grades.splice(gradeIndex, 1);

    // Remove subject if no grades left
    if (grades.length === 0) {
      this._grades.delete(subject);
    }

    return true;
  }

  public getGradeReport(): string {
    if (this._grades.size === 0) {
      return `${this.name} has no grades recorded.`;
    }

    let report = `Grade Report for ${this.name} (${this.studentId})\n`;
    report += `Enrollment Date: ${this._enrollmentDate.toDateString()}\n`;
    report += "=".repeat(50) + "\n";

    for (const subject of this.getSubjects()) {
      const grades = this.getGrades(subject);
      const average = this.getSubjectAverage(subject);
      report += `${subject}: ${grades.join(", ")} (Average: ${average})\n`;
    }

    report += "=".repeat(50) + "\n";
    report += `Overall Average: ${this.getOverallAverage()}`;

    return report;
  }

  public getPerformanceLevel(): string {
    const average = this.getOverallAverage();
    if (average >= 90) return "Excellent";
    if (average >= 80) return "Good";
    if (average >= 70) return "Satisfactory";
    if (average >= 60) return "Needs Improvement";
    return "Failing";
  }
}

// Demonstration: Enhanced Student with Grade Management
console.log("=== Enhanced Student Class Demo ===");

// Create enhanced student
const student = new EnhancedStudent("Emma Wilson", 19, "STU003", "emma@university.edu");

// Add grades for different subjects
student.addGrade("Mathematics", 95);
student.addGrade("Mathematics", 87);
student.addGrade("Mathematics", 92);

student.addGrade("Physics", 88);
student.addGrade("Physics", 91);

student.addGrade("Chemistry", 85);
student.addGrade("Chemistry", 89);
student.addGrade("Chemistry", 93);

// Display grade information
console.log(student.getGradeReport());
console.log(`\nPerformance Level: ${student.getPerformanceLevel()}`);

// Test getter/setter
console.log(`\nOriginal email: ${student.email}`);
student.email = "emma.wilson@university.edu";
console.log(`Updated email: ${student.email}`);

// Test error handling
try {
  student.addGrade("Biology", 150); // Invalid grade
} catch (error: any) {
  console.log(`Error: ${error.message}`);
}

try {
  student.email = "invalid-email"; // Invalid email
} catch (error: any) {
  console.log(`Error: ${error.message}`);
}

// Export for use in other files
export {EnhancedStudent};
