import katex from 'katex';
import patcher from '@core/patcher';
import logger from '@logger';
import utilities from '@utilities';
import { storages } from '@handlers/state';
import { common } from '@core/modules';

const { findReact, findInReactTree, lazyDefine } = utilities;
const { bookwork, preferences } = storages;
const { React } = common;

const BookworkSection = ({ answers }: { answers: any[], azalea: boolean }) => {
    return <div id='azalea-wac-content' style={{ textAlign: 'center', marginInline: '6em' }}>
        <h3 style={{ 
            marginInline: '2em'
        }}>
            The three most recent answers for this code are shown below:
        </h3>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
        }}>
            {answers.sort((a, b) => b.date - a.date).slice(0, 3).map(store => <div style={{
                marginBlock: '2em',
                marginBottom: '-2em'
            }}>
                <div style={{
                    backgroundColor: 'var(--colours-selected)',
                    color: 'var(--palette-white)',
                    width: 'fit-content',
                    paddingBlock: '0.4em',
                    paddingInline: '0.6em',
                    borderRadius: '4px'
                }}>
                    <h6 style={{ 
                        fontWeight: 'bold', 
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        ({new Date(store.date).toLocaleString()})
                    </h6>
                    <h3 
                        style={{
                            display: 'inline-block',
                            fontFamily: 'math'
                        }}
                        dangerouslySetInnerHTML={{ 
                            __html: katex.renderToString(
                                store.answers?.map(answer => answer.replace(/^\$|\$$/g, '')).join(', '), 
                                false
                            )
                        }}               
                    />
                </div>
            </div>)}
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
        const answers = bookwork.get(code) ?? [];
    
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
                if (!store.answers || store.answers.length < 1) return;

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