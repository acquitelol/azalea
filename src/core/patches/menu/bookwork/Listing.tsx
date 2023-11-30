import components from '@core/components';
import { common } from '@core/modules';
import { createStyleSheet, commonStyles } from '@core/stylesheet';
import { TextWithMaths } from '@core/components/katex';
import { ListingProps } from '@azalea/bookwork';

const { React } = common;
const { Section, SectionBody, Row, Dividers } = components;
const { styles } = createStyleSheet({
    fallback: {
        marginInline: '2em',
        paddingBlock: '1em',
        background: 'var(--palette-light-blue-20)',
    },

    images: {
        maxWidth: '20%', 
        gap: '1em', 
        marginBlock: '0.5em'
    }
});

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

function Listing({ query, listing }: ListingProps) {
    const entries = React.useMemo(
        () => Object.entries(listing).filter(([k]) => k.toLowerCase().includes(query.toLowerCase())), 
        [listing]
    );

    return entries.length > 0 ? entries.sort(sortCodes).map(([key, value]: [string, any[]]) => {
        return value.length > 0 && <Section title={key} key={key}>
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

                    return <React.Fragment key={index}>
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
                                <h6 style={{ color: 'var(--palette-dark-blue-90)'}}>Date stored:</h6>
                                <h4 style={{ fontWeight: 'normal' }}>
                                    {new Date(store.date).toLocaleString()}
                                </h4>
                            </div>}
                            centerTrailing={false}
                        />
                        <Dividers.Small />
                        <Row 
                            label={`Answer${plural}:`}
                            sublabel={<div>
                                {imageAnswers.length > 0 && (
                                    <div style={commonStyles.merge(x => [x.flex, x.row, styles.images])}>
                                        {imageAnswers.map((answer, idx) => <img src={answer} key={idx} />)}
                                    </div>
                                )}
                                {textAnswers.length > 0 && <TextWithMaths 
                                    text={textAnswers.join('$,\\;\\;$')}
                                    style={{ margin: 0, padding: 0 }}
                                />}
                            </div>}
                        />
                        {index !== array.length - 1 && <Dividers.Large />}
                    </React.Fragment>;
                })}
        </Section>;
    }) : <SectionBody style={styles.fallback}>
        <h2 style={commonStyles.merge(x => [x.flex, x.justify, x.align, x.textCenter])}>
            No bookwork codes found :(
        </h2>
    </SectionBody>;
}

export default Listing;