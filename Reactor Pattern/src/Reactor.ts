interface IEvent {
  name: string;
  callbacks: Function[];
}

class Reactor {
  events!: Map<string, IEvent>;
  private static instance: Reactor;

  constructor() {
    if (Reactor.instance) return Reactor.instance;

    this.events = new Map();
    Reactor.instance = this;
  }

  Register (name: string) {
    const event:IEvent = {
      name,
      callbacks: [],
    };

    this.events.set(name, event);
  }

  disptatch (name: string, eventArgs: any) {
    const event = this.events.get(name);
    if (event) {
      event.callbacks.forEach(callback => callback(eventArgs));
    }
  }

  addEventListener (name: string, callback: Function) {
    const event = this.events.get(name);
    if (event) {
      event.callbacks.push(callback);
    }
  }

  removeEventListener (name: string, callback: Function) {
    const event = this.events.get(name);
    if (event) {
      event.callbacks = event.callbacks.filter(cb => cb !== callback);
    }
  }
}