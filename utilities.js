const wait = (t) => new Promise(r => setTimeout(r, t));
const getRecursively = (cb, time = 100) => {
    return new Promise(r => {
        const result = cb();

        if (result.length > 0) {
            r(result)
        }

        wait(time).then(() => r(getRecursively(cb)))
    })
} 

class LocalStorageHandler {
    constructor(name) {
        this.name = typeof name === "string" ? name : "CutestBypassStorage";
        this.init()
    }

    init() {
        if (localStorage.getItem(this.name)) return;
        localStorage.setItem(this.name, JSON.stringify({}));
    }

    set(key, value) {
        this.init();

        const items = JSON.parse(localStorage.getItem(this.name)) ?? {}
        localStorage.setItem(this.name, JSON.stringify({ ...items, [key]: value }));
    }

    delete(key) {
        this.init();

        const { [key]: _, ...rest } = JSON.parse(localStorage.getItem(this.name)) ?? {};
        localStorage.setItem(this.name, JSON.stringify({ ...rest }))
    }

    get(key) {
        this.init();

        const items = JSON.parse(localStorage.getItem(this.name));
        return items[key] ?? [];
    }
}

const importPatcher = async () => window.patcher = await import("https://esm.sh/spitroast");
const localStorageHandler = new LocalStorageHandler();

const findReact = (element, traverseUp = 0) => {
    const key = Object.keys(element).find(key => {
        return key.startsWith("__reactFiber$")
        || key.startsWith("__reactInternalInstance$");
    });

    const elementFiber = element[key]
    if (!elementFiber) return null;

    if (elementFiber._currentElement) {
        let computedFiber = elementFiber._currentElement._owner;

        for (let i = 0; i < traverseUp; i++) {
            computedFiber = computedFiber._currentElement._owner;
        }

        return computedFiber._instance;
    }

    const getComputedFiber = fiber => {
        let parentFiber = fiber.return;

        while (typeof parentFiber.type == "string") {
            parentFiber = parentFiber.return;
        }

        return parentFiber;
    };

    let computedFiber = getComputedFiber(elementFiber);

    for (let i = 0; i < traverseUp; i++) {
        computedFiber = getComputedFiber(computedFiber);
    }

    return computedFiber.stateNode;
};

const findInTree = (tree = {}, filter = _ => _, { ignore = [], walkable = [], maxProperties = 100 } = {}) => {
    let stack = [tree];
    const wrapFilter = function (...args) {
        try {
            return Reflect.apply(filter, this, args);
        } catch {
            return false;
        }
    };

    while (stack.length && maxProperties) {
        const node = stack.shift();
        if (wrapFilter(node)) return node;

        if (Array.isArray(node)) {
            stack.push(...node);
        } else if (typeof node === 'object' && node !== null) {
            if (walkable.length) {
                for (const key in node) {
                    const value = node[key];
                    if (~walkable.indexOf(key) && !~ignore.indexOf(key)) {
                        stack.push(value);
                    }
                }
            } else {
                for (const key in node) {
                    const value = node[key];
                    if (node && ~ignore.indexOf(key)) continue;

                    stack.push(value);
                }
            }
        }
        maxProperties--;
    }
};

const findInReactTree = (tree, filter = _ => _, options = {}) => {
    return findInTree(tree, filter, { walkable: ['props', 'children'], ...options })
}

const extractAnswers = () => {
    let results = [];

    const build = (clone) => {
        if (!clone || clone.length === 0) return;

        for (let i = 0; i < clone.length; i++) {
            let text = "";
            const popup = clone[i].querySelector("span.text");

            if (popup) {
                for (let i = 0; i < popup.childNodes.length; i++) {
                    popup.childNodes[i].className == "katex"
                        ? text += popup.childNodes[i].querySelector("annotation")?.textContent
                    : text += popup.childNodes[i].textContent;
                }
            }

            const current = clone[i].querySelector('[data-test-target="image-img"]');

            if (current) {
                text += current.currentSrc.toString();
            }

            results.push(text);
        }
    }

    const layers = document.querySelectorAll(".number-input");

    if (layers.length > 0) {
        for (let i = 0; i < layers.length; i++) {
            results.push(layers[i].attributes[10].value);
        }
    }

    const slots = document.querySelectorAll(".slots .slot");
    build(slots);;

    const answer = document.querySelectorAll(".answer-part .gap-card.selected, .choice.selected");
    return (build(answer), results);
}