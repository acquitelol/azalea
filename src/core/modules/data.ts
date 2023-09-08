import { ModuleRecord } from "@azalea/types";

const exfiltratedModules = {
    React: {
        prop: "useContext",
        filter: () => true
    },
    ReactDOM: {
        prop: "findDOMNode",
        filter: r => "createPortal" in r
    },
    Router: {
        prop: "Outlet",
        filter: () => true
    }
} satisfies ModuleRecord;

const globalModules = {
    Immutable: "$I",
    // PIXI: "PIXI"
} satisfies ModuleRecord;

export { exfiltratedModules, globalModules };