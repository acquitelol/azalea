type Module = {
    prop: string;
    filter: ((r: any) => boolean | void) | null;
}

type ModuleRecord = Record<string, Module | string>;

const exfiltratedModules = {
    React: {
        prop: "useRef",
        filter: r => "createElement" in r
    },
    ReactDOM: {
        prop: "findDOMNode",
        filter: r => "createPortal" in r
    },
    Redux: {
        prop: "sagaMonitor",
        filter: r => "getState" in r && "dispatch" in r
    },
    Effects: {
        prop: "take",
        filter: r => "@@redux-saga/MULTICAST" in r
    },
    Protobuf: {
        prop: "FileDescriptorProto",
        filter: r => "EnumValueDescriptorProto" in r
    },
    Assertions: {
        prop: "abstractMethod",
        filter: r => "isString" in r
    },
    Moment: {
        prop: "hasAlignedHourOffset",
        filter: r => "isoWeeksInISOWeekYear" in r
    },
    UUID: {
        prop: "v4",
        filter: r => "v1" in r
    }
} satisfies ModuleRecord;

const globalModules = {
    Immutable: "$I",
    PIXI: "PIXI"
} satisfies ModuleRecord;

export { exfiltratedModules, globalModules };