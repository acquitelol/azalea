import utilities from '@utilities';
import { storages } from '@core/handlers/state';

const { findReact, findInReactTree, lazyDefine, isEmpty } = utilities;
const { bookwork } = storages;

function processAnswers(input: Record<string, Record<string, any>>) {
    const answers = [];

    if (!isEmpty(input.number_fields)) {
        Object.values(input.number_fields).forEach(field =>
            field.value && answers.push(field.value));
    }

    if (!isEmpty(input.cards)) {
        Object.values(input.cards).forEach(card =>
            card.slot_ref && answers.push(card.content[0].text))
    }

    if (!isEmpty(input.choices)) {
        Object.values(input.choices).forEach(choice =>
            choice.selected && answers.push(choice.content[0].text))
    }

    return answers;
}

function handler() {
    const possibleQuestionWrapper = document.querySelector('[class*="_QuestionWrapper_"]');
    const possibleQuestionInfo = document.querySelector('[class*="_QuestionInfo_"]');

    if (!possibleQuestionWrapper || !possibleQuestionInfo) {
        console.warn('Wrappers failed to query:', { possibleQuestionWrapper, possibleQuestionInfo });
        return;
    }

    const QuestionWrapper = findReact(possibleQuestionWrapper);
    const QuestionInfo = findReact(possibleQuestionInfo);

    const code = QuestionInfo.memoizedProps.bookworkCode;

    const endpoint = findInReactTree(QuestionWrapper.memoizedProps.children, x => x.layout && x.input);
    const answer = processAnswers(endpoint.input);

    if (!code || !answer) {
        console.warn('Answer failed to parse:', { code, answer });
        return;
    }

    bookwork.set(code, answer);
}

const conditions = (event) => {
    return [
        event.target.className.includes('_Content_10evl_'),
        event.target.className.includes('_TextFieldNumeric_'),
        event.key === 'Enter'
    ]
}

export default async function () {
    const page = await lazyDefine(() => document.querySelector('[id="root"]'), undefined, Infinity);

    console.log("Found page:", page);

    const storeAnswers = (event) => {
        if (conditions(event).some(c => c)) {
            handler();
        }
    }

    page.addEventListener('click', storeAnswers);
    page.addEventListener('keydown', storeAnswers);

    return () => {
        page.removeEventListener('click', storeAnswers);
        page.removeEventListener('keydown', storeAnswers);
    }
}