(async function() {
    'use strict';
    
    const patcher = await import("https://esm.sh/spitroast");
    const labels = await getRecursively(() => document.getElementsByClassName("status-bar-label-text"));
    labels[1].textContent = "Rosie :3";

    const AppContainer = document.getElementById("app-container");
    const ReactRoot = AppContainer._reactRootContainer._internalRoot;
    const ReactPendingProps = ReactRoot.current.child.pendingProps;
    const Contexts = ReactPendingProps.children.props.children.props.children[0];
    const SparxWebContainer = Contexts.props.children.props.children[1].type
    const SparxWeb = SparxWebContainer.WrappedComponent.prototype;

    let dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");

    patcher.after("render", SparxWeb, function() {
        document.__props = this.props;
        dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");
    });

    patcher.after("render", findReact(document.getElementsByClassName('wac-overlay')[0]).__proto__, function(_, res) {
        if (!this.props.options) return;

        const answerRegexp = /[0-9a-zA-Z]/g;
        const markupRegexp = /\$([0-9a-zA-Z])\$/g;
        const answers = localStorageHandler.get(this.props.bookworkCode);

        for (const option of this.props.options) {
            const optionMatches = option.get("answerMarkup")?.match(answerRegexp) ?? [];
            const answerMatches = answers?.join("")?.match(markupRegexp) ?? [];

            if (optionMatches.join("") === answerMatches.join("")) {
                this.props.onSubmitAnswer('', null, option, false);
                return res;
            }
        }

        const container = findInReactTree(res, r => r.props.children[1].props.className?.includes("bookwork-code"));
        const wacText = document.getElementsByClassName("wac-text");

        if (!container || !wacText) return;

        wacText[0].innerHTML = `The answer for "${this.props.bookworkCode}" wasn't found and is written below.`
        container.props.children[1].props.children = ["Answer: ", answers.join("")]

        return res;
    })

    dynamicSubmitButton?.addEventListener("click", storeAnswers);

    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && dynamicSubmitButton) {
            storeAnswers();
        }
    })
})();