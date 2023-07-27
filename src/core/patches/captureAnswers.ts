import patcher from "@core/patcher";
import bookwork from "@core/bookwork";
import utilities from "@utilities";

const { storeAnswers } = bookwork;
const { findReact, lazyModule } = utilities;

export default async function() {
    const screenNode = await lazyModule(() => document.querySelector(".screen"));
    const SparxWeb = findReact(screenNode);

    // This will adapt whenever SparxWeb re-renders
    let dynamicSubmitButton: Element | null;

    // Listen for Enter keypresses and store the answer when the dynamicSubmitButton exists (is in scope)
    document.addEventListener("keypress", function(event) {
        event.key === "Enter" && dynamicSubmitButton && storeAnswers();
    })

    // Assigns `storeAnswers` on click to Submit button on every SparxWeb render
    // This then captures the answer(s) in the input whenever the button does exist
    patcher.after("render", SparxWeb, function() {
        dynamicSubmitButton = document.querySelector("#skill-delivery-submit-button");

        dynamicSubmitButton?.removeEventListener("click", storeAnswers);
        dynamicSubmitButton?.addEventListener("click", storeAnswers);
    });
}