// Production Patterns - Scalable Architecture
// ✅ Singleton Pattern for App Configuration
class AppConfig {
  private static instance: AppConfig;
  private config: Map<string, any> = new Map();

  private constructor() {
    // Load configuration
    this.config.set("apiUrl", process.env.API_URL || "http://localhost:3000");
    this.config.set("debug", process.env.NODE_ENV === "development");
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
    const response = await fetch(`${this.baseUrl}${endpoint}`);
    return response.json();
  }

  async post(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    return response.json();
  }
}

class ServiceFactory {
  private static services: Map<string, any> = new Map();

  public static createApiService(): ApiService {
    if (!this.services.has("api")) {
      const config = AppConfig.getInstance();
      this.services.set("api", new HttpService(config.get("apiUrl")));
    }
    return this.services.get("api");
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
    this.state = {...this.state, ...newState};
    this.notifyObservers();
  }

  public getState(): T {
    return {...this.state};
  }

  private notifyObservers(): void {
    this.observers.forEach((observer) => observer.update(this.state));
  }
}

// ✅ Usage Example
interface AppState {
  user: {id: string; name: string} | null;
  loading: boolean;
}

const appStore = new Store<AppState>({
  user: null,
  loading: false,
});

class UserComponent implements Observer<AppState> {
  update(state: AppState): void {
    console.log("User component updated:", state.user);
  }
}

const userComponent = new UserComponent();
appStore.subscribe(userComponent);

// Trigger state change
appStore.setState({
  user: {id: "1", name: "Alice"},
  loading: false,
});

export {AppConfig, HttpService, ServiceFactory, Store, UserComponent};
export type {ApiService, Observer, AppState};
