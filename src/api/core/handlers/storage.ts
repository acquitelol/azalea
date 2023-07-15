class LocalStorageHandler {
    name = "Storage";
    shouldLog = true;

    constructor(name: string, shouldLog: boolean = true) {
        this.name = name;
        this.shouldLog = shouldLog;

        this.init();
    }

    init() {
        if (localStorage.getItem(this.name)) return;
        localStorage.setItem(this.name, JSON.stringify({}));
    }

    set(key, value) {
        this.init();
        this.shouldLog && console.log("SET", { key, value });

        const items = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        localStorage.setItem(this.name, JSON.stringify({ ...items, [key]: value }));
    }

    delete(key) {
        this.init();
        this.shouldLog && console.log("DELETE", { key });

        const { [key]: _, ...rest } = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        localStorage.setItem(this.name, JSON.stringify({ ...rest }));
    }

    get(key) {
        this.init();
        this.shouldLog && console.log("GET", { key });

        const items = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        return items[key] ?? null;
    }

    list() {
        this.init();
        this.shouldLog && console.log("LIST", { _: null });

        return JSON.parse(localStorage.getItem(this.name) ?? "{}");
    }
};

export default LocalStorageHandler