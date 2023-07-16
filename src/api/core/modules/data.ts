type Module = {
    prop: string;
    filter: ((self) => boolean | void) | null;
}

type ModuleRecord = Record<string, Module>;

const exfiltratedModules = {
    React: {
        prop: "useRef",
        filter: null
    },
    Redux: {
        prop: "sagaMonitor",
        filter: null
    }
} satisfies ModuleRecord;

const globalModules = {
    Immutable: {
        prop: "$I",
        filter: null
    }
} satisfies ModuleRecord;

export { exfiltratedModules, globalModules };