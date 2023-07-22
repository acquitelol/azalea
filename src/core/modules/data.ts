import { ModuleRecord } from "@azalea/types";

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
        prop: "getState",
        filter: r => "dispatch" in r
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