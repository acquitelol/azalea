import patcher from '@core/patcher';
import logger from '@logger';
import utilities from '@utilities';
import { storages } from '@handlers/state';
import { common } from '@core/modules';
import { TextWithMaths } from '@core/components/katex';
import { createStyleSheet, commonStyles } from '@core/stylesheet';

const { findReact, findInReactTree, lazyDefine } = utilities;
const { bookwork, preferences } = storages;
const { React } = common;
const { styles } =createStyleSheet({
    item: {
        backgroundColor: 'var(--colours-selected)',
        color: 'var(--palette-white)',
        width: 'fit-content',
        paddingBlock: '0.4em',
        paddingInline: '0.6em',
        borderRadius: '4px'
    }
})

const BookworkSection = ({ answers }: { answers: any[], azalea: boolean }) => {
    return <div id='azalea-wac-content' style={commonStyles.merge(x => [x.textCenter, { marginInline: '6em' }])}>
        <h3 style={{ marginInline: '2em' }}>
            The three most recent answers for this code are shown below:
        </h3>
        <div style={commonStyles.merge(x => [x.flex, x.row, { justifyContent: 'space-around' }])}>
            {answers
                .filter(store => store.answers?.length > 0)
                .sort((a, b) => b.date - a.date)
                .slice(0, 3)
                .map(store => (
                    <div style={{ marginBlock: '2em' }}>
                        <div style={styles.item}>
                            <h6 style={commonStyles.merge(x => [x.flex, x.justify, { fontWeight: 'bold' }])}>
                                ({new Date(store.date).toLocaleString()})
                            </h6>
                            <TextWithMaths 
                                text={store.answers.map(answer => isNaN(+answer) ? answer : `$${answer}$`).join(', ')}
                                element={'h4'}
                            />
                        </div>
                    </div>
                ))}
        </div>
    </div>
}

function handler() {
    const wacContainer = document.querySelector('[class*="_WACContainer_"]')

    if (!wacContainer) return;

    const WAC = findReact(wacContainer);

    if (!WAC) return logger.warn('Failed to find React Fiber of WAC:', WAC);

    patcher.after('render', WAC.type, (_, { props: { children }}) => {
        const topSection: any[] = findInReactTree(children, x => x?.find(y => y.props.className.includes('Bookwork')));
        const bookworkSection = topSection?.find(x => x.props?.className?.includes('Bookwork'))?.props?.children;
        const firstOption = findInReactTree(children, x => x.props.choices && x.props.option);
        
        if (!bookworkSection) return;

        const code = bookworkSection[1];
        const baseAnswers = bookwork.get(code) ?? [];
        const answers = Array.isArray(baseAnswers) ? baseAnswers.filter(x => Array.isArray(x.answers)) : [];
    
        if (!topSection.find(x => x.props.azalea)) {
            topSection.push(<BookworkSection answers={answers} azalea />)
        }

        if (!preferences.get('autoBookwork')) return logger.info('Autobookwork is disabled.');

        firstOption?.props?.choices.forEach(({ element: { props }, onSelect }) => {
            // Get rid of <step></step> markup and $5$ katex formatting
            const wacAnswers = props.markup
                .replace(/<[^>]+>/g, '')
                .replace(/^\$|\$$/g, '');

            answers.forEach(store => {
                if (store.answers?.join('').replace(/^\$|\$$/g, '') === wacAnswers) {
                    onSelect();
                }
            });
        })
    })
}

export default async function () {
    const page = await lazyDefine(() => document.querySelector('[id="root"]'), undefined, Infinity);

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') handler();
        });
    });

    observer.observe(page, { childList: true, subtree: true });
    return () => observer.disconnect();
}