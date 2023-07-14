/**
 * UTILITIES
 */

// Name used in several places
const cuteName = "Rosie :3";

// Waits an amount of time in MS
const wait = (t) => new Promise(r => setTimeout(r, t));

// Continuously tries to get a value from a callback and tries again every specific interval until successful
const getRecursively = (cb, time = 100) => {
    return new Promise(r => {
        const result = cb();

        if (result.length > 0) {
            r(result)
        }

        wait(time).then(() => r(getRecursively(cb)))
    })
} 

// Easier LocalStorage handling + keeps all data to one stringified Object
class LocalStorageHandler {
    constructor(name, shouldLog = true) {
        this.name = name;
        this.shouldLog = shouldLog;

        this.init();
    }

    init() {
        if (localStorage.getItem(this.name)) return;
        localStorage.setItem(this.name, JSON.stringify({}));
    }

    set(key, value) {
        this.init();
        this.shouldLog && console.log("SET", { key, value });

        const items = JSON.parse(localStorage.getItem(this.name)) ?? {}
        localStorage.setItem(this.name, JSON.stringify({ ...items, [key]: value }));
    }

    delete(key) {
        this.init();
        this.shouldLog && console.log("DELETE", { key });

        const { [key]: _, ...rest } = JSON.parse(localStorage.getItem(this.name)) ?? {};
        localStorage.setItem(this.name, JSON.stringify({ ...rest }));
    }

    get(key) {
        this.init();
        this.shouldLog && console.log("GET", { key });

        const items = JSON.parse(localStorage.getItem(this.name));
        return items[key] ?? null;
    }

    list() {
        this.init();
        this.shouldLog && console.log("LIST", { _: null });

        return JSON.parse(localStorage.getItem(this.name)) ?? {};
    }
}

// Used to store all bookworkCodes and their answers to be used later
const bookworkHandler = new LocalStorageHandler("CutestBypassStorage");

// Used to store any preferences such as using Rosie :3 as the name or not
const preferenceStorage = new LocalStorageHandler("CutestBypassPreferences");

/**
 * Finds a React component (if any) by its HTMLNode through React fibers.
 * @param {HTMLNode} element
 * @param {number} traverseUp
 * @returns ReactElement | null
 */
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

/**
 * Traverses a tree and attempts to find a result based on a given predicate
 * @param {object} tree Tree to traverse
 * @param {function} filter Predicate to determine result
 * @param {object} options Options to refine result
 * @returns any | null
 */
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

/**
 * Uses specific walkable properties with findInTree as a preset to traverse React trees
 * @param {object} tree Tree to traverse
 * @param {function} filter Predicate to determine result
 * @param {object} options Options to refine result
 * @returns any | null
 */
const findInReactTree = (tree, filter = _ => _, options = {}) => {
    return findInTree(tree, filter, { walkable: ['props', 'children'], ...options })
}

/**
 * Extracts all answers (numbers, text, images) from the input area in skill-delivery
 * @param {HTMLNode} inputs The inputs to search
 * @returns [] | (string | number)[]
 */
const extractAnswers = (inputs = []) => {
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

    inputs.forEach(input => build(input));
    return results;
}

// Stores all possible answers into the bookworkHandler
const storeAnswers = () => {
    const bookwork = document.querySelector(".bookwork-code")
        .textContent
        .replace("Bookwork code: ", "");
    const answers = extractAnswers([
        document.querySelectorAll(".slots .slot"), 
        document.querySelectorAll(".answer-part .gap-card.selected, .choice.selected")]);

    bookworkHandler.set(bookwork, answers);
}