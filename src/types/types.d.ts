declare module "@azalea/types" {
    import { exfiltratedModules, globalModules } from "@modules/data";

    export type BaseItem = {
        text: string;
        callback(...args: any[]): any | null;
    };

    export type Module = {
        prop: string;
        filter: ((r: any) => boolean | void) | null;
    };

    export type ModuleRecord = Record<string, Module | string>;

    export type CommonModules = Record<
        keyof typeof exfiltratedModules | keyof typeof globalModules,
        Record<string, any>
    >;
}

declare type Fn = (...args: any) => any;
declare type Arguments<T extends Fn> = T extends (...args: infer P) => any ? P : any[];