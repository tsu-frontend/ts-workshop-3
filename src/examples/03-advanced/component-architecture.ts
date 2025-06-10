// Component Architecture - Reusable UI Components
interface ComponentProps {
  [key: string]: any;
}

interface ComponentState {
  [key: string]: any;
}

abstract class Component<P extends ComponentProps = {}, S extends ComponentState = {}> {
  protected element: HTMLElement;
  protected props: P;
  protected state: S;
  private mounted: boolean = false;

  constructor(container: string | HTMLElement, props: P, initialState: S) {
    this.element = typeof container === "string" ? document.querySelector(container)! : container;
    this.props = props;
    this.state = initialState;
  }

  // ✅ Abstract methods - must be implemented
  protected abstract render(): string;
  protected abstract bindEvents(): void;

  // ✅ Lifecycle methods
  public mount(): void {
    if (this.mounted) return;

    this.element.innerHTML = this.render();
    this.bindEvents();
    this.mounted = true;
    this.onMount();
  }

  public unmount(): void {
    if (!this.mounted) return;

    this.onUnmount();
    this.element.innerHTML = "";
    this.mounted = false;
  }

  // ✅ State management with re-rendering
  protected setState(newState: Partial<S>): void {
    this.state = {...this.state, ...newState};
    if (this.mounted) {
      this.element.innerHTML = this.render();
      this.bindEvents();
    }
  }

  // ✅ Lifecycle hooks
  protected onMount(): void {}
  protected onUnmount(): void {}
}

// ✅ Concrete Component Implementation
class Counter extends Component<{}, {count: number}> {
  constructor(container: string | HTMLElement) {
    super(container, {}, {count: 0});
  }

  protected render(): string {
    return `
      <div class="counter">
        <h3>Counter: ${this.state.count}</h3>
        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="reset">Reset</button>
      </div>
    `;
  }

  protected bindEvents(): void {
    this.element.querySelector("#increment")?.addEventListener("click", () => {
      this.setState({count: this.state.count + 1});
    });

    this.element.querySelector("#decrement")?.addEventListener("click", () => {
      this.setState({count: this.state.count - 1});
    });

    this.element.querySelector("#reset")?.addEventListener("click", () => {
      this.setState({count: 0});
    });
  }

  protected onMount(): void {
    console.log("Counter component mounted!");
  }
}

// Usage
const counter = new Counter("#counter-container");
counter.mount();

export {Component, Counter};
export type {ComponentProps, ComponentState};
