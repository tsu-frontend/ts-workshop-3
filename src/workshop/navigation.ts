// Workshop Navigation - TypeScript Class Example
export class WorkshopNavigation {
  private sections: string[] = ["basics", "project", "advanced"];
  private currentIndex: number = 0;

  constructor() {
    this.initializeNavigation();
  }

  private initializeNavigation(): void {
    // Add click handlers to navigation links
    const navLinks = document.querySelectorAll("[data-section]");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const section = (e.target as HTMLElement).getAttribute("data-section");
        if (section) {
          this.navigateToSection(section);
        }
      });
    });
  }

  public navigateToSection(sectionName: string): void {
    // Hide all sections
    const allSections = document.querySelectorAll(".workshop-section");
    allSections.forEach((section) => {
      section.classList.remove("active");
    });

    // Show target section
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
      targetSection.classList.add("active");
      this.currentIndex = this.sections.indexOf(sectionName);
      console.log(`📖 Navigated to: ${sectionName}`);
    }
  }

  public nextSection(): void {
    const nextIndex = (this.currentIndex + 1) % this.sections.length;
    this.navigateToSection(this.sections[nextIndex]!);
  }

  public previousSection(): void {
    const prevIndex = (this.currentIndex - 1 + this.sections.length) % this.sections.length;
    this.navigateToSection(this.sections[prevIndex]!);
  }

  public getCurrentSection(): string {
    return this.sections[this.currentIndex]!;
  }
}
