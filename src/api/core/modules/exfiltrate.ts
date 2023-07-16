// Thank you to uwu/shelter for this exfiltrating method
// https://github.com/uwu/shelter/blob/main/packages/shelter/src/exfiltrate.ts
function exfiltrate(prop: string, filter?: ((self: any) => boolean) | null) {
    const protoKey = Symbol(prop);
    let hitProto = false;

    return new Promise((res) => {
        Object.defineProperty(Object.prototype, prop, {
            configurable: true,
            enumerable: false,

            set(v) {
                if (this === Object.prototype) {
                    hitProto = true;
                    Object.prototype[protoKey] = v;
                    return;
                }

                Object.defineProperty(this, prop, {
                    configurable: true,
                    writable: true,
                    enumerable: true,
                    value: v,
                });

                if (!filter || filter(this)) {
                    res(this);
                    if (!hitProto) delete Object.prototype[prop];
                }
            },

            get() {
                return this[protoKey];
            },
        });
    });
};

export default exfiltrate;