import { storages } from '@handlers/state';

class bookwork {
    static extractAnswers(inputs: NodeListOf<Element>[] = []) {
        let results: (string | number)[] = [];

        const build = (clone) => {
            if (!clone || clone.length === 0) return;

            for (let i = 0; i < clone.length; i++) {
                let text = '';

                const spans = clone[i].querySelector('span.text');

                if (spans) {
                    for (let j = 0; j < spans.childNodes.length; j++) {
                        const child = spans.childNodes[j];

                        child.className == 'katex'
                            ? text += child.querySelector('annotation')?.textContent
                            : text += child.textContent;
                    }
                }

                const image = clone[i].querySelector('[data-test-target="image-img"]');

                if (image) {
                    text += image.currentSrc.toString();
                }

                results.push(text);
            }
        }

        const layers = document.querySelectorAll('.number-input');

        if (layers.length > 0) {
            for (let i = 0; i < layers.length; i++) {
                results.push(layers[i].attributes[10].value);
            }
        }

        inputs.forEach(input => build(input));
        return results;
    };

    static storeAnswers() {
        const bookworkCode = document.querySelector('.bookwork-code')
            ?.textContent
            ?.replace('Bookwork code: ', '');

        const answers = bookwork.extractAnswers([
            document.querySelectorAll('.slots .slot'),
            document.querySelectorAll('.answer-part .gap-card.selected, .choice.selected')]);

        // We can assert that the bookwork code is always available here 
        // because this function should only be called when the user submits a question
        // If this is somehow called when the user is not in skill-delivery-view, 
        // then that case is handled in the StorageHandler so no issues should happen
        storages.bookwork.set(bookworkCode!, answers);
    }
}

export default bookwork;