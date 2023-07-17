import patcher from "../patcher";
import utilities from "../utilities";
import { storages } from "../handlers/default";

const { findReact, findInReactTree, lazyModule } = utilities;
const { bookwork: answerStore, preferences } = storages;

export default async function() {
    const wacOverlayNode = await lazyModule(() => document.querySelector('.wac-overlay'));
    const WACOverlay = findReact(wacOverlayNode);

    patcher.after("render", WACOverlay.__proto__, function(_, res) {
        if (!this.props.options) return;

        const answerRegexp = /[0-9]/g;
        const answers = answerStore.get(this.props.bookworkCode);

        for (const option of this.props.options) {
            const optionMatches = option.get("answerMarkup")?.match(answerRegexp);
            const answerMatches = answers?.join("")?.match(answerRegexp);

            // If it thinks it has the correct answer, then submit that answer
            // This only works for Number-based answers, so images and text won't be submitted automatically
            if (optionMatches?.join("")?.includes(answerMatches?.join("")) && preferences.get("autoBookwork")) {
                this.props.onSubmitAnswer('', null, option, false);
                return res;
            }

            console.warn(`Couldn't find answer! Results follow;`, { optionMatches, answerMatches });
        }

        const container = findInReactTree(res, r => r.props.children[1].props.className?.includes("bookwork-code"));
        if (!container) return;

        // Repurpose the components they used
        container.props.children[0].props.children = `The answer for "${this.props.bookworkCode}" wasn't submitted automatically and is written below.`;
        container.props.children[1].props.children = `Answer: ${answers.join("")} (${this.props.bookworkCode})`;

        return res;
    })
}