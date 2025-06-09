// TypeScript Classes - Showing Improvements
// This file demonstrates TypeScript class benefits

interface PersonInterface {
  name: string;
  age: number;
  greet(): string;
}

class Person implements PersonInterface {
  // Type annotations ensure correctness
  public name: string;
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  public greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  // Type safety prevents errors
  public setAge(newAge: number): void {
    if (newAge < 0) {
      throw new Error("Age cannot be negative");
    }
    this.age = newAge;
  }
}

interface StudentInterface extends PersonInterface {
  studentId: string;
  study(subject: string): string;
}

class Student extends Person implements StudentInterface {
  // Real encapsulation with private fields
  private _studentId: string;
  private _grades: Map<string, number> = new Map();

  constructor(name: string, age: number, studentId: string) {
    super(name, age);
    this._studentId = studentId;
  }

  // Getter with proper typing
  public get studentId(): string {
    return this._studentId;
  }

  // Method with type contracts
  public study(subject: string): string {
    return `${this.name} is studying ${subject}`;
  }

  // Type-safe grade management
  public addGrade(subject: string, grade: number): void {
    if (grade < 0 || grade > 100) {
      throw new Error("Grade must be between 0 and 100");
    }
    this._grades.set(subject, grade);
  }

  public getGrade(subject: string): number | undefined {
    return this._grades.get(subject);
  }

  public getAverageGrade(): number {
    if (this._grades.size === 0) return 0;

    const total = Array.from(this._grades.values()).reduce((sum, grade) => sum + grade, 0);
    return Math.round((total / this._grades.size) * 100) / 100;
  }
}

// TypeScript Benefits Demonstration
console.log("=== TypeScript Class Benefits ===");

// 1. Compile-time type checking
const student1 = new Student("Alice", 20, "S001"); // Types enforced!
console.log(student1.greet());

// 2. IDE support and autocomplete
student1.addGrade("Math", 95);
student1.addGrade("Science", 88);
console.log(`Average grade: ${student1.getAverageGrade()}`);

// 3. Real encapsulation
console.log(`Student ID (via getter): ${student1.studentId}`);
// console.log(student1._studentId); // TypeScript error - private field!

// 4. Interface contracts ensure consistency
const processStudent = (student: StudentInterface): void => {
  console.log(student.study("TypeScript"));
  console.log(student.greet());
};

processStudent(student1); // Type-safe function calls

export {Person, Student};
export type {PersonInterface, StudentInterface};
