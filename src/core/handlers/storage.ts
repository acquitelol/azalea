class StorageHandler {
    protected name = 'Storage';
    protected logging = true;

    constructor(name: string, shouldLog: boolean = true) {
        this.name = name;
        this.logging = shouldLog;

        this.init();
    }

    protected init() {
        if (localStorage.getItem(this.name)) return;
        localStorage.setItem(this.name, JSON.stringify({}));
    }

    protected log(type: string, ...data: any[]) {
        if (!this.logging) return;

        console.info(type, ...data);
    }

    protected error(type: string, ...data: any[]) {
        console.error(type, ...data);
    }

    set(key: string, value: any) {
        this.init();

        if (typeof key === 'string') {
            this.log('Setting', { key, value });
        } else {
            return this.error('Setting', { key, value });
        }

        const items = JSON.parse(localStorage.getItem(this.name) ?? '{}');
        localStorage.setItem(this.name, JSON.stringify({ ...items, [key]: value }));
    }

    get(key: string) {
        this.init();
        this.log('Getting', { key });

        const items = JSON.parse(localStorage.getItem(this.name) ?? '{}');
        return items[key] ?? null;
    }

    delete(key: string) {
        this.init();

        if (typeof key === 'string') {
            this.log('Deleting', { key });
        } else {
            return this.error('Deleting', { key });
        }

        const { [key]: _, ...rest } = JSON.parse(localStorage.getItem(this.name) ?? '{}');
        localStorage.setItem(this.name, JSON.stringify({ ...rest }));
    }

    toggle(key: string) {
        this.init();

        if (typeof key === 'string') {
            this.log('Toggling', { key });
        } else {
            return this.error('Toggling', { key });
        }

        this.set(key, !this.get(key));
    }

    list() {
        this.init();
        this.log('Listing', { _: null });

        return JSON.parse(localStorage.getItem(this.name) ?? '{}') as AnyProps;
    }

    clear() {
        // This doesn't need a this.init() call
        this.log('Clearing', { _: null });
        localStorage.setItem(this.name, '{}');
    }
};

export default StorageHandler;