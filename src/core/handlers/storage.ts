class LocalStorageHandler {
    protected name = "Storage";
    protected shouldLog = true;

    constructor(name: string, shouldLog: boolean = true) {
        this.name = name;
        this.shouldLog = shouldLog;

        this.init();
    }

    protected init() {
        if (localStorage.getItem(this.name)) return;
        localStorage.setItem(this.name, JSON.stringify({}));
    }
    
    protected log(type: string, ...data: any[]) {
        if (!this.shouldLog) return;
        console.log(type, ...data);
    }

    protected error(type: string, ...data: any[]) {
        console.error(type, ...data);
    }

    set(key: string, value: any) {
        this.init();

        if (typeof key === "string") {
            this.log("SET", { key, value })
        } else {
            return this.error("SET", { key, value })
        }

        const items = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        localStorage.setItem(this.name, JSON.stringify({ ...items, [key]: value }));
    }

    get(key: string) {
        this.init();
        this.log("GET", { key });

        const items = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        return items[key] ?? null;
    }

    delete(key: string) {
        this.init();

        if (typeof key === "string") {
            this.log("DELETE", { key })
        } else {
            return this.error("DELETE", { key })
        }

        const { [key]: _, ...rest } = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        localStorage.setItem(this.name, JSON.stringify({ ...rest }));
    }

    toggle(key: string) {
        this.init();

        if (typeof key === "string") {
            this.log("TOGGLE", { key })
        } else {
            return this.error("TOGGLE", { key })
        }

        this.set(key, !this.get(key));
    }

    list() {
        this.init();
        this.log("LIST", { _: null });

        return JSON.parse(localStorage.getItem(this.name) ?? "{}");
    }

    clear() {
        // This doesn't need a this.init() call
        this.log("CLEAR", { _: null });
        localStorage.setItem(this.name, "{}");
    }
};

export default LocalStorageHandler