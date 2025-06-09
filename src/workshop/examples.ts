// Workshop Code Examples - Interactive Display System
import Prism from "prismjs";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";

interface CodeExample {
  title: string;
  description: string;
  code: string;
  language: "javascript" | "typescript";
}

export class ExampleDisplay {
  private outputElement: HTMLElement;
  private currentExample: string = "";

  private examples: Record<string, CodeExample> = {
    "js-limitations": {
      title: "JavaScript Class Limitations",
      description: "Problems with JavaScript classes that TypeScript solves",
      language: "javascript",
      code: `// ❌ JavaScript Problems
class Student {
  constructor(name, age) {
    this.name = name;
    this.age = age; // No type checking!
  }
  
  setAge(newAge) {
    this.age = newAge; // What if someone passes a string?
  }
}

// Runtime errors only!
const student = new Student("Alice", "twenty"); // ❌ Age should be number
student.setAge("very old"); // ❌ No compile-time error!

console.log(\`Age: \${student.age}\`); // "very old" - Wrong type!`,
    },

    "ts-benefits": {
      title: "TypeScript Class Benefits",
      description: "How TypeScript solves JavaScript class problems",
      language: "typescript",
      code: `// ✅ TypeScript Solutions
class Student {
  public name: string;
  public age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age; // Type safety enforced!
  }
  
  public setAge(newAge: number): void {
    if (newAge < 0) throw new Error('Age cannot be negative');
    this.age = newAge; // Only numbers allowed!
  }
}

// Compile-time type checking!
const student = new Student("Alice", 20); // ✅ Types enforced
// student.setAge("very old"); // ❌ TypeScript error!

console.log(\`Age: \${student.age}\`); // 20 - Correct type!`,
    },

    "build-tools": {
      title: "Modern Build Tools (Vite)",
      description: "How Vite enhances the development experience",
      language: "typescript",
      code: `// vite.config.ts - Modern Build Configuration
import {defineConfig} from "vite";

export default defineConfig({
  server: {
    port: 3000,
    open: true,
    hmr: true, // 🔥 Hot Module Replacement
  },
  build: {
    target: "es2020",
    sourcemap: true, // 🗺️ Debug support
    minify: "terser", // 📦 Optimized builds
  }
});

// Benefits:
// ⚡ Lightning fast builds (< 500ms)
// 🔄 Instant hot reload on file changes
// 📊 Real-time TypeScript compilation
// 🚀 Production-ready optimization`,
    },

    workflow: {
      title: "Complete Development Workflow",
      description: "From TypeScript source to browser delivery",
      language: "typescript",
      code: `// Complete Development Pipeline

// 1. Write TypeScript classes
class Student {
  private _grades: Map<string, number> = new Map();
  
  public addGrade(subject: string, grade: number): void {
    this._grades.set(subject, grade);
  }
}

// 2. Vite compiles TypeScript → JavaScript
// 3. Hot reload updates browser instantly
// 4. Production build optimizes for deployment

// Package.json scripts:
{
  "dev": "vite",           // 🔧 Development server
  "build": "tsc && vite build", // 📦 Production build
  "preview": "vite preview"     // 👀 Preview build
}

// Result: Professional development experience! 🎯`,
    },
  };

  constructor() {
    this.outputElement = document.getElementById("code-output")!;
    this.initializeButtons();
  }

  private initializeButtons(): void {
    const buttons = document.querySelectorAll(".learn-btn");
    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const exampleKey = (e.target as HTMLElement).getAttribute("data-example");
        if (exampleKey) {
          this.showExample(exampleKey);
          this.setActiveButton(button as HTMLElement);
        }
      });
    });
  }

  private setActiveButton(activeButton: HTMLElement): void {
    // Remove active class from all buttons
    document.querySelectorAll(".learn-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    // Add active class to clicked button
    activeButton.classList.add("active");
  }

  private showExample(exampleKey: string): void {
    const example = this.examples[exampleKey];
    if (!example) return;

    this.currentExample = exampleKey;

    // Create formatted HTML with Prism.js syntax highlighting
    const formattedCode = this.formatCode(example.code, example.language);

    this.outputElement.innerHTML = `
      <div class="example-header">
        <h4 class="success">📝 ${example.title}</h4>
        <p class="comment">${example.description}</p>
      </div>
      <pre class="language-${example.language}"><code>${formattedCode}</code></pre>
    `;

    // Smooth scroll to code if needed
    this.outputElement.scrollIntoView({behavior: "smooth", block: "nearest"});
  }

  private formatCode(code: string, language: "javascript" | "typescript"): string {
    // Use Prism.js for professional syntax highlighting
    const grammar = Prism.languages[language];
    if (!grammar) {
      console.warn(`Language ${language} not found, using plain text`);
      return code;
    }

    const highlighted = Prism.highlight(code, grammar, language);

    // Add our custom indicators on top of Prism highlighting
    return highlighted.replace(/(❌[^\n]*)/g, '<span class="error">$1</span>').replace(/(✅[^\n]*)/g, '<span class="success">$1</span>');
  }

  public getCurrentExample(): string {
    return this.currentExample;
  }
}
