import { common } from '@core/modules';
import { Section } from '@core/components/section';
import { AnswerSectionProps } from '@azalea/bookwork';
import Answer from './Answer';

const { React } = common;

export default function AnswerSection({ code, value, forceRender }: AnswerSectionProps) {
    return <Section title={code} key={code}>
        {value
            .filter(store => Array.isArray(store.answers) && store.answers.length > 0)
            .sort((a, b) => b.date - a.date)
            .map((store, index, array) => {
                // Add 's' to the word 'Answer' if the amount of answers is more than 1
                // You will never have 0 or -1 answers due to the filter above
                // Therefore 'len > 1' is valid for this use case
                const plural = store.answers.length > 1 ? 's' : '';

                // Convert plain numbers to latex formatting
                const answers = store.answers.map(answer => isNaN(+answer) ? answer : `$${answer}$`);
                const imageAnswers = answers.filter(answer => answer.includes('assets.sparxhomework.uk'));
                const textAnswers = answers.filter(answer => !answer.includes('assets.sparxhomework.uk'));

                return <Answer
                    key={index}
                    code={code} 
                    store={store} 
                    index={index} 
                    array={array} 
                    plural={plural} 
                    forceRender={forceRender} 
                    answers={{ imageAnswers, textAnswers }} 
                />;
            })}
    </Section>;
}