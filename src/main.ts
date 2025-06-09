// Main TypeScript entry point for the workshop
// This demonstrates the complete development workflow from TS source to browser

import {WorkshopNavigation} from "./workshop/navigation";
import {ExampleDisplay} from "./workshop/examples";
import {ProjectExamples} from "./workshop/project-examples";
import {Student} from "./examples/01-basics/ts-classes";
import "./styles/main.css";
import "prismjs/themes/prism-tomorrow.css";

console.log("🚀 TypeScript Classes Workshop - Vite Build System Active!");

// Demonstrate TypeScript classes working in the browser
const demoStudent = new Student("Demo Student", 22, "DEMO001");
demoStudent.addGrade("TypeScript", 95);
console.log("✅ TypeScript class instantiated successfully!");
console.log(`📊 Demo student average: ${demoStudent.getAverageGrade()}`);

// Initialize workshop navigation and examples
const navigation = new WorkshopNavigation();
const examples = new ExampleDisplay();
const projectExamples = new ProjectExamples();

// Demonstrate TypeScript compilation in action
class WorkshopDemo {
  private currentSection: string = "basics";

  constructor() {
    this.initializeWorkshop();
    this.showBuildInfo();
  }

  private initializeWorkshop(): void {
    console.log("✅ TypeScript classes compiled successfully!");
    console.log("🔥 Hot Module Replacement active");
    console.log("📦 Vite build system ready");
  }

  private showBuildInfo(): void {
    const buildInfo = {
      timestamp: new Date().toISOString(),
      environment: "development",
      hmr: true,
      typeScript: "5.x",
      vite: "6.x",
    };

    console.table(buildInfo);
  }

  public switchSection(section: string): void {
    this.currentSection = section;
    console.log(`📍 Switched to section: ${section}`);
  }
}

// Initialize the workshop
const workshop = new WorkshopDemo();

// Make it available globally for demonstration purposes
(window as any).workshop = workshop;

// Hot Module Replacement (HMR) setup
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    console.log("🔄 Hot reload triggered - TypeScript changes detected!");
  });
}
