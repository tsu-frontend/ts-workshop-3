// Advanced Examples Handler - TypeScript Classes for Real-World Integration
import {SyntaxHighlighter} from "./syntax-highlighter";

interface AdvancedExample {
  id: string;
  title: string;
  description: string;
  code: string;
  language: "typescript";
  interactive?: boolean;
}

export class AdvancedExamples {
  private currentExample: string = "";
  private examples: Map<string, AdvancedExample> = new Map();

  constructor() {
    this.initializeExamples();
    this.initializeEventListeners();
  }

  private initializeExamples(): void {
    this.examples.set("dom-integration", {
      id: "dom-integration",
      title: "DOM Integration with Type Safety",
      description: "TypeScript classes for safe DOM manipulation and element management",
      language: "typescript",
      interactive: true,
      code: `// DOM Integration - Type-Safe Element Management
class DOMManager<T extends HTMLElement> {
  private element: T;
  private listeners: Map<string, EventListener[]> = new Map();

  constructor(selector: string) {
    const element = document.querySelector(selector) as T;
    if (!element) {
      throw new Error(\`Element not found: \${selector}\`);
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
  public on<K extends keyof HTMLElementEventMap>(
    event: K,
    handler: (event: HTMLElementEventMap[K]) => void
  ): this {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    
    this.listeners.get(event)!.push(handler);
    this.element.addEventListener(event, handler);
    return this;
  }

  // ✅ Clean up resources
  public destroy(): void {
    for (const [event, handlers] of this.listeners) {
      handlers.forEach(handler => {
        this.element.removeEventListener(event, handler);
      });
    }
    this.listeners.clear();
  }
}

// Usage Example - Interactive Button
const button = new DOMManager<HTMLButtonElement>('#demo-button')
  .setText('Click Me!')
  .addClass('btn-primary')
  .on('click', (e) => {
    console.log('Button clicked!', e.target);
  })
  .on('mouseenter', () => {
    console.log('Mouse entered button');
  });`,
    });

    this.examples.set("component-architecture", {
      id: "component-architecture",
      title: "Component Architecture Pattern",
      description: "Building reusable UI components with TypeScript classes and lifecycle management",
      language: "typescript",
      interactive: true,
      code: `// Component Architecture - Reusable UI Components
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
    this.element = typeof container === 'string' 
      ? document.querySelector(container)! 
      : container;
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
    this.element.innerHTML = '';
    this.mounted = false;
  }

  // ✅ State management with re-rendering
  protected setState(newState: Partial<S>): void {
    this.state = { ...this.state, ...newState };
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
class Counter extends Component<{}, { count: number }> {
  constructor(container: string | HTMLElement) {
    super(container, {}, { count: 0 });
  }

  protected render(): string {
    return \`
      <div class="counter">
        <h3>Counter: \${this.state.count}</h3>
        <button id="increment">+</button>
        <button id="decrement">-</button>
        <button id="reset">Reset</button>
      </div>
    \`;
  }

  protected bindEvents(): void {
    this.element.querySelector('#increment')?.addEventListener('click', () => {
      this.setState({ count: this.state.count + 1 });
    });

    this.element.querySelector('#decrement')?.addEventListener('click', () => {
      this.setState({ count: this.state.count - 1 });
    });

    this.element.querySelector('#reset')?.addEventListener('click', () => {
      this.setState({ count: 0 });
    });
  }

  protected onMount(): void {
    console.log('Counter component mounted!');
  }
}

// Usage
const counter = new Counter('#counter-container');
counter.mount();`,
    });

    this.examples.set("event-system", {
      id: "event-system",
      title: "Type-Safe Event System",
      description: "Custom event system with TypeScript generics and type safety",
      language: "typescript",
      code: `// Type-Safe Event System - Custom Events with Generics
interface EventMap {
  [key: string]: any;
}

class EventEmitter<T extends EventMap> {
  private listeners: Map<keyof T, Array<(data: T[keyof T]) => void>> = new Map();

  // ✅ Type-safe event subscription
  public on<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }
    this.listeners.get(event)!.push(listener);
  }

  // ✅ Type-safe event emission
  public emit<K extends keyof T>(event: K, data: T[K]): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(listener => listener(data));
    }
  }

  // ✅ Remove specific listener
  public off<K extends keyof T>(event: K, listener: (data: T[K]) => void): void {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      const index = eventListeners.indexOf(listener);
      if (index > -1) {
        eventListeners.splice(index, 1);
      }
    }
  }

  // ✅ Remove all listeners for event
  public removeAllListeners<K extends keyof T>(event?: K): void {
    if (event) {
      this.listeners.delete(event);
    } else {
      this.listeners.clear();
    }
  }
}

// ✅ Define your application events
interface AppEvents {
  'user-login': { userId: string; username: string };
  'user-logout': { userId: string };
  'data-updated': { table: string; records: number };
  'error': { message: string; code: number };
}

// ✅ Type-safe usage
class AppEventBus extends EventEmitter<AppEvents> {
  // Additional app-specific methods
  public logUserIn(userId: string, username: string): void {
    console.log(\`User \${username} logging in...\`);
    this.emit('user-login', { userId, username });
  }

  public handleError(message: string, code: number): void {
    console.error(\`Error \${code}: \${message}\`);
    this.emit('error', { message, code });
  }
}

// Usage Example
const eventBus = new AppEventBus();

// ✅ Type-safe event listeners
eventBus.on('user-login', (data) => {
  console.log(\`Welcome \${data.username}! (ID: \${data.userId})\`);
});

eventBus.on('error', (data) => {
  console.log(\`Handling error: \${data.message} (Code: \${data.code})\`);
});

// ✅ Emit events with type checking
eventBus.logUserIn('123', 'Alice');
eventBus.handleError('Network timeout', 500);`,
    });

    this.examples.set("production-patterns", {
      id: "production-patterns",
      title: "Production-Ready Patterns",
      description: "Professional patterns for scalable TypeScript applications",
      language: "typescript",
      code: `// Production Patterns - Scalable Architecture
// ✅ Singleton Pattern for App Configuration
class AppConfig {
  private static instance: AppConfig;
  private config: Map<string, any> = new Map();

  private constructor() {
    // Load configuration
    this.config.set('apiUrl', process.env.API_URL || 'http://localhost:3000');
    this.config.set('debug', process.env.NODE_ENV === 'development');
  }

  public static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  public get<T>(key: string): T {
    return this.config.get(key);
  }

  public set(key: string, value: any): void {
    this.config.set(key, value);
  }
}

// ✅ Factory Pattern for Service Creation
interface ApiService {
  get(endpoint: string): Promise<any>;
  post(endpoint: string, data: any): Promise<any>;
}

class HttpService implements ApiService {
  constructor(private baseUrl: string) {}

  async get(endpoint: string): Promise<any> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`);
    return response.json();
  }

  async post(endpoint: string, data: any): Promise<any> {
    const response = await fetch(\`\${this.baseUrl}\${endpoint}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  }
}

class ServiceFactory {
  private static services: Map<string, any> = new Map();

  public static createApiService(): ApiService {
    if (!this.services.has('api')) {
      const config = AppConfig.getInstance();
      this.services.set('api', new HttpService(config.get('apiUrl')));
    }
    return this.services.get('api');
  }
}

// ✅ Observer Pattern for State Management
interface Observer<T> {
  update(data: T): void;
}

class Store<T> {
  private state: T;
  private observers: Observer<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  public subscribe(observer: Observer<T>): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer<T>): void {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }

  public setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notifyObservers();
  }

  public getState(): T {
    return { ...this.state };
  }

  private notifyObservers(): void {
    this.observers.forEach(observer => observer.update(this.state));
  }
}

// ✅ Usage Example
interface AppState {
  user: { id: string; name: string } | null;
  loading: boolean;
}

const appStore = new Store<AppState>({
  user: null,
  loading: false
});

class UserComponent implements Observer<AppState> {
  update(state: AppState): void {
    console.log('User component updated:', state.user);
  }
}

const userComponent = new UserComponent();
appStore.subscribe(userComponent);

// Trigger state change
appStore.setState({ 
  user: { id: '1', name: 'Alice' }, 
  loading: false 
});`,
    });
  }

  private initializeEventListeners(): void {
    // Advanced example buttons
    const advancedButtons = document.querySelectorAll("[data-advanced]");
    advancedButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const exampleId = (e.currentTarget as HTMLElement).getAttribute("data-advanced");
        if (exampleId) {
          this.showExample(exampleId);
        }
      });
    });
  }

  public showExample(exampleId: string): void {
    const example = this.examples.get(exampleId);
    if (!example) return;

    this.currentExample = exampleId;
    this.updateActiveButton(exampleId);
    this.displayExample(example);
  }

  private updateActiveButton(exampleId: string): void {
    // Remove active class from all advanced buttons
    const allButtons = document.querySelectorAll(".advanced-btn");
    allButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to current button
    const activeButton = document.querySelector(`[data-advanced="${exampleId}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
    }
  }

  private displayExample(example: AdvancedExample): void {
    const outputElement = document.getElementById("advanced-output");
    if (!outputElement) return;

    // Create formatted HTML with syntax highlighting
    const highlightedCode = SyntaxHighlighter.highlightTypeScript(example.code);

    outputElement.innerHTML = `
      <div class="example-header">
        <h4 class="success">🚀 ${example.title}</h4>
        <p class="comment">${example.description}</p>
        ${example.interactive ? '<span class="interactive-badge">🎮 Interactive Example</span>' : ""}
      </div>
      <pre class="language-typescript"><code>${highlightedCode}</code></pre>
    `;

    // Smooth scroll to code if needed
    outputElement.scrollIntoView({behavior: "smooth", block: "nearest"});
  }
}
