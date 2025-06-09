// Project Examples Handler - TypeScript Class for Hour 2 Project Section
import Prism from "prismjs";

interface ProjectSegment {
  id: string;
  title: string;
  description: string;
  filePath: string;
  concepts: string[];
  keyFeatures: string[];
}

export class ProjectExamples {
  private currentSegment: string = "";
  private currentTab: string = "preview";
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
      filePath: "/src/examples/02-project/student-basic.ts",
      concepts: ["Class declaration", "Constructor with typed parameters", "Public properties", "Method implementation", "Error handling"],
      keyFeatures: ["Type annotations", "Input validation", "Method overloading", "Boolean returns"],
    });

    this.segments.set("enhanced", {
      id: "enhanced",
      title: "Enhanced Grade Management",
      description: "Advanced features with private properties, Map data structure, and validation",
      filePath: "/src/examples/02-project/student-enhanced.ts",
      concepts: ["Private properties", "Encapsulation", "Map data structure", "Getters/Setters", "Data validation"],
      keyFeatures: ["Grade management system", "Performance calculations", "Data integrity", "Immutable returns"],
    });

    this.segments.set("advanced", {
      id: "advanced",
      title: "Inheritance & Polymorphism",
      description: "Abstract classes, inheritance patterns, and polymorphic behavior",
      filePath: "/src/examples/02-project/student-advanced.ts",
      concepts: ["Abstract classes", "Inheritance with extends", "Method overriding", "Polymorphism", "Static methods"],
      keyFeatures: ["Graduate vs Undergraduate", "Method specialization", "Type-specific behavior", "Professional patterns"],
    });

    this.segments.set("interfaces", {
      id: "interfaces",
      title: "Interface Contracts",
      description: "Type safety through interfaces, design patterns, and professional architecture",
      filePath: "/src/examples/02-project/student-interfaces.ts",
      concepts: ["Interface definitions", "Multiple implementation", "Generic interfaces", "Type guards", "Repository pattern"],
      keyFeatures: ["Type safety", "Design patterns", "Validation system", "Professional architecture"],
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

    // Tab buttons
    const tabButtons = document.querySelectorAll("[data-tab]");
    tabButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const tabId = (e.currentTarget as HTMLElement).getAttribute("data-tab");
        if (tabId) {
          this.switchTab(tabId);
        }
      });
    });
  }

  public async showSegment(segmentId: string): Promise<void> {
    const segment = this.segments.get(segmentId);
    if (!segment) return;

    this.currentSegment = segmentId;
    this.updateActiveButton(segmentId);
    await this.displaySegmentContent(segment);
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

  private async displaySegmentContent(segment: ProjectSegment): Promise<void> {
    const outputElement = document.getElementById("project-output");
    if (!outputElement) return;

    try {
      // Fetch the source code
      const response = await fetch(segment.filePath);
      const sourceCode = await response.text();

      // Display based on current tab
      switch (this.currentTab) {
        case "preview":
          this.displayPreview(outputElement, segment);
          break;
        case "source":
          this.displaySourceCode(outputElement, sourceCode, segment);
          break;
        case "output":
          this.displayConsoleOutput(outputElement, segment);
          break;
      }
    } catch (error: any) {
      outputElement.innerHTML = `
        <div class="error-message">
          <h4>❌ Error Loading File</h4>
          <p>Could not load ${segment.filePath}</p>
          <p>Error: ${error.message}</p>
        </div>
      `;
    }
  }

  private displayPreview(element: HTMLElement, segment: ProjectSegment): void {
    element.innerHTML = `
      <div class="segment-preview">
        <div class="preview-header">
          <h4>📋 ${segment.title}</h4>
          <p>${segment.description}</p>
        </div>
        
        <div class="preview-content">
          <div class="concepts-section">
            <h5>🎯 Key Concepts</h5>
            <ul class="concepts-list">
              ${segment.concepts.map((concept) => `<li>${concept}</li>`).join("")}
            </ul>
          </div>
          
          <div class="features-section">
            <h5>⚡ Key Features</h5>
            <ul class="features-list">
              ${segment.keyFeatures.map((feature) => `<li>${feature}</li>`).join("")}
            </ul>
          </div>
          
          <div class="implementation-guide">
            <h5>🚀 Implementation Guide</h5>
            <div class="guide-steps">
              ${this.getImplementationSteps(segment.id)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private displaySourceCode(element: HTMLElement, sourceCode: string, segment: ProjectSegment): void {
    // Highlight the code with Prism.js
    const cleanedSourceCode = sourceCode.replace(/\/\/# sourceMappingURL=.*$/, "");
    const highlightedCode = Prism.highlight(cleanedSourceCode, Prism.languages.typescript!, "typescript");

    element.innerHTML = `
      <div class="source-view">
        <div class="source-header">
          <h4>📄 ${segment.title} - Source Code</h4>
          <div class="file-info">
            <span class="file-path">${segment.filePath}</span>
            <span class="file-size">${sourceCode.length} characters</span>
          </div>
        </div>
        <div class="source-code">
          <pre><code class="language-typescript">${highlightedCode}</code></pre>
        </div>
      </div>
    `;
  }

  private displayConsoleOutput(element: HTMLElement, segment: ProjectSegment): void {
    element.innerHTML = `
      <div class="console-view">
        <div class="console-header">
          <h4>🖥️ Console Output - ${segment.title}</h4>
          <p>Expected output when running this code:</p>
        </div>
        <div class="console-content">
          <pre class="console-output">${this.getExpectedOutput(segment.id)}</pre>
        </div>
        <div class="console-footer">
          <p><strong>💡 Try it yourself:</strong> Copy the code to your editor and run it!</p>
        </div>
      </div>
    `;
  }

  private getImplementationSteps(segmentId: string): string {
    const steps = {
      basic: `
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <strong>Define the class structure</strong>
            <p>Create Student class with typed properties</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <strong>Implement constructor</strong>
            <p>Add validation and property initialization</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <strong>Add methods</strong>
            <p>Create getInfo, updateEmail, and utility methods</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <strong>Test the implementation</strong>
            <p>Create instances and verify functionality</p>
          </div>
        </div>
      `,
      enhanced: `
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <strong>Add private properties</strong>
            <p>Implement encapsulation with private fields</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <strong>Implement grade management</strong>
            <p>Use Map for storing subject grades</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <strong>Add getters/setters</strong>
            <p>Control access to private properties</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <strong>Calculate performance</strong>
            <p>Implement GPA and performance level methods</p>
          </div>
        </div>
      `,
      advanced: `
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <strong>Create abstract base class</strong>
            <p>Define Person with abstract methods</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <strong>Implement inheritance</strong>
            <p>Extend Person with AdvancedStudent</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <strong>Create specialized classes</strong>
            <p>GraduateStudent and UndergraduateStudent</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <strong>Demonstrate polymorphism</strong>
            <p>Process different student types uniformly</p>
          </div>
        </div>
      `,
      interfaces: `
        <div class="step">
          <span class="step-number">1</span>
          <div class="step-content">
            <strong>Define interface contracts</strong>
            <p>Create Gradeable, Enrollable, Reportable interfaces</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <div class="step-content">
            <strong>Implement multiple interfaces</strong>
            <p>InterfaceStudent implements all contracts</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <div class="step-content">
            <strong>Add validation system</strong>
            <p>Implement Validator interface and error handling</p>
          </div>
        </div>
        <div class="step">
          <span class="step-number">4</span>
          <div class="step-content">
            <strong>Create repository pattern</strong>
            <p>Generic Repository for data persistence</p>
          </div>
        </div>
      `,
    };

    return steps[segmentId as keyof typeof steps] || "";
  }

  private getExpectedOutput(segmentId: string): string {
    const outputs = {
      basic: `=== Basic Student Class Demo ===
Student: Alice Johnson (ID: STU001), Age: 20, Email: alice@university.edu
Student: Bob Smith (ID: STU002), Age: 17, Email: bob@university.edu
Alice Johnson is adult: true
Bob Smith is adult: false
Hello, my name is Alice Johnson. I am a student with ID STU001.
Hi! I'm Bob Smith, a 17-year-old student.
Updated email: alice.johnson@university.edu
Error caught: Age cannot be negative`,

      enhanced: `=== Enhanced Student Class Demo ===
Grade Report for Emma Wilson (STU003)
Enrollment Date: ${new Date().toDateString()}
==================================================
Chemistry: 85, 89, 93 (Average: 89)
Mathematics: 95, 87, 92 (Average: 91.33)
Physics: 88, 91 (Average: 89.5)
==================================================
Overall Average: 90.11

Performance Level: Excellent

Original email: emma@university.edu
Updated email: emma.wilson@university.edu
Error: Grade must be between 0 and 100
Error: Invalid email format`,

      advanced: `=== Advanced Student Classes Demo ===
=== Processing Students (Polymorphism Demo) ===
1. Junior (Undergraduate): John Doe (ID: STU004), Major: Computer Science
   Role: Junior (Undergraduate)
   GPA: 2.67
   Credits: 9
   Can Graduate: false
   Clubs: Programming Club, Chess Club

2. Graduate Student: Jane Smith (ID: STU005), Major: Computer Science, Research: Artificial Intelligence, Advisor: Dr. Johnson
   Role: Graduate Student
   GPA: 3.33
   Credits: 9
   Thesis: Machine Learning in Healthcare

Total persons created: 2
Jane Smith is defending thesis: "Machine Learning in Healthcare"`,

      interfaces: `=== Interface-driven Student Management Demo ===
Student Report: {
  studentInfo: {
    name: "Sarah Connor",
    id: "STU006",
    email: "sarah@university.edu",
    major: "Computer Science",
    year: 2
  },
  academicRecord: {
    courses: [
      { id: "CS101", name: "Introduction to Programming", credits: 3 },
      { id: "MATH201", name: "Calculus II", credits: 3 },
      { id: "PHYS101", name: "General Physics", credits: 3 }
    ],
    gpa: 3.33,
    totalCredits: 9
  }
}

Performance Summary: {
  overallGPA: 3.33,
  creditsCompleted: 9,
  academicStanding: "Good",
  recommendations: ["Maintain current performance", "Increase course load to stay on track"]
}

Current GPA: 3.33
Updated GPA: 3.5
Student saved to repository`,
    };

    return outputs[segmentId as keyof typeof outputs] || "No output available for this segment.";
  }

  public switchTab(tabId: string): void {
    this.currentTab = tabId;

    // Update tab button states
    const allTabs = document.querySelectorAll(".tab-btn");
    allTabs.forEach((tab) => tab.classList.remove("active"));

    const activeTab = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeTab) {
      activeTab.classList.add("active");
    }

    // Refresh content if we have a current segment
    if (this.currentSegment) {
      const segment = this.segments.get(this.currentSegment);
      if (segment) {
        this.displaySegmentContent(segment);
      }
    }
  }
}
