declare global {
    var nativeLoggingHook: (message: string, level: number) => void;
    var azalea: typeof import("../core").default;
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