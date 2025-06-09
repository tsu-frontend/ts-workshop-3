// Hour 2 - Segment 1: Basic Student Class (20 minutes)
// Students learn: Class declaration, constructor, type annotations, basic methods

/**
 * Basic Student class demonstrating fundamental TypeScript class concepts
 * Learning objectives:
 * - Class declaration syntax
 * - Constructor with typed parameters
 * - Public properties with type annotations
 * - Basic method implementation
 * - Type-safe return values
 */

class Student {
  // Type annotations ensure correctness
  public name: string;
  public age: number;
  public studentId: string;
  public email: string;

  constructor(name: string, age: number, studentId: string, email: string) {
    // Validate input parameters
    if (age < 0) {
      throw new Error("Age cannot be negative");
    }
    if (!studentId.trim()) {
      throw new Error("Student ID cannot be empty");
    }
    if (!email.includes("@")) {
      throw new Error("Invalid email format");
    }

    this.name = name;
    this.age = age;
    this.studentId = studentId;
    this.email = email;
  }

  // Method with typed return value
  public getInfo(): string {
    return `Student: ${this.name} (ID: ${this.studentId}), Age: ${this.age}, Email: ${this.email}`;
  }

  // Method with typed parameters
  public updateEmail(newEmail: string): void {
    if (!newEmail.includes("@")) {
      throw new Error("Invalid email format");
    }
    this.email = newEmail;
  }

  // Method returning boolean
  public isAdult(): boolean {
    return this.age >= 18;
  }

  // Method with default parameter
  public introduce(formal: boolean = false): string {
    if (formal) {
      return `Hello, my name is ${this.name}. I am a student with ID ${this.studentId}.`;
    } else {
      return `Hi! I'm ${this.name}, a ${this.age}-year-old student.`;
    }
  }
}

// Demonstration: Creating and using Student instances
console.log("=== Basic Student Class Demo ===");

// Create student instances
const student1 = new Student("Alice Johnson", 20, "STU001", "alice@university.edu");
const student2 = new Student("Bob Smith", 17, "STU002", "bob@university.edu");

// Test methods
console.log(student1.getInfo());
console.log(student2.getInfo());

console.log(`${student1.name} is adult: ${student1.isAdult()}`);
console.log(`${student2.name} is adult: ${student2.isAdult()}`);

console.log(student1.introduce(true));
console.log(student2.introduce(false));

// Test email update
student1.updateEmail("alice.johnson@university.edu");
console.log(`Updated email: ${student1.email}`);

// Test error handling
try {
  const invalidStudent = new Student("", -5, "", "invalid-email");
} catch (error: any) {
  console.log(`Error caught: ${error.message}`);
}

// Export for use in other files
export {Student};
