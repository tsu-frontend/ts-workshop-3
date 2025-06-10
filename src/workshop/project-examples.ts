// Project Examples Handler - TypeScript Class for Hour 2 Project Section
import {SyntaxHighlighter} from "./syntax-highlighter";

interface ProjectSegment {
  id: string;
  title: string;
  description: string;
  code: string;
  language: "typescript";
}

export class ProjectExamples {
  private currentSegment: string = "";
  private segments: Map<string, ProjectSegment> = new Map();

  constructor() {
    this.initializeSegments();
    this.initializeEventListeners();
  }

  private initializeSegments(): void {
    this.segments.set("basic", {
      id: "basic",
      title: "Basic Student Class",
      description: "Foundation class structure with constructor, properties, and basic methods",
      language: "typescript",
      code: `// Basic Student Class - Foundation Structure
class Student {
  // ✅ Type annotations ensure correctness
  public name: string;
  public age: number;
  public studentId: string;
  public email: string;

  constructor(name: string, age: number, studentId: string, email: string) {
    // ✅ Validation with typed parameters
    if (age < 0) {
      throw new Error('Age cannot be negative');
    }
    if (!studentId.trim()) {
      throw new Error('Student ID cannot be empty');
    }
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }

    this.name = name;
    this.age = age;
    this.studentId = studentId;
    this.email = email;
  }

  // ✅ Method with typed return value
  public getInfo(): string {
    return \`Student: \${this.name} (ID: \${this.studentId}), Age: \${this.age}\`;
  }

  // ✅ Method with boolean return
  public isAdult(): boolean {
    return this.age >= 18;
  }
}

// Usage example
const student = new Student('Alice', 20, 'STU001', 'alice@university.edu');
console.log(student.getInfo()); // Type-safe output!`,
    });

    this.segments.set("enhanced", {
      id: "enhanced",
      title: "Enhanced Grade Management",
      description: "Advanced features with private properties, Map data structure, and validation",
      language: "typescript",
      code: `// Enhanced Student - Grade Management System
class EnhancedStudent {
  public name: string;
  public studentId: string;
  
  // ✅ Private properties for encapsulation
  private _email: string;
  private _grades: Map<string, number[]> = new Map();

  constructor(name: string, studentId: string, email: string) {
    this.name = name;
    this.studentId = studentId;
    this._email = email;
  }

  // ✅ Getter with controlled access
  public get email(): string {
    return this._email;
  }

  // ✅ Setter with validation
  public set email(newEmail: string) {
    if (!newEmail.includes('@')) {
      throw new Error('Invalid email format');
    }
    this._email = newEmail;
  }

  // ✅ Grade management with Map
  public addGrade(subject: string, grade: number): void {
    if (grade < 0 || grade > 100) {
      throw new Error('Grade must be between 0 and 100');
    }
    
    if (!this._grades.has(subject)) {
      this._grades.set(subject, []);
    }
    this._grades.get(subject)!.push(grade);
  }

  // ✅ Performance calculation
  public getGPA(): number {
    let total = 0, count = 0;
    for (const grades of this._grades.values()) {
      total += grades.reduce((sum, grade) => sum + grade, 0);
      count += grades.length;
    }
    return count > 0 ? Math.round((total / count) * 100) / 100 : 0;
  }
}

// Usage with encapsulation
const student = new EnhancedStudent('Emma', 'STU003', 'emma@university.edu');
student.addGrade('Math', 95);
student.addGrade('Physics', 88);
console.log(\`GPA: \${student.getGPA()}\`); // 91.5`,
    });

    this.segments.set("advanced", {
      id: "advanced",
      title: "Inheritance & Polymorphism",
      description: "Abstract classes, inheritance patterns, and polymorphic behavior",
      language: "typescript",
      code: `// Advanced Inheritance - Abstract Base Class
abstract class Person {
  protected static nextId: number = 1;
  public readonly id: number;
  public name: string;

  constructor(name: string) {
    this.id = Person.nextId++;
    this.name = name;
  }

  // ✅ Abstract method - must be implemented
  public abstract getRole(): string;
  public abstract getInfo(): string;
}

// ✅ Inheritance with extends
class AdvancedStudent extends Person {
  protected _major: string;
  protected _credits: number = 0;

  constructor(name: string, major: string) {
    super(name); // ✅ Call parent constructor
    this._major = major;
  }

  // ✅ Implement abstract methods
  public getRole(): string {
    return 'Student';
  }

  public getInfo(): string {
    return \`\${this.getRole()}: \${this.name}, Major: \${this._major}\`;
  }
}

// ✅ Specialized inheritance
class GraduateStudent extends AdvancedStudent {
  private _thesisTitle: string;

  constructor(name: string, major: string, thesisTitle: string) {
    super(name, major);
    this._thesisTitle = thesisTitle;
  }

  // ✅ Method overriding
  public getRole(): string {
    return 'Graduate Student';
  }

  public defendThesis(): string {
    return \`\${this.name} is defending: "\${this._thesisTitle}"\`;
  }
}

// ✅ Polymorphism in action
const students: AdvancedStudent[] = [
  new AdvancedStudent('John', 'CS'),
  new GraduateStudent('Jane', 'CS', 'AI in Healthcare')
];

students.forEach(student => {
  console.log(student.getInfo()); // Different behavior, same interface!
});`,
    });

    this.segments.set("interfaces", {
      id: "interfaces",
      title: "Interface Contracts",
      description: "Type safety through interfaces, design patterns, and professional architecture",
      language: "typescript",
      code: `// Interface Contracts - Type Safety & Design Patterns

// ✅ Interface definitions
interface Identifiable {
  readonly id: string;
}

interface Gradeable {
  addGrade(subject: string, grade: number): void;
  getGPA(): number;
}

interface Enrollable {
  enroll(courseId: string, courseName: string): boolean;
  getEnrolledCourses(): Course[];
}

interface Course {
  id: string;
  name: string;
  credits: number;
}

// ✅ Multiple interface implementation
class InterfaceStudent implements Identifiable, Gradeable, Enrollable {
  public readonly id: string;
  public name: string;
  private _grades: Map<string, number[]> = new Map();
  private _courses: Map<string, Course> = new Map();

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // ✅ Implement Gradeable
  public addGrade(subject: string, grade: number): void {
    if (!this._grades.has(subject)) {
      this._grades.set(subject, []);
    }
    this._grades.get(subject)!.push(grade);
  }

  public getGPA(): number {
    let total = 0, count = 0;
    for (const grades of this._grades.values()) {
      total += grades.reduce((sum, grade) => sum + grade, 0);
      count += grades.length;
    }
    return count > 0 ? total / count : 0;
  }

  // ✅ Implement Enrollable
  public enroll(courseId: string, courseName: string): boolean {
    if (this._courses.has(courseId)) return false;
    
    this._courses.set(courseId, {
      id: courseId,
      name: courseName,
      credits: 3
    });
    return true;
  }

  public getEnrolledCourses(): Course[] {
    return Array.from(this._courses.values());
  }
}

// ✅ Type-safe usage
const student = new InterfaceStudent('STU006', 'Sarah');
student.addGrade('TypeScript', 95);
student.enroll('CS101', 'Intro to Programming');

console.log(\`GPA: \${student.getGPA()}\`);
console.log(\`Courses: \${student.getEnrolledCourses().length}\`);`,
    });
  }

  private initializeEventListeners(): void {
    // Project segment buttons
    const projectButtons = document.querySelectorAll("[data-project]");
    projectButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const segmentId = (e.currentTarget as HTMLElement).getAttribute("data-project");
        if (segmentId) {
          this.showSegment(segmentId);
        }
      });
    });
  }

  public showSegment(segmentId: string): void {
    const segment = this.segments.get(segmentId);
    if (!segment) return;

    this.currentSegment = segmentId;
    this.updateActiveButton(segmentId);
    this.displaySegment(segment);
  }

  private updateActiveButton(segmentId: string): void {
    // Remove active class from all project buttons
    const allButtons = document.querySelectorAll(".project-btn");
    allButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to current button
    const activeButton = document.querySelector(`[data-project="${segmentId}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }

  private displaySegment(segment: ProjectSegment): void {
    const outputElement = document.getElementById("project-output");
    if (!outputElement) return;

    // Create formatted HTML with syntax highlighting (like Section 1)
    const highlightedCode = SyntaxHighlighter.highlightTypeScript(segment.code);

    outputElement.innerHTML = `
      <div class="example-header">
        <h4 class="success">🎯 ${segment.title}</h4>
        <p class="comment">${segment.description}</p>
      </div>
      <pre class="language-typescript"><code>${highlightedCode}</code></pre>
    `;

    // Smooth scroll to code if needed
    outputElement.scrollIntoView({behavior: "smooth", block: "nearest"});
  }
}
