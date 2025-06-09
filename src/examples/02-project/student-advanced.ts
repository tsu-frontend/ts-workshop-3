// Hour 2 - Segment 3: Advanced Student with Inheritance and Polymorphism (25 minutes)
// Students learn: Inheritance, abstract classes, polymorphism, method overriding, super keyword

/**
 * Advanced Student classes demonstrating inheritance and polymorphism
 * Learning objectives:
 * - Abstract base classes
 * - Inheritance with extends keyword
 * - Method overriding and super calls
 * - Polymorphism in action
 * - Protected access modifiers
 * - Static methods and properties
 */

// Abstract base class for all persons in the university system
abstract class Person {
  protected static nextId: number = 1;

  public readonly id: number;
  public name: string;
  public age: number;
  protected _email: string;
  protected _createdAt: Date;

  constructor(name: string, age: number, email: string) {
    this.id = Person.nextId++;
    this.name = name;
    this.age = age;
    this._email = email;
    this._createdAt = new Date();
  }

  // Abstract method - must be implemented by subclasses
  public abstract getRole(): string;
  public abstract getInfo(): string;

  // Concrete method available to all subclasses
  public get email(): string {
    return this._email;
  }

  public set email(newEmail: string) {
    if (!this.isValidEmail(newEmail)) {
      throw new Error("Invalid email format");
    }
    this._email = newEmail;
  }

  protected isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getAge(): number {
    return this.age;
  }

  // Static method
  public static getTotalPersons(): number {
    return Person.nextId - 1;
  }
}

// Base Student class extending Person
class AdvancedStudent extends Person {
  protected _studentId: string;
  protected _grades: Map<string, number[]> = new Map();
  protected _major: string;
  protected _credits: number = 0;

  constructor(name: string, age: number, email: string, studentId: string, major: string) {
    super(name, age, email);
    this._studentId = studentId;
    this._major = major;
  }

  public getRole(): string {
    return "Student";
  }

  public getInfo(): string {
    return `${this.getRole()}: ${this.name} (ID: ${this._studentId}), Major: ${this._major}`;
  }

  public get studentId(): string {
    return this._studentId;
  }

  public get major(): string {
    return this._major;
  }

  public set major(newMajor: string) {
    if (!newMajor.trim()) {
      throw new Error("Major cannot be empty");
    }
    this._major = newMajor;
  }

  public addGrade(subject: string, grade: number, credits: number = 3): void {
    if (grade < 0 || grade > 100) {
      throw new Error("Grade must be between 0 and 100");
    }

    if (!this._grades.has(subject)) {
      this._grades.set(subject, []);
    }
    this._grades.get(subject)!.push(grade);
    this._credits += credits;
  }

  public getGPA(): number {
    let totalPoints = 0;
    let totalCredits = 0;

    for (const grades of this._grades.values()) {
      for (const grade of grades) {
        totalPoints += this.gradeToPoints(grade) * 3; // Assuming 3 credits per course
        totalCredits += 3;
      }
    }

    return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0;
  }

  protected gradeToPoints(grade: number): number {
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

  public getCredits(): number {
    return this._credits;
  }
}

// Graduate Student - specialized student type
class GraduateStudent extends AdvancedStudent {
  private _thesisTitle: string;
  private _advisor: string;
  private _researchArea: string;

  constructor(name: string, age: number, email: string, studentId: string, major: string, thesisTitle: string, advisor: string, researchArea: string) {
    super(name, age, email, studentId, major);
    this._thesisTitle = thesisTitle;
    this._advisor = advisor;
    this._researchArea = researchArea;
  }

  // Override parent method
  public getRole(): string {
    return "Graduate Student";
  }

  // Override parent method with additional information
  public getInfo(): string {
    const baseInfo = super.getInfo(); // Call parent method
    return `${baseInfo}, Research: ${this._researchArea}, Advisor: ${this._advisor}`;
  }

  public get thesisTitle(): string {
    return this._thesisTitle;
  }

  public set thesisTitle(title: string) {
    if (!title.trim()) {
      throw new Error("Thesis title cannot be empty");
    }
    this._thesisTitle = title;
  }

  public get advisor(): string {
    return this._advisor;
  }

  public get researchArea(): string {
    return this._researchArea;
  }

  // Graduate-specific method
  public defendThesis(): string {
    return `${this.name} is defending thesis: "${this._thesisTitle}"`;
  }

  // Override grade requirements for graduate students
  protected gradeToPoints(grade: number): number {
    // Graduate students need higher grades for same GPA
    if (grade >= 98) return 4.0;
    if (grade >= 95) return 3.7;
    if (grade >= 92) return 3.3;
    if (grade >= 89) return 3.0;
    if (grade >= 86) return 2.7;
    if (grade >= 83) return 2.3;
    if (grade >= 80) return 2.0;
    return 0.0; // Graduate students must maintain higher standards
  }
}

// Undergraduate Student - another specialized type
class UndergraduateStudent extends AdvancedStudent {
  private _year: number; // 1-4
  private _clubs: string[] = [];

  constructor(name: string, age: number, email: string, studentId: string, major: string, year: number) {
    super(name, age, email, studentId, major);
    if (year < 1 || year > 4) {
      throw new Error("Year must be between 1 and 4");
    }
    this._year = year;
  }

  // Override parent method
  public getRole(): string {
    const yearNames = ["", "Freshman", "Sophomore", "Junior", "Senior"];
    return `${yearNames[this._year]} (Undergraduate)`;
  }

  public get year(): number {
    return this._year;
  }

  public set year(newYear: number) {
    if (newYear < 1 || newYear > 4) {
      throw new Error("Year must be between 1 and 4");
    }
    this._year = newYear;
  }

  public joinClub(clubName: string): void {
    if (!clubName.trim()) {
      throw new Error("Club name cannot be empty");
    }
    if (!this._clubs.includes(clubName)) {
      this._clubs.push(clubName);
    }
  }

  public getClubs(): string[] {
    return [...this._clubs]; // Return copy
  }

  public canGraduate(): boolean {
    return this._credits >= 120 && this.getGPA() >= 2.0;
  }
}

// Utility function demonstrating polymorphism
function processStudents(students: AdvancedStudent[]): void {
  console.log("=== Processing Students (Polymorphism Demo) ===");

  students.forEach((student, index) => {
    console.log(`${index + 1}. ${student.getInfo()}`);
    console.log(`   Role: ${student.getRole()}`);
    console.log(`   GPA: ${student.getGPA()}`);
    console.log(`   Credits: ${student.getCredits()}`);

    // Type-specific behavior
    if (student instanceof GraduateStudent) {
      console.log(`   Thesis: ${student.thesisTitle}`);
    } else if (student instanceof UndergraduateStudent) {
      console.log(`   Can Graduate: ${student.canGraduate()}`);
      console.log(`   Clubs: ${student.getClubs().join(", ") || "None"}`);
    }
    console.log("");
  });
}

// Demonstration: Advanced Student Classes with Inheritance
console.log("=== Advanced Student Classes Demo ===");

// Create different types of students
const undergrad = new UndergraduateStudent("John Doe", 20, "john@university.edu", "STU004", "Computer Science", 3);

const grad = new GraduateStudent("Jane Smith", 24, "jane@university.edu", "STU005", "Computer Science", "Machine Learning in Healthcare", "Dr. Johnson", "Artificial Intelligence");

// Add grades
undergrad.addGrade("Data Structures", 88);
undergrad.addGrade("Algorithms", 92);
undergrad.addGrade("Database Systems", 85);

grad.addGrade("Advanced AI", 95);
grad.addGrade("Research Methods", 97);
grad.addGrade("Thesis Work", 98);

// Add clubs for undergraduate
undergrad.joinClub("Programming Club");
undergrad.joinClub("Chess Club");

// Demonstrate polymorphism
const allStudents: AdvancedStudent[] = [undergrad, grad];
processStudents(allStudents);

// Static method demonstration
console.log(`Total persons created: ${Person.getTotalPersons()}`);

// Graduate-specific functionality
console.log(grad.defendThesis());

// Export classes
export {Person, AdvancedStudent, GraduateStudent, UndergraduateStudent};
