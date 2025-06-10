// DOM Integration - Type-Safe Element Management
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

  // ✅ Type-safe element access
  public getElement(): T {
    return this.element;
  }

  // ✅ Fluent API with method chaining
  public setText(text: string): this {
    this.element.textContent = text;
    return this;
  }

  public addClass(className: string): this {
    this.element.classList.add(className);
    return this;
  }

  public removeClass(className: string): this {
    this.element.classList.remove(className);
    return this;
  }

  // ✅ Type-safe event handling
  public on<K extends keyof HTMLElementEventMap>(event: K, handler: (event: HTMLElementEventMap[K]) => void): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    const eventListener = handler as EventListener;
    this.listeners.get(event)!.push(eventListener);
    this.element.addEventListener(event, eventListener);
    return this;
  }

  // ✅ Clean up resources
  public destroy(): void {
    for (const [event, handlers] of this.listeners) {
      handlers.forEach((handler) => {
        this.element.removeEventListener(event, handler);
      });
    }
    this.listeners.clear();
  }
}

// Usage Example - Interactive Button
const button = new DOMManager<HTMLButtonElement>("#demo-button")
  .setText("Click Me!")
  .addClass("btn-primary")
  .on("click", (e) => {
    console.log("Button clicked!", e.target);
  })
  .on("mouseenter", () => {
    console.log("Mouse entered button");
  });

export {DOMManager};
