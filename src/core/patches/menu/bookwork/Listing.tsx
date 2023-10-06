import handlers from '@handlers';
import components from '@core/components';
import { common } from '@core/modules';
import { commonStyles } from '@core/stylesheet';

const { React } = common;
const { storages: { bookwork } } = handlers;
const { Section, Row, Dividers } = components;

function sortCodes([a]: [string, any[]], [b]: [string, any[]]) {
    const prefixA = Number(a.slice(0, -1));
    const prefixB = Number(b.slice(0, -1));
    const letterA = a.slice(-1);
    const letterB = b.slice(-1);

    if (prefixA !== prefixB) {
        return prefixA - prefixB;
    } else {
        return letterA.localeCompare(letterB);
    }
}

export default ({ query, force }: { query: string, force: any }) => {
    const entries = React.useMemo(
        () => Object.entries(bookwork.list()).filter(([k]: [string, any[]]) => k.toLowerCase().includes(query.toLowerCase())), 
        [query, force]
    )

    return entries.length > 0 ? entries.sort(sortCodes).map(([key, value]: [string, any[]]) => {
        return <Section title={key}>
            {value.filter(store => store.answers.length > 0).map((store, i, array) => (
                <>
                    <Row 
                        label={`Question: ${store.id.replace(/\\n\s*\\n/g, '.')}`}
                        sublabel={`Answers: ${store.answers.map(answer => isNaN(+answer) ? answer : `$${answer}$`).join(', ')}`}
                    />
                    {i !== array.length - 1 && <Dividers.Large />}
                </>
            ))}
        </Section>
    }) : <h2 style={commonStyles.merge(x => [x.flex, x.justify, x.align, x.textCenter, { marginTop: '2em' }])}>
        No bookwork codes found :(
    </h2>
}