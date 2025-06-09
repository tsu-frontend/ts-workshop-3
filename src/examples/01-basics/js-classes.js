// JavaScript Classes - Showing Limitations
// This file demonstrates why we need TypeScript

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }

  // Problem: No type checking
  setAge(newAge) {
    this.age = newAge; // What if someone passes a string?
  }
}

class Student extends Person {
  constructor(name, age, studentId) {
    super(name, age);
    this.studentId = studentId;
  }

  // Problem: No interface contracts
  study(subject) {
    return `${this.name} is studying ${subject}`;
  }
}

// Problems with JavaScript classes:
console.log("=== JavaScript Class Problems ===");

// 1. No type safety
const student1 = new Student("Alice", "twenty", "S001"); // Age should be number!
console.log(student1.greet()); // Works but age is wrong type

// 2. Runtime errors only
student1.setAge("very old"); // No compile-time error!
console.log(`Age is now: ${student1.age}`); // Runtime issue

// 3. No IDE support for types
// student1.nonExistentMethod(); // IDE can't warn us

// 4. No real encapsulation
console.log(`Direct access to private data: ${student1.studentId}`);

export {Person, Student};
