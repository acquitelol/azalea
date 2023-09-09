declare global {
    var nativeLoggingHook: (message: string, level: number) => void;
    var azalea: typeof import('../core').default;
    var mutatePageOptions: Fn;
    var paths: {
        children: Array<{
            path: string;
            id: string;
            element: any;
            children: any;
            hasErrorBoundary: boolean
        }>,
        element: any;
        hasErrorBoundary: boolean;
        id: string;
    }
    var __sparxweb: {
        GAProperty: string;
        csrfCookieName: string;
        environment: string;
        featureFlags: Record<string, any>;
        schoolID: string;
        schoolName: string;
        serveRoot: string;
        setFeatureFlag: (key: string, value: any) => any
        teacherPortalPath: string
        urls: {
            api: string;
            contentAssets: string;
            interactionGateway: string;
            staticAssets: string;
        }
    }
}

export { };