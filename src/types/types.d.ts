declare module "@azalea/types" {
    import { exfiltratedModules, globalModules } from "@modules/data";

    export interface BaseItem {
        text: string;
    
        img: string;
        hoverImg: string;
        keyBinding: string | null;
    
        action: string;
        callback(...args: any[]): any | null;
    }

    export type Module = {
        prop: string;
        filter: ((r: any) => boolean | void) | null;
    }
    
    export type ModuleRecord = Record<string, Module | string>;

    export type CommonModules = Record<
        keyof typeof exfiltratedModules | keyof typeof globalModules,
        Record<string, any>
    >
}