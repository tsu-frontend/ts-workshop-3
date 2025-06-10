// Type-Safe Event System - Custom Events with Generics
interface EventMap {
  [key: string]: any;
}

class EventEmitter<T extends EventMap> {
  private listeners: Map<keyof T, Array<(data: any) => void>> = new Map();

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
      eventListeners.forEach((listener) => listener(data));
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
  "user-login": {userId: string; username: string};
  "user-logout": {userId: string};
  "data-updated": {table: string; records: number};
  error: {message: string; code: number};
}

// ✅ Type-safe usage
class AppEventBus extends EventEmitter<AppEvents> {
  // Additional app-specific methods
  public logUserIn(userId: string, username: string): void {
    console.log(`User ${username} logging in...`);
    this.emit("user-login", {userId, username});
  }

  public handleError(message: string, code: number): void {
    console.error(`Error ${code}: ${message}`);
    this.emit("error", {message, code});
  }
}

// Usage Example
const eventBus = new AppEventBus();

// ✅ Type-safe event listeners
eventBus.on("user-login", (data) => {
  console.log(`Welcome ${data.username}! (ID: ${data.userId})`);
});

eventBus.on("error", (data) => {
  console.log(`Handling error: ${data.message} (Code: ${data.code})`);
});

// ✅ Emit events with type checking
eventBus.logUserIn("123", "Alice");
eventBus.handleError("Network timeout", 500);

export {EventEmitter, AppEventBus};
export type {EventMap, AppEvents};
