## 📚 Part 1: Foundation Concepts

### Understanding Classes

**Real-World Analogy**: Think of classes as blueprints or templates. Just like a house blueprint defines the structure for building houses, a class defines the structure for creating objects.

**Key Concepts:**

- **Classes** are blueprints for objects
- **Instances** are actual objects created from classes
- **Properties** store data (like variables)
- **Methods** define behavior (like functions)

### JavaScript Classes Review

**Study File**: `src/examples/01-basics/js-classes.js`

**Problems with JavaScript Classes:**

- No compile-time type checking
- Runtime errors only
- No real encapsulation
- Limited IDE support
- No interface contracts

**Example Issues:**

```javascript
const student = new Student("Alice", "twenty"); // Age should be number!
student.setAge("very old"); // No compile-time error!
```

### TypeScript Classes Benefits

**Study File**: `src/examples/01-basics/ts-classes.ts`

**TypeScript Solutions:**

- **Type Safety**: Catch errors at compile time
- **Access Modifiers**: Real encapsulation with private/protected
- **Interface Contracts**: Define clear APIs
- **IDE Support**: Autocomplete and error detection
- **Better Documentation**: Types serve as documentation

**Key Features:**

```typescript
class Student {
  public name: string; // Public access
  private _grades: Map<string, number>; // Private encapsulation

  constructor(name: string) {
    // Type-safe parameters
    this.name = name;
  }

  public addGrade(subject: string, grade: number): void {
    // Typed methods
    // Implementation with validation
  }
}
```

### Modern Build Tools (Vite)

**Configuration File**: `vite.config.ts`

**Benefits You'll Experience:**

- ⚡ Lightning fast builds (< 500ms)
- 🔄 Instant hot reload on file changes
- 📊 Real-time TypeScript compilation
- 🚀 Production-ready optimization
- 🗺️ Source maps for debugging

**Development Workflow:**

1. Write TypeScript classes
2. Vite compiles TypeScript → JavaScript
3. Hot reload updates browser instantly
4. Production build optimizes for deployment

---

## 🏗️ Part 2: Hands-On Project - Student Management System

### Basic Student Class

**Study File**: `src/examples/02-project/student-basic.ts`

**Learning Focus:**

- Class declaration syntax
- Constructor with typed parameters
- Public properties with type annotations
- Basic method implementation
- Type-safe return values

**Key Concepts:**

```typescript
class Student {
  public name: string;
  public age: number;
  public studentId: string;
  public email: string;

  constructor(name: string, age: number, studentId: string, email: string) {
    // Validation with typed parameters
    if (age < 0) throw new Error("Age cannot be negative");
    // Assignment
  }

  public getInfo(): string {
    // Typed return value
    return `Student: ${this.name} (ID: ${this.studentId})`;
  }
}
```

**Practice Exercise:**
Create your own `Teacher` class with similar structure but different properties (subject, department, yearsExperience).

### Enhanced Grade Management

**Study File**: `src/examples/02-project/student-enhanced.ts`

**Learning Focus:**

- Private properties for encapsulation
- Map data structure for complex data
- Getter and setter methods
- Advanced validation and error handling
- Data manipulation and calculation methods

**Key Patterns:**

```typescript
class EnhancedStudent {
  private _email: string; // Private encapsulation
  private _grades: Map<string, number[]>; // Complex data structure

  public get email(): string {
    // Controlled access
    return this._email;
  }

  public set email(newEmail: string) {
    // Validation on set
    if (!this.isValidEmail(newEmail)) {
      throw new Error("Invalid email format");
    }
    this._email = newEmail;
  }

  private isValidEmail(email: string): boolean {
    // Private helper
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}
```

**Practice Exercise:**
Add a `Course` class that can track enrolled students and calculate class averages.

### Inheritance & Polymorphism

**Study File**: `src/examples/02-project/student-advanced.ts`

**Learning Focus:**

- Abstract base classes
- Inheritance with extends keyword
- Method overriding and super calls
- Polymorphism in action
- Protected access modifiers
- Static methods and properties

**Inheritance Hierarchy:**

```typescript
abstract class Person {
  // Abstract base
  protected static nextId: number = 1; // Static property
  public readonly id: number; // Readonly property

  constructor(name: string) {
    this.id = Person.nextId++;
  }

  public abstract getRole(): string; // Must implement
  public abstract getInfo(): string; // Must implement
}

class AdvancedStudent extends Person {
  // Inheritance
  constructor(name: string, major: string) {
    super(name); // Call parent constructor
  }

  public getRole(): string {
    // Implement abstract
    return "Student";
  }
}

class GraduateStudent extends AdvancedStudent {
  // Further inheritance
  public getRole(): string {
    // Override method
    return "Graduate Student";
  }
}
```

**Polymorphism Example:**

```typescript
const students: AdvancedStudent[] = [new AdvancedStudent("John", "CS"), new GraduateStudent("Jane", "CS", "AI Research")];

students.forEach((student) => {
  console.log(student.getInfo()); // Different behavior, same interface!
});
```

**Practice Exercise:**
Create a `Professor` class that extends `Person` and can manage multiple courses.

### Interface Contracts

**Study File**: `src/examples/02-project/student-interfaces.ts`

**Learning Focus:**

- Interface definitions and contracts
- Multiple interface implementation
- Composition over inheritance
- Generic interfaces
- Type guards and type narrowing
- Design patterns with interfaces

**Interface Design:**

```typescript
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

// Multiple interface implementation
class InterfaceStudent implements Identifiable, Gradeable, Enrollable {
  // Must implement all interface methods
}
```

**Type Guards:**

```typescript
function isGradeable(obj: any): obj is Gradeable {
  return obj && typeof obj.addGrade === "function";
}

if (isGradeable(student)) {
  student.addGrade("Math", 95); // TypeScript knows this is safe
}
```

**Practice Exercise:**
Create a `Reportable` interface and implement it to generate student transcripts.

---

## 🌟 Part 3: Real-World Integration

### DOM Integration with Type Safety

**Study File**: `src/examples/03-advanced/dom-integration.ts`

**Learning Focus:**

- Generic classes with type constraints
- Fluent API design (method chaining)
- Type-safe DOM manipulation
- Event handling with proper types
- Resource management and cleanup

**Type-Safe DOM Management:**

```typescript
class DOMManager<T extends HTMLElement> {
  private element: T;
  private listeners: Map<string, EventListener[]> = new Map();

  constructor(selector: string) {
    const element = document.querySelector(selector) as T;
    if (!element) {
      throw new Error(`Element not found: ${selector}`);
    }
    this.element = element;
  }

  // Fluent API with method chaining
  public setText(text: string): this {
    this.element.textContent = text;
    return this; // Enable chaining
  }

  // Type-safe event handling
  public on<K extends keyof HTMLElementEventMap>(event: K, handler: (event: HTMLElementEventMap[K]) => void): this {
    // Implementation with proper typing
  }
}

// Usage with type safety
const button = new DOMManager<HTMLButtonElement>("#demo-button")
  .setText("Click Me!")
  .addClass("btn-primary")
  .on("click", (e) => {
    console.log("Button clicked!", e.target);
  });
```

### Component Architecture Pattern

**Study File**: `src/examples/03-advanced/component-architecture.ts`

**Learning Focus:**

- Abstract component base classes
- Lifecycle management
- State management with re-rendering
- Template-based rendering
- Event binding patterns

**Component Pattern:**

```typescript
abstract class Component<P extends ComponentProps = {}, S extends ComponentState = {}> {
  protected element: HTMLElement;
  protected props: P;
  protected state: S;

  // Abstract methods - must be implemented
  protected abstract render(): string;
  protected abstract bindEvents(): void;

  // Lifecycle methods
  public mount(): void {
    this.element.innerHTML = this.render();
    this.bindEvents();
    this.onMount();
  }

  // State management with re-rendering
  protected setState(newState: Partial<S>): void {
    this.state = {...this.state, ...newState};
    if (this.mounted) {
      this.element.innerHTML = this.render();
      this.bindEvents();
    }
  }
}
```

### Type-Safe Event System

**Study File**: `src/examples/03-advanced/event-system.ts`

**Learning Focus:**

- Generic event emitters
- Type-safe event subscription and emission
- Custom event definitions
- Event listener management
- Application-wide event bus patterns

**Event System:**

```typescript
interface EventMap {
  [key: string]: any;
}

class EventEmitter<T extends EventMap> {
  // Type-safe event subscription
  public on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    // Implementation
  }

  // Type-safe event emission
  public emit<K extends keyof T>(event: K, data: T[K]): void {
    // Implementation
  }
}

// Define your application events
interface AppEvents {
  "user-login": {userId: string; username: string};
  error: {message: string; code: number};
}

const eventBus = new EventEmitter<AppEvents>();
eventBus.on("user-login", (data) => {
  // data is properly typed!
  console.log(`Welcome ${data.username}!`);
});
```

### Production-Ready Patterns

**Study File**: `src/examples/03-advanced/production-patterns.ts`

**Learning Focus:**

- Singleton pattern for configuration
- Factory pattern for service creation
- Observer pattern for state management
- Dependency injection concepts
- Scalable architecture patterns

**Design Patterns:**

```typescript
// Singleton Pattern
class AppConfig {
  private static instance: AppConfig;

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}

// Factory Pattern
class ServiceFactory {
  public static createApiService(): ApiService {
    const config = AppConfig.getInstance();
    return new HttpService(config.get("apiUrl"));
  }
}

// Observer Pattern
class Store<T> {
  private observers: Observer<T>[] = [];

  public subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  public setState(newState: Partial<T>): void {
    this.state = {...this.state, ...newState};
    this.notifyObservers();
  }
}
```

---

## 🎯 Practice Exercises

### Beginner Level

1. **Convert JavaScript to TypeScript**: Take the JavaScript class examples and add proper typing
2. **Create a Book Class**: Implement a library book with properties like title, author, ISBN, and availability
3. **Add Validation**: Enhance your classes with input validation and error handling

### Intermediate Level

1. **Build a Course Management System**: Create classes for Course, Instructor, and Enrollment
2. **Implement Inheritance**: Create a hierarchy of Vehicle → Car → ElectricCar
3. **Design Interfaces**: Create interfaces for different user roles (Admin, Teacher, Student)

### Advanced Level

1. **Create a Component Library**: Build reusable UI components using the component architecture pattern
2. **Implement State Management**: Create a Redux-like state management system using classes
3. **Build a Plugin System**: Design an extensible plugin architecture using interfaces and factories

---

## 🔧 Development Workflow

### Getting Started

```bash
cd ts-workshop-2_classes
npm install
npm run dev
```

### Available Commands

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Check TypeScript types

### File Structure

```
src/
├── examples/           # Study these files in order
│   ├── 01-basics/     # Foundation concepts
│   ├── 02-project/    # Progressive project building
│   └── 03-advanced/   # Real-world patterns
├── workshop/          # Workshop presentation logic
└── styles/           # Styling for the workshop
```

---

## 📝 Assessment Checklist

### Foundation Understanding

- [ ] Can explain the difference between classes and instances
- [ ] Understands TypeScript type annotations
- [ ] Can identify access modifier purposes
- [ ] Knows when to use classes vs functions

### Object-Oriented Programming

- [ ] Can implement inheritance correctly
- [ ] Understands abstract classes vs interfaces
- [ ] Can design class hierarchies
- [ ] Applies polymorphism effectively

### TypeScript Mastery

- [ ] Uses generics appropriately
- [ ] Implements interfaces as contracts
- [ ] Applies type guards and type narrowing
- [ ] Handles error cases with proper typing

### Real-World Application

- [ ] Can integrate classes with DOM manipulation
- [ ] Understands component architecture patterns
- [ ] Implements proper event handling
- [ ] Applies design patterns appropriately

---

## 🚀 Next Steps

### Immediate Practice

1. **Extend the Examples**: Add new features to the provided classes
2. **Create Your Own Project**: Build a small application using the patterns learned
3. **Experiment with Patterns**: Try different design patterns in your code

### Advanced Learning

1. **Framework Integration**: Learn how these patterns apply to React, Vue, or Angular
2. **Testing**: Learn to test TypeScript classes with Jest or Vitest
3. **Advanced TypeScript**: Explore conditional types, mapped types, and utility types

### Professional Development

1. **Code Reviews**: Practice reviewing TypeScript class implementations
2. **Architecture Design**: Design larger systems using class-based architecture
3. **Performance Optimization**: Learn about memory management and optimization

---

## 📚 Additional Resources

### Documentation

- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [MDN - Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [Vite Documentation](https://vitejs.dev/)

### Best Practices

- Favor composition over inheritance
- Use interfaces to define contracts
- Keep classes focused and single-purpose
- Apply SOLID principles
- Write self-documenting code with good naming

### Common Pitfalls to Avoid

- Overusing inheritance (prefer composition)
- Making everything public (use proper encapsulation)
- Ignoring type safety (don't use `any` unnecessarily)
- Creating god classes (keep classes focused)
- Forgetting error handling and validation

---

## 🎉 Success Criteria

You've successfully mastered TypeScript classes when you can:

- [ ] Create well-structured TypeScript classes with proper typing
- [ ] Implement inheritance hierarchies that make sense
- [ ] Use interfaces to define clear contracts
- [ ] Integrate classes with DOM manipulation safely
- [ ] Apply design patterns appropriately
- [ ] Build maintainable, scalable class-based applications
- [ ] Debug and troubleshoot TypeScript class issues
- [ ] Explain your design decisions and trade-offs

**Congratulations!** You now have the skills to build professional TypeScript applications using class-based architecture. Keep practicing and exploring new patterns to continue growing as a developer!
