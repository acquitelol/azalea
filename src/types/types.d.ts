declare module '@azalea/types' {
    import { exfiltratedModules } from '@modules/data';

    export type MenuItem = {
        text: string;
        callback(...args: any[]): any | null;
    };

    export type RouteItem = {
        path: string;
        component(...args: any[]): any | null;
    }

    export type Module = {
        prop: string;
        filter: ((r: any) => boolean | void) | null;
    };

    export type ModuleRecord = Record<string, Module>;

    export type CommonModules = {
        MediaQuery: {
            Context: ReturnType<typeof import('react').createContext>;
            default: Fn;
            toQuery: Fn;
            useMediaQuery: Fn;
        };

        React: typeof import('react');
        ReactDOM: typeof import('react-dom');
    } & Record<
        keyof typeof exfiltratedModules,
        Record<string, any>
    >;
}

declare module '@azalea/themes' {
    export type ThemesProps = {
        label: Element;
    }

    export type ColorInputProps = {
        label: Element;
        color: string;
        colorType: string;
        colorKey: string;
    }

    export type ColorInputsProps = {
        label: Element;
        selected: any;
        setSelected: Fn;
    }

    export type SelectThemeProps = ColorInputsProps;
}

declare module '@azalea/settings' {
    export type NameInputProps = {
        type: string;
        label: string;
        placeholder: string;
    }
}

declare type Fn = (...args: any) => any;
declare type Arguments<T extends Fn> = T extends (...args: infer P) => any ? P : any[];