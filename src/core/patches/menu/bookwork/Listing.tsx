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
    const numberA = Number(a.slice(0, -1));
    const numberB = Number(b.slice(0, -1));
    const letterA = a.slice(-1);
    const letterB = b.slice(-1);

    if (numberA !== numberB) {
        return numberA - numberB;
    }
    
    return letterA.localeCompare(letterB);
}

export default ({ query, force }: { query: string, force: any }) => {
    const entries = React.useMemo(
        () => Object.entries(bookwork.list()).filter(([k]) => k.toLowerCase().includes(query.toLowerCase())), 
        [query, force]
    )

    return entries.length > 0 ? entries.sort(sortCodes).map(([key, value]: [string, any[]]) => {
        return value.length > 0 && <Section title={key}>
            {value
                .filter(store => store.answers.length > 0)
                .sort((a, b) => b.date - a.date)
                .map((store, i, array) => {
                    // Add 's' to the word 'Answer' if the amount of answers is more than 1
                    // You will never have 0 or -1 answers due to the filter above
                    // Therefore 'len > 1' is valid for this use case
                    const plural = store.answers.length > 1 ? 's' : '';

                    // Convert plain numbers to latex formatting and add spacing between answers with the join seperator
                    const answers = store.answers.map(answer => isNaN(+answer) ? answer : `$${answer}$`).join('$,\\;\\;$');

                    return <>
                        <Row 
                            label={'Question:'}
                            sublabel={store.id}
                            trailing={<div 
                                style={{ 
                                    marginTop: '0.5em', 
                                    marginRight: '0.5em',
                                    marginLeft: '1em'
                                }}
                            >
                                <h6 style={{ color: 'var(--raw-dark)'}}>Date stored:</h6>
                                <h4 style={{ fontWeight: 'normal' }}>
                                    {new Date(store.date).toLocaleString()}
                                </h4>
                            </div>}
                            centerTrailing={false}
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