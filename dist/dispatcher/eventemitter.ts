export type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;

function isFunction(obj:any) {
    return typeof obj === 'function';
}

export class EventEmitterClass {
    listeners: Map<string,Array<CallbackFunctionVariadicAnyReturn>>;
    private static _instance:EventEmitterClass = new EventEmitterClass();
    
    constructor() {
        if(EventEmitterClass._instance){
            throw new Error("Error: Instantiation failed: Use EventEmitterClass.getInstance() instead of new.");
        }
        EventEmitterClass._instance = this;
        this.listeners = new Map();
    }

    public static getInstance():EventEmitterClass {
        return EventEmitterClass._instance;
    };

    addListener(label:string, callback:CallbackFunctionVariadicAnyReturn) {
        if (!this.listeners.has(label)) {
            this.listeners.set(label, []);
        }
        this.listeners.get(label).push(callback);
    }

    on(label:string, callback:CallbackFunctionVariadicAnyReturn) {
        this.addListener(label, callback);
    }

    removeListener(label:string, callback:CallbackFunctionVariadicAnyReturn): boolean {
        const listeners = this.listeners.get(label);
        let index;

        if (listeners && listeners.length) {
            index = listeners.reduce((i:any, listener:any, idx:any) => {
                return (isFunction(listener) && listener === callback) ? idx : i;
            }, -1);

            if (index > -1) {
                listeners.splice(index, 1);
                this.listeners.set(label, listeners);
                return true;
            }
        }
        return false;
    }

    off(label:string, callback:CallbackFunctionVariadicAnyReturn) {
        this.removeListener(label, callback);
    }

    emit(label:any, ...args:any[]): boolean {
        const listeners = this.listeners.get(label);

        if (listeners && listeners.length) {
            listeners.forEach((listener:any) => {
                listener(...args);
            });
            return true;
        }
        return false;
    }
}