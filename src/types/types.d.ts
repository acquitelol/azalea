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

declare module '@azalea/components' {
    import type { PropsWithChildren, ReactElement } from 'react';
    import { spec } from '@core/handlers/theming';

    export type TextWithMathsProps = {
        text: string,
        element?: 'p' | 'h6' | 'h5' | 'h4' | 'h3' | 'h2' | 'h1'
    } & React.AllHTMLAttributes<HTMLDivElement>;

    export type RowProps = {
        label: string | ReactElement;
        sublabel?: string | ReactElement;
        trailing?: ReactElement;
        extra?: ReactElement;
        centerTrailing?: boolean;
        backgroundColor?: typeof spec['raw'][number];
    }

    export type SettingRowProps = Pick<RowProps, 'label' | 'sublabel' | 'extra'> & {
        option: string
    }

    export type SectionTitleProps = PropsWithChildren;
    export type SectionBodyProps = PropsWithChildren<{ style?: React.CSSProperties }>;
    export type SectionProps = PropsWithChildren<{
        title?: string;
        collapsable?: boolean;
    }> & React.AllHTMLAttributes<HTMLDivElement>;
}

declare module '@azalea/themes' {
    import { RowProps } from '@azalea/components';

    export type ThemesProps = {
        label: Element;
    }

    export type ColorInputProps = {
        label: Element;
        color: string;
        colorType: string;
        colorKey: string;
        backgroundColor: RowProps['backgroundColor'];
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

declare module '@azalea/buttons' {
    import { ReactNode } from 'react';

    export type BaseButtonProps = AnyProps<{
        text: string;
        trailing?: ReactNode | null;
        className?: string,
        onClick: Fn
    }>
}

declare module '@azalea/utilities' {
    export type Path = string | number;

    export type Navigator = {
        createHref: Fn;
        encodeLocation: Fn;
        go(path: Path, arg2?, arg3?): Promise<void>;
        push(path: Path, arg2?, arg3?): Promise<void>;
        replace(path: Path, arg2?, arg3?): Promise<void>;
    }

    export type Route = {
        path: string;
        element: any;
        children?: Route[];
        id: string;
        hasErrorBoundary: boolean;
    }

    export type Navigation = {
        basename: string;
        navigator: Navigator;
        router: Omit<Navigator, 'go' | 'push' | 'replace'> & {
            basename: string;
            deleteBlocker: Fn;
            deleteFetcher: Fn;
            dispose(): void;
            enableScrollRestoration: Fn;
            fetch: Fn;
            getBlocker: Fn;
            getFetcher: Fn;
            initialize(): void;
            navigate(path: Path, arg2?): Promise<void>;
            revalidate(): void;
            routes: Route[],
            state: Record<string, any>;
            subscribe: Fn;
            _internalActiveDeferreds: Map<any, any>;
            _internalFetchControllers: Map<any, any>;
            _internalSetRoutes(routes: Route[]): void;
        }
    };
}

declare type Fn = (...args: any) => any;
declare type Arguments<T extends Fn> = T extends (...args: infer P) => any ? P : any[];
declare type AnyProps<T extends Record<string, any> = Record<string, any>> = T & Record<PropertyKey, any>;