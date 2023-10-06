import handlers from '@handlers';
import components from '@core/components';
import { common } from '@core/modules';
import { createStyleSheet, commonStyles } from '@core/stylesheet';

const { React } = common;
const { storages: { bookwork } } = handlers;
const { Section, SectionBody, Row, Dividers } = components;
const { styles } = createStyleSheet({
    fallback: {
        marginInline: '2em',
        paddingBlock: '1em',
        background: 'var(--raw-lightest)',
    }
})

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
            {value.filter(store => store.answers.length > 0).map((store, i, array) => {
                const plural = store.answers.length > 1 ? 's' : '';
                const answers = store.answers.map(answer => isNaN(+answer) ? answer : `$${answer}$`).join(', ');

                return <>
                    <Row 
                        label={'Question:'}
                        sublabel={store.id}
                    />
                    <Dividers.Small />
                    <Row 
                        label={`Answer${plural}:`}
                        sublabel={answers}
                    />
                    {i !== array.length - 1 && <Dividers.Large />}
                </>
            })}
        </Section>
    }) : <SectionBody style={styles.fallback}>
        <h2 style={commonStyles.merge(x => [x.flex, x.justify, x.align, x.textCenter])}>
            No bookwork codes found :(
        </h2>
    </SectionBody>
}