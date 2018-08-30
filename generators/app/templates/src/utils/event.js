class Event {
  constructor() {
    this.handlers = [];
  }

  on(type, fn) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push({ handle: fn, one: false });
  }

  one(type, fn) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers[type].push({ handle: fn, one: true });
  }

  emit(type, option, fn) {
    const handlers = this.handlers[type];
    for (let i = 0; i < handlers.length; i += 1) {
      if (fn) {
        if (handlers[i].handle === fn) {
          handlers[i].handle(option);
          if (handlers[i].one) {
            handlers.splice(i, 1);
          }
          break;
        }
      } else {
        handlers[i].handle(option);
        if (handlers[i].one) {
          handlers.splice(i, 1);
        }
      }
    }
  }

  remove(type, fn) {
    const handlers = this.handlers[type];
    if (fn) {
      for (let i = 0; i < handlers.length; i += 1) {
        if (handlers[i] === fn) {
          handlers.splice(i, 1);
          break;
        }
      }
    } else {
      delete this.handlers[type];
    }
  }
}
export default new Event();
