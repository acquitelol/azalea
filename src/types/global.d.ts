declare global {
    var nativeLoggingHook: (message: string, level: number) => void;
    var cutest: typeof import("../api").default;
    var $I: typeof import("immutable");
}
  
export {};