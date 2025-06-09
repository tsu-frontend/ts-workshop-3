# TypeScript Classes Workshop - Lesson Plan

## 📋 Workshop Overview

**Duration**: 2.5 hours (150 minutes)  
**Target Audience**: Frontend students with HTML, CSS, JavaScript fundamentals  
**Learning Goal**: Master TypeScript classes through progressive, hands-on learning  
**Format**: Demonstration-focused with coding opportunities

---

## 🎯 Learning Objectives

By the end of this workshop, students will be able to:

- [ ] Explain the differences between JavaScript and TypeScript classes
- [ ] Create TypeScript classes with proper type annotations
- [ ] Use access modifiers (private, protected, public) effectively
- [ ] Implement inheritance and abstract classes
- [ ] Design and use interfaces as contracts
- [ ] Integrate TypeScript classes with DOM manipulation
- [ ] Apply best practices for class-based architecture

---

## 📚 Part 1: Foundation (45 minutes)

### **Segment 1.1: What Are Classes? (15 minutes)**

**Time**: 0:00 - 0:15

#### **Teaching Points:**

- Real-world analogies (cookie cutter, blueprint, factory template)
- Object-oriented programming concepts
- Why classes matter in frontend development

#### **Activities:**

- Interactive discussion with analogies
- Show real-world examples (car factory → Car class)

#### **Key Concepts:**

- Classes as blueprints for objects
- Instances vs classes
- Properties and methods

---

### **Segment 1.2: JavaScript Classes Review (15 minutes)**

**Time**: 0:15 - 0:30

#### **File**: `01-basics/js-classes.js`

#### **Teaching Sequence:**

1. **Basic Class Syntax** (5 mins)

   ```javascript
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }
   ```

2. **Methods and Inheritance** (5 mins)

   ```javascript
   class Student extends Person {
     constructor(name, age, studentId) {
       super(name, age);
       this.studentId = studentId;
     }
   }
   ```

3. **Problems with JavaScript Classes** (5 mins)
   - No type checking
   - Runtime errors only
   - No real encapsulation
   - Limited IDE support

#### **Demo**: Run `js-classes.js` to show problems

---

### **Segment 1.3: TypeScript Classes Introduction (10 minutes)**

**Time**: 0:30 - 0:40

#### **File**: `01-basics/ts-classes.ts`

#### **Teaching Sequence:**

1. **Type Annotations** (3 mins)

   ```typescript
   class Person {
     name: string;
     age: number;
   }
   ```

2. **Access Modifiers** (4 mins)

   ```typescript
   class BankAccount {
     public accountNumber: string;
     protected balance: number;
     private pin: string;
   }
   ```

3. **Enhanced Features** (3 mins)
   - Interfaces
   - Abstract classes
   - Readonly properties

#### **Demo**: Run `ts-classes.ts` to show improvements

---

### **Segment 1.4: Live Coding - JS to TS Conversion (5 minutes)**

**Time**: 0:40 - 0:45

#### **Activity**: Convert a simple JavaScript class to TypeScript

- Start with basic JS class
- Add type annotations
- Add access modifiers
- Show IDE benefits (autocomplete, error detection)

#### **Student Participation**: Ask students to suggest types and modifiers

---

## 🏗️ Part 2: Hands-On Project (90 minutes)

### **Segment 2.1: Basic Student Class (20 minutes)**

**Time**: 0:45 - 1:05

#### **File**: `02-project/step1-basic-student.ts`

#### **Teaching Sequence:**

1. **Class Design Discussion** (5 mins)

   - What properties should a Student have?
   - What methods do we need?
   - How should we validate data?

2. **Live Coding - Basic Student Class** (10 mins)

   ```typescript
   class Student {
     firstName: string;
     lastName: string;
     studentId: string;
     age: number;
     email: string;

     constructor(firstName: string, lastName: string, studentId: string, age: number, email: string) {
       // Implementation
     }
   }
   ```

3. **Testing and Validation** (5 mins)
   - Create student instances
   - Test methods
   - Show type safety benefits

#### **Student Activity**: Students create their own Student instance

---

### **Segment 2.2: Enhanced Methods and Validation (25 minutes)**

**Time**: 1:05 - 1:30

#### **Teaching Sequence:**

1. **Grade Management System** (10 mins)

   ```typescript
   class Student {
     private grades: {[subject: string]: number[]} = {};

     addGrade(subject: string, grade: number): void {
       // Validation and implementation
     }
   }
   ```

2. **Data Validation Patterns** (10 mins)

   - Input validation
   - Error handling
   - Type guards

3. **Utility Methods** (5 mins)
   - Getters and setters
   - Computed properties
   - Helper methods

#### **Demo**: Show how TypeScript catches errors at compile time

---

### **Segment 2.3: Inheritance - Teacher extends Person (25 minutes)**

**Time**: 1:30 - 1:55

#### **Teaching Sequence:**

1. **Design Class Hierarchy** (5 mins)

   ```
   Person (abstract)
   ├── Student
   └── Teacher
   ```

2. **Abstract Base Class** (10 mins)

   ```typescript
   abstract class Person {
     protected firstName: string;
     protected lastName: string;

     abstract getRole(): string;
     abstract getInfo(): string;
   }
   ```

3. **Implementing Inheritance** (10 mins)

   ```typescript
   class Student extends Person {
     getRole(): string {
       return "Student";
     }
     getInfo(): string {
       /* implementation */
     }
   }

   class Teacher extends Person {
     getRole(): string {
       return "Teacher";
     }
     getInfo(): string {
       /* implementation */
     }
   }
   ```

#### **Key Concepts:**

- Abstract classes vs interfaces
- Method overriding
- Super keyword usage
- Protected vs private access

---

### **Segment 2.4: Interfaces and Advanced Features (20 minutes)**

**Time**: 1:55 - 2:15

#### **File**: `02-project/final-project.ts`

#### **Teaching Sequence:**

1. **Interface Design** (8 mins)

   ```typescript
   interface Gradeable {
     addGrade(subject: string, grade: number): void;
     getGradeAverage(): number;
   }

   interface Teachable {
     assignCourse(course: Course): void;
     getCourses(): Course[];
   }
   ```

2. **Enums for Type Safety** (5 mins)

   ```typescript
   enum GradeLevel {
     FRESHMAN = "Freshman",
     SOPHOMORE = "Sophomore",
     JUNIOR = "Junior",
     SENIOR = "Senior",
   }
   ```

3. **Complete System Integration** (7 mins)
   - Course class
   - School management class
   - Putting it all together

#### **Demo**: Run the complete Student Management System

---

## 🌟 Part 3: Real-World Integration (45 minutes)

### **Segment 3.1: Advanced TypeScript Patterns (15 minutes)**

**Time**: 2:15 - 2:30

#### **Teaching Points:**

1. **When to Use Classes vs Functions** (5 mins)

   - State management
   - Complex behavior
   - Inheritance needs

2. **Design Patterns** (5 mins)

   - Factory pattern
   - Observer pattern
   - Composition over inheritance

3. **Performance Considerations** (5 mins)
   - Memory usage
   - Instantiation costs
   - Best practices

---

### **Segment 3.2: DOM Integration (20 minutes)**

**Time**: 2:30 - 2:50

#### **File**: `03-advanced/dom-integration.ts`

#### **Teaching Sequence:**

1. **Component Architecture** (8 mins)

   ```typescript
   abstract class Component {
     protected element: HTMLElement;
     abstract render(): void;
   }
   ```

2. **Event Handling with Types** (7 mins)

   ```typescript
   class StudentCard extends Component {
     private setupEventHandlers(): void {
       this.on("click", (event: Event) => {
         // Typed event handling
       });
     }
   }
   ```

3. **State Management** (5 mins)
   - Managing component state
   - Data flow patterns
   - Update mechanisms

#### **Demo**: Interactive Student Management UI

---

### **Segment 3.3: Q&A and Wrap-up (10 minutes)**

**Time**: 2:50 - 3:00

#### **Activities:**

1. **Review Key Concepts** (3 mins)

   - Quick recap of main learning points
   - Address any confusion

2. **Student Questions** (5 mins)

   - Open floor for questions
   - Clarify concepts
   - Discuss real-world applications

3. **Next Steps** (2 mins)
   - Resources for continued learning
   - Practice suggestions
   - Integration with frameworks (React, Vue, Angular)

---

## 📁 File Structure and Usage

### **Teaching Files (in order of use):**

1. `index.ts` - Workshop overview and orientation
2. `01-basics/js-classes.js` - JavaScript class examples
3. `01-basics/ts-classes.ts` - TypeScript class examples
4. `02-project/step1-basic-student.ts` - Basic Student class
5. `02-project/final-project.ts` - Complete management system
6. `03-advanced/dom-integration.ts` - DOM integration examples

### **Commands for Each Section:**

```bash
# Workshop overview
npm start

# Part 1 - Foundation
node 01-basics/js-classes.js
npm run start 01-basics/ts-classes.ts

# Part 2 - Project
npm run start 02-project/step1-basic-student.ts
npm run start 02-project/final-project.ts

# Part 3 - Advanced
npm run start 03-advanced/dom-integration.ts
```

---

## 🎯 Assessment and Exercises

### **Formative Assessment (Throughout):**

- [ ] Students can identify TypeScript syntax differences
- [ ] Students can explain access modifier purposes
- [ ] Students can implement basic inheritance
- [ ] Students can design simple interfaces

### **Hands-On Exercises:**

1. **Part 1**: Convert a given JavaScript class to TypeScript
2. **Part 2**: Add a new class (Administrator) to the management system
3. **Part 3**: Create a simple interactive component

### **Final Project Ideas:**

- Library management system
- E-commerce product catalog
- Task management application
- Social media post system

---

## 🔧 Technical Requirements

### **Prerequisites:**

- Node.js installed
- TypeScript knowledge (basic)
- Code editor with TypeScript support
- Terminal/command line familiarity

### **Setup Commands:**

```bash
cd ts-workshop-2_classes
npm install
npm start
```

---

## 📝 Instructor Notes

### **Common Student Challenges:**

1. **Type Annotations**: Students often forget to add types
   - **Solution**: Emphasize the "contract" concept
2. **Access Modifiers**: Confusion about when to use private vs protected
   - **Solution**: Use real-world analogies (bank account example)
3. **Abstract Classes vs Interfaces**: When to use which
   - **Solution**: "Can vs Must" - interfaces define what you must do, abstract classes provide what you can use

### **Timing Flexibility:**

- If running behind: Skip advanced patterns in Part 3
- If ahead of schedule: Add more hands-on exercises
- For different skill levels: Adjust complexity of examples

### **Interactive Elements:**

- Ask students to predict TypeScript errors
- Have students suggest class properties and methods
- Encourage questions throughout, not just at the end

---

## 🎉 Success Metrics

Students successfully complete the workshop when they can:

- [ ] Create a TypeScript class with proper typing
- [ ] Implement inheritance with abstract classes
- [ ] Use interfaces to define contracts
- [ ] Integrate classes with DOM manipulation
- [ ] Explain when and why to use TypeScript classes

**Workshop Goal Achieved**: Students leave confident in using TypeScript classes for real frontend projects!
