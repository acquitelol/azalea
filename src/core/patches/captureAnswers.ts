import logger from '@logger';
import utilities from '@utilities';
import { storages } from '@core/handlers/state';

const { findReact, findInTree, findInReactTree, isEmpty } = utilities;
const { bookwork } = storages;

function processAnswers(input: Record<string, Record<string, any>>) {
    const answers: string[] = [];

    if (!isEmpty(input.number_fields)) {
        Object.values(input.number_fields).forEach(field =>
            field.value && answers.push(field.value));
    }

    if (!isEmpty(input.cards)) {
        Object.values(input.cards).forEach(card =>
            card.slot_ref && answers.push(card.content[0].text));
    }

    if (!isEmpty(input.choices)) {
        Object.values(input.choices).forEach(choice => {
            if (!choice.selected) return;

            if (choice.content[0].element === 'image')
                return answers.push(`${window.__sparxweb.urls.contentAssets}/${choice.content[0].src}`);

            return answers.push(choice.content[0].text);
        });
    }

    return answers;
}

function handler() {
    const possibleQuestionWrapper: HTMLDivElement = document.querySelector('[class*="_QuestionWrapper_"]');
    const possibleQuestionInfo = document.querySelector('[class*="_QuestionInfo_"]');

    if (!possibleQuestionWrapper || !possibleQuestionInfo) {
        logger.debug(
            'Wrappers failed to query! You\'re likely not in a question.',
            {
                question: possibleQuestionWrapper,
                info: possibleQuestionInfo
            }
        );
        return;
    }

    const QuestionWrapper = findReact(possibleQuestionWrapper);
    const QuestionInfo = findReact(possibleQuestionInfo);

    const endpoint = findInReactTree(QuestionWrapper.memoizedProps.children, x => x.layout && x.input);
    const questionText = findInTree(endpoint.layout, x => x.type.includes('question-text'), { walkable: ['content'] });

    const id = findInTree(questionText, x => x.element === 'text', { walkable: ['content'] })?.text;
    const code = QuestionInfo.memoizedProps.bookworkCode;
    const answers = processAnswers(endpoint.input);

    if (!id || !code || !answers || answers.length < 1) {
        logger.debug('Answers failed to parse or no answers selected:', { id, code, answers });
        return;
    }

    // Remove all question-dependent latex formatting and remove consecutive spaces
    const sanitise = (id: string) => id.replace(/\$.*?\$/g, '').replace(/ +/g, ' ');

    bookwork.set(code, [
        ...bookwork.get(code)?.filter(x => sanitise(x.id) !== sanitise(id)) ?? [],
        { id, answers, date: Date.now() }
    ]);
}

export default async function () {
    document.addEventListener('pointerdown', handler, { capture: true });
    document.addEventListener('keydown', handler, { capture: true });

    return () => {
        document.removeEventListener('pointerdown', handler, { capture: true });
        document.removeEventListener('keydown', handler, { capture: true });
    };
}