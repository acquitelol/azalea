declare global {
    var nativeLoggingHook: (message: string, level: number) => void;
    var azalea: typeof import("../core").default;
    var $I: typeof import("immutable");
}
  
export {};