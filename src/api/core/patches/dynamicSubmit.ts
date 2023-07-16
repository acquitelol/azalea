import patcher from "../patcher";
import bookwork from "../bookwork";
import utilities from "../utilities";

const { storeAnswers } = bookwork;
const { findReact, lazyModule } = utilities;

export default async function() {
    const screenNode = await lazyModule(
        () => document.getElementsByClassName('screen'),
        r => r.length > 0
    );
    const SparxWeb = findReact(screenNode[0]);

    // This will adapt whenever SparxWeb re-renders
    let dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");

    // Listen for Enter keypresses and store the answer when the dynamicSubmitButton exists (is in scope)
    document.addEventListener("keypress", function(event) {
        event.key === "Enter" && dynamicSubmitButton && storeAnswers();
    })

    // Assigns submit button and props to document for easier access
    patcher.after("render", SparxWeb, function() {
        document["__props"] = this.props;
        dynamicSubmitButton = document.getElementById("skill-delivery-submit-button");

        dynamicSubmitButton?.removeEventListener("click", storeAnswers);
        dynamicSubmitButton?.addEventListener("click", storeAnswers);
    });
}