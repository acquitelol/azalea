(function () {

    // we use this array multiple times
    const patchTypes = ["a", "b", "i"];
    const patchedObjects = new Map();

    // calls relevant patches and returns the final result
    function hook (funcName, funcParent, funcArgs, 
    // the value of `this` to apply
    ctxt, 
    // if true, the function is actually constructor
    isConstruct) {
        const patch = patchedObjects.get(funcParent)?.[funcName];
        // This is in the event that this function is being called after all patches are removed.
        if (!patch)
            return isConstruct
                ? Reflect.construct(funcParent[funcName], funcArgs, ctxt)
                : funcParent[funcName].apply(ctxt, funcArgs);
        // Before patches
        for (const hook of patch.b.values()) {
            const maybefuncArgs = hook.call(ctxt, funcArgs);
            if (Array.isArray(maybefuncArgs))
                funcArgs = maybefuncArgs;
        }
        // Instead patches
        let workingRetVal = [...patch.i.values()].reduce((prev, current) => (...args) => current.call(ctxt, args, prev), 
        // This calls the original function
        (...args) => isConstruct
            ? Reflect.construct(patch.o, args, ctxt)
            : patch.o.apply(ctxt, args))(...funcArgs);
        // After patches
        for (const hook of patch.a.values())
            workingRetVal = hook.call(ctxt, funcArgs, workingRetVal) ?? workingRetVal;
        return workingRetVal;
    }

    function unpatch(funcParent, funcName, hookId, type) {
        const patchedObject = patchedObjects.get(funcParent);
        const patch = patchedObject?.[funcName];
        if (!patch?.[type].has(hookId))
            return false;
        patch[type].delete(hookId);
        // If there are no more hooks for every type, remove the patch
        if (patchTypes.every((t) => patch[t].size === 0)) {
            // reflect defineproperty is like object defineproperty
            // but instead of erroring it returns if it worked or not.
            // this is more easily minifiable, hence its use. -- sink
            const success = Reflect.defineProperty(funcParent, funcName, {
                value: patch.o,
                writable: true,
                configurable: true,
            });
            if (!success)
                funcParent[funcName] = patch.o;
            delete patchedObject[funcName];
        }
        if (Object.keys(patchedObject).length == 0)
            patchedObjects.delete(funcParent);
        return true;
    }
    function unpatchAll() {
        for (const [parentObject, patchedObject] of patchedObjects.entries())
            for (const funcName in patchedObject)
                for (const hookType of patchTypes)
                    for (const hookId of patchedObject[funcName]?.[hookType].keys() ?? [])
                        unpatch(parentObject, funcName, hookId, hookType);
    }

    // curried - getPatchFunc("before")(...)
    // allows us to apply an argument while leaving the rest open much cleaner.
    // functional programming strikes again! -- sink
    // creates a hook if needed, else just adds one to the patches array
    var getPatchFunc = (patchType) => (funcName, funcParent, callback, oneTime = false) => {
        if (typeof funcParent[funcName] !== "function")
            throw new Error(`${funcName} is not a function in ${funcParent.constructor.name}`);
        if (!patchedObjects.has(funcParent))
            patchedObjects.set(funcParent, {});
        const parentInjections = patchedObjects.get(funcParent);
        if (!parentInjections[funcName]) {
            const origFunc = funcParent[funcName];
            // note to future me optimising for size: extracting new Map() to a func increases size --sink
            parentInjections[funcName] = {
                o: origFunc,
                b: new Map(),
                i: new Map(),
                a: new Map(),
            };
            const runHook = (ctxt, args, construct) => {
                const ret = hook(funcName, funcParent, args, ctxt, construct);
                if (oneTime)
                    unpatchThisPatch();
                return ret;
            };
            const replaceProxy = new Proxy(origFunc, {
                apply: (_, ctxt, args) => runHook(ctxt, args, false),
                construct: (_, args) => runHook(origFunc, args, true),
                get: (target, prop, receiver) => prop == "toString"
                    ? origFunc.toString.bind(origFunc)
                    : Reflect.get(target, prop, receiver),
            });
            // this works around breaking some async find implementation which listens for assigns via proxy
            // see comment in unpatch.ts
            const success = Reflect.defineProperty(funcParent, funcName, {
                value: replaceProxy,
                configurable: true,
                writable: true,
            });
            if (!success)
                funcParent[funcName] = replaceProxy;
        }
        const hookId = Symbol();
        const unpatchThisPatch = () => unpatch(funcParent, funcName, hookId, patchType);
        parentInjections[funcName][patchType].set(hookId, callback);
        return unpatchThisPatch;
    };

    const before = getPatchFunc("b");
    const instead = getPatchFunc("i");
    const after = getPatchFunc("a");

    var patcher = /*#__PURE__*/Object.freeze({
        __proto__: null,
        after: after,
        before: before,
        instead: instead,
        unpatchAll: unpatchAll
    });

    var __defProp$1 = Object.defineProperty;
    var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __publicField$1 = (obj, key, value) => {
      __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    class LocalStorageHandler {
      constructor(name, shouldLog = true) {
        __publicField$1(this, "name", "Storage");
        __publicField$1(this, "shouldLog", true);
        this.name = name;
        this.shouldLog = shouldLog;
        this.init();
      }
      init() {
        if (localStorage.getItem(this.name))
          return;
        localStorage.setItem(this.name, JSON.stringify({}));
      }
      set(key, value) {
        this.init();
        this.shouldLog && console.log("SET", { key, value });
        const items = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        localStorage.setItem(this.name, JSON.stringify({ ...items, [key]: value }));
      }
      delete(key) {
        this.init();
        this.shouldLog && console.log("DELETE", { key });
        const { [key]: _, ...rest } = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        localStorage.setItem(this.name, JSON.stringify({ ...rest }));
      }
      get(key) {
        this.init();
        this.shouldLog && console.log("GET", { key });
        const items = JSON.parse(localStorage.getItem(this.name) ?? "{}");
        return items[key] ?? null;
      }
      list() {
        this.init();
        this.shouldLog && console.log("LIST", { _: null });
        return JSON.parse(localStorage.getItem(this.name) ?? "{}");
      }
    }

    const storages = {
      preferences: new LocalStorageHandler("CutestBypassPreferences", false),
      bookwork: new LocalStorageHandler("CutestBypassStorage")
    };

    var __defProp = Object.defineProperty;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __publicField = (obj, key, value) => {
      __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
      return value;
    };
    let Theming$2 = class Theming {
      static get current() {
        return storages.preferences.get("themeIndex") ?? 0;
      }
      static setTheme(label, index = this.current) {
        Object.keys(this.themes[0].colors).forEach((variable) => {
          document.documentElement.style.setProperty(`--${variable}`, this.themes[index].colors[variable]);
        });
        label && (label.textContent = `${label.textContent.split("|")[0]} | ${this.themes[this.current].name}`);
      }
    };
    __publicField(Theming$2, "themes", [
      {
        name: "Pink",
        colors: {
          darkest: "#613248",
          dark: "#a6537a",
          medium: "#d979a6",
          light: "#ff94c1"
        }
      },
      {
        name: "Purple",
        colors: {
          darkest: "#61325f",
          dark: "#9753a6",
          medium: "#c179d9",
          light: "#f494ff"
        }
      }
    ]);

    const handlers = {
      Theming: Theming$2,
      LocalStorageHandler,
      ...storages
    };

    const data = [
      {
        name: "React",
        prop: "useRef",
        filter: null
      }
    ];

    function exfiltrate(prop, filter) {
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
              value: v
            });
            if (!filter || filter(this)) {
              res(this);
              if (!hitProto)
                delete Object.prototype[prop];
            }
          },
          get() {
            return this[protoKey];
          }
        });
      });
    }

    var modules = {
      exfiltrate,
      data
    };

    class bookwork {
      static extractAnswers(inputs = []) {
        let results = [];
        const build = (clone) => {
          if (!clone || clone.length === 0)
            return;
          for (let i = 0; i < clone.length; i++) {
            let text = "";
            const popup = clone[i].querySelector("span.text");
            if (popup) {
              for (let i2 = 0; i2 < popup.childNodes.length; i2++) {
                popup.childNodes[i2].className == "katex" ? text += popup.childNodes[i2].querySelector("annotation")?.textContent : text += popup.childNodes[i2].textContent;
              }
            }
            const current = clone[i].querySelector('[data-test-target="image-img"]');
            if (current) {
              text += current.currentSrc.toString();
            }
            results.push(text);
          }
        };
        const layers = document.querySelectorAll(".number-input");
        if (layers.length > 0) {
          for (let i = 0; i < layers.length; i++) {
            results.push(layers[i].attributes[10].value);
          }
        }
        inputs.forEach((input) => build(input));
        return results;
      }
      static storeAnswers() {
        const bookworkCode = document.querySelector(".bookwork-code")?.textContent?.replace("Bookwork code: ", "");
        const answers = bookwork.extractAnswers([
          document.querySelectorAll(".slots .slot"),
          document.querySelectorAll(".answer-part .gap-card.selected, .choice.selected")
        ]);
        storages.bookwork.set(bookworkCode, answers);
      }
    }

    const cuteName$3 = "Rosie :3";
    const wait = (time) => new Promise((res) => setTimeout(res, time));
    const getImage$1 = (name) => `https://raw.githubusercontent.com/acquitelol/CutestBypass/main/src/assets/${name}`;
    var common = {
      cuteName: cuteName$3,
      wait,
      getImage: getImage$1
    };

    function findInTree(tree = {}, filter = (_) => _, { ignore = [], walkable = [], maxProperties = 100 } = {}) {
      let stack = [tree];
      const wrapFilter = function(...args) {
        try {
          return Reflect.apply(filter, this, args);
        } catch {
          return false;
        }
      };
      while (stack.length && maxProperties) {
        const node = stack.shift();
        if (wrapFilter(node))
          return node;
        if (Array.isArray(node)) {
          stack.push(...node);
        } else if (typeof node === "object" && node !== null) {
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
              if (node && ~ignore.indexOf(key))
                continue;
              stack.push(value);
            }
          }
        }
        maxProperties--;
      }
    }

    function findInReactTree$1(tree, filter = (_) => _, options = {}) {
      return findInTree(tree, filter, { walkable: ["props", "children"], ...options });
    }

    const findReact$3 = (element, traverseUp = 0) => {
      const key = Object.keys(element).find((key2) => {
        return key2.startsWith("__reactFiber$") || key2.startsWith("__reactInternalInstance$");
      }) ?? "";
      const elementFiber = element[key];
      if (!elementFiber)
        return null;
      if (elementFiber._currentElement) {
        let computedFiber2 = elementFiber._currentElement._owner;
        for (let i = 0; i < traverseUp; i++) {
          computedFiber2 = computedFiber2._currentElement._owner;
        }
        return computedFiber2._instance;
      }
      const getComputedFiber = (fiber) => {
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

    async function lazyModule$4(cb, time = 100) {
      while (true) {
        if (cb().length > 0)
          return cb();
        await common.wait(time);
      }
    }

    const utilities = {
      ...common,
      findInReactTree: findInReactTree$1,
      findInTree,
      findReact: findReact$3,
      lazyModule: lazyModule$4
    };

    const { cuteName: cuteName$2, findReact: findReact$2, findInReactTree, lazyModule: lazyModule$3 } = utilities;
    const { preferences: preferences$2, bookwork: answerStore } = storages;
    async function bookworkBypass() {
      const wacOverlayNode = await lazyModule$3(() => document.getElementsByClassName("wac-overlay"));
      const WACOverlay = findReact$2(wacOverlayNode[0]);
      patcher.after("render", WACOverlay.__proto__, function(_, res) {
        this.props.wacShowing && preferences$2.get("name") ? cuteName$2 : preferences$2.get("realName").split(" ")[0];
        if (!this.props.options)
          return;
        const answerRegexp = /[0-9]/g;
        const answers = answerStore.get(this.props.bookworkCode);
        for (const option of this.props.options) {
          const optionMatches = option.get("answerMarkup")?.match(answerRegexp) ?? [0];
          const answerMatches = answers?.join("")?.match(answerRegexp) ?? [1];
          if (optionMatches.join("").includes(answerMatches.join(""))) {
            this.props.onSubmitAnswer("", null, option, false);
            return res;
          }
          console.warn(`Couldn't find answer! Results follow;`, { optionMatches, answerMatches });
        }
        const container = findInReactTree(res, (r) => r.props.children[1].props.className?.includes("bookwork-code"));
        if (!container)
          return;
        container.props.children[0].props.children = `The answer for "${this.props.bookworkCode}" wasn't submitted and is written below.`;
        container.props.children[1].props.children = ["Answer: ", answers.join("")];
        return res;
      });
    }

    const { storeAnswers } = bookwork;
    const { findReact: findReact$1, lazyModule: lazyModule$2 } = utilities;
    async function dynamicSubmit() {
      const screenNode = await lazyModule$2(() => document.getElementsByClassName("screen"));
      const SparxWeb = findReact$1(screenNode[0]);
      let dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");
      document.addEventListener("keypress", function(event) {
        event.key === "Enter" && dynamicSubmitButton && storeAnswers();
      });
      patcher.after("render", SparxWeb, function() {
        dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");
        dynamicSubmitButton?.removeEventListener("click", storeAnswers);
        dynamicSubmitButton?.addEventListener("click", storeAnswers);
      });
    }

    const { cuteName: cuteName$1, lazyModule: lazyModule$1, findReact, getImage } = utilities;
    const { Theming: Theming$1, preferences: preferences$1 } = handlers;
    async function menuButtons() {
      const labelNodes = await lazyModule$1(() => document.getElementsByClassName("status-bar-label-text"));
      const statusNode = await lazyModule$1(() => document.getElementsByClassName("status"));
      const StatusBar = findReact(statusNode[0]);
      patcher.after("render", StatusBar.__proto__, function(_, res) {
        if (!this.props.menuItems)
          return;
        function onCycleTheme() {
          preferences$1.set(
            "themeIndex",
            Theming$1.themes[Theming$1.current + 1] ? Theming$1.current + 1 : 0
          );
          Theming$1.setTheme(labelNodes[0]);
        }
        function onToggleName() {
          const setNameToString = (value) => labelNodes[1].textContent = value;
          preferences$1.set("name", !preferences$1.get("name"));
          preferences$1.get("name") ? setNameToString(cuteName$1) : setNameToString(preferences$1.get("realName"));
        }
        const newItems = [
          {
            text: "Cycle theme",
            img: getImage("menu_theme.png"),
            // Note: This can take in any image link, but the size of the icon isn't predefined
            hoverImg: getImage("menu_theme_hover.png"),
            action: onCycleTheme.name,
            keyBinding: null,
            newBadge: false
          },
          {
            text: `${preferences$1.get("name") ? "Disable" : "Enable"} name`,
            img: getImage("menu_name.png"),
            hoverImg: getImage("menu_name_hover.png"),
            action: onToggleName.name,
            keyBinding: null,
            newBadge: false
          }
        ];
        Object.assign(this.props, { onCycleTheme, onToggleName });
        newItems.forEach((newItem) => {
          for (const [idx, oldItem] of this.props.menuItems.entries()) {
            newItem.action === oldItem.get("action") && (this.props.menuItems = this.props.menuItems.delete(idx));
          }
          this.props.menuItems = this.props.menuItems.push($I.fromJS(newItem));
        });
        return res;
      });
    }

    const patches = async function() {
      return [
        await bookworkBypass(),
        await dynamicSubmit(),
        await menuButtons()
      ];
    }();

    const cutest = {
      patcher,
      modules: {
        ...modules,
        common: []
      },
      handlers,
      bookwork,
      utilities,
      patches
    };
    modules.data.forEach((module) => {
      cutest.modules.common[module.name] = null;
      modules.exfiltrate(module.prop, module.filter).then((res) => cutest.modules.common[module.name] = res);
    });

    const { cuteName, lazyModule } = utilities;
    const { Theming, preferences } = handlers;
    window.cutest = cutest;
    (async function() {
      const labelNodes = await lazyModule(() => document.getElementsByClassName("status-bar-label-text"));
      preferences.set("realName", labelNodes[1].textContent);
      preferences.get("name") && (labelNodes[1].textContent = cuteName);
      Theming.setTheme(labelNodes[0]);
    })();

})();
