(async function() {
    'use strict';

    await importPatcher();
    const labels = await getRecursively(() => document.getElementsByClassName("status-bar-label-text"));
    labels[1].textContent = "Rosie :3";

    const AppContainer = document.getElementById("app-container");
    const ReactRoot = AppContainer._reactRootContainer._internalRoot;
    const ReactPendingProps = ReactRoot.current.child.pendingProps;
    const Contexts = ReactPendingProps.children.props.children.props.children[0];
    const SparxWebContainer = Contexts.props.children.props.children[1].type
    const SparxWeb = SparxWebContainer.WrappedComponent.prototype;

    let dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");

    patcher.after("render", SparxWeb, function(_, res) {
        document.__props = this.props;
        dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");
    });

    patcher.after("render", findReact(document.getElementsByClassName('wac-overlay')[0]).__proto__, function(_, res) {
        if (!this.props.options) return;
        for (const option of this.props.options) {
            for (const item of option.get("studentAnswer")) {
                if (localStorageHandler.get(this.props.bookworkCode)[0] === item[1]) {
                    this.props.onSubmitAnswer('', null, option, false);
                    return;
                }
                
                alert("Couldn't find this answer in storage! Pray that you can guess it correctly C:");
            }
        }
    })

    const storeAnswers = () => {
        const bookwork = document.querySelector(".bookwork-code")
            .textContent
            .replace("Bookwork code: ", "");
        const answers = extractAnswers();

        console.log({ bookwork, answers });
        localStorageHandler.set(bookwork, answers);
    }

    dynamicSubmitButton?.addEventListener("click", storeAnswers);

    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter" && dynamicSubmitButton) {
            storeAnswers();
        }
    })
})();