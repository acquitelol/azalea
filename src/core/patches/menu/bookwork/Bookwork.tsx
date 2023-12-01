import components from '@core/components';
import utilities from '@core/utilities';
import { useStorageValue } from '@core/hooks';
import { createStyleSheet, commonStyles } from '@stylesheet';
import { common } from '@core/modules';
import { storages } from '@core/handlers/state';
import { validateData, validateItem, validateAnswers } from '@core/handlers/bookwork';

import Toggle from './Toggle';
import Listing from './Listing';
import logger from '@core/logger';
import { merge, styles } from './bookwork.styles';

const { React } = common;
const { navigate } = utilities;
const { bookwork } = storages;


function Bookwork() {
    const [enabled, setEnabled] = useStorageValue<boolean>('autoBookwork', 'preferences');
    const [query, setQuery] = React.useState<string>('');
    const [force, forceRender] = React.useState({});
    const listing = React.useMemo(() => bookwork.list(), [force]);

    return <>
        <div style={commonStyles.merge(x => [x.flex, x.justify, x.row, styles.navigation])}>
            <div style={styles.common}>
                <input
                    placeholder='Search for code...'
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    maxLength={2}
                    className='_Search_juc87_90'
                    style={styles.input}
                />
            </div>

            <div style={commonStyles.merge(x => [x.flex, styles.common])}>
                <Toggle
                    enabled={enabled}
                    setEnabled={setEnabled}
                />
            </div>

            <div style={commonStyles.merge(x => [styles.common, x.column, x.justify, x.flex])}>
                <components.SolidButton 
                    text={'Clear'}
                    onClick={() => {
                        bookwork.clear();
                        forceRender({});
                    }}
                />
            </div>

            <div style={commonStyles.merge(x => [styles.common, x.column, x.justify, x.flex])}>
                <components.SolidButton 
                    text={'Back'}
                    onClick={() => navigate(-1, null)}
                />
            </div>
        </div>

        <components.Dividers.Small />

        <div style={commonStyles.merge(x => [x.flex, x.row])}>
            <div style={commonStyles.merge(x => [x.flex, x.row, styles.navigation, styles.actions])}>
                <components.SolidButton 
                    text={'Export'}
                    onClick={() => {
                        logger.log('Exporting bookwork codes...');
                        const blob = new Blob([JSON.stringify({ azalea: true, listing })], { type: 'application/json' });
                        const link = document.createElement('a');

                        link.href = URL.createObjectURL(blob);
                        link.download = `azalea.export-${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;

                        link.click();
                    }}
                />
                <components.SolidButton 
                    text={'Import'}
                    onClick={() => {
                        logger.log('Importing bookwork codes...');
                        const input = document.createElement('input');

                        input.type = 'file';
                        input.addEventListener('change', handleFileSelection);

                        function handleFileSelection(event) {
                            const file = event.target.files[0];
                            const reader = new FileReader();

                            reader.onload = (e) => {
                                const contents = e.target.result as string;

                                try {
                                    logger.info('Parsing data...');
                                    const maybeData: unknown = JSON.parse(contents);
                                    const { valid, data } = validateData(maybeData);
                                    
                                    if (!valid) {
                                        throw new Error('Data is invalid.');
                                    };

                                    for (const [key, value] of Object.entries(data.listing)) {
                                        if (!(/^[1-9][A-Z]$/.test(key))) {
                                            console.error('Code', key, 'is invalid.');
                                            continue;
                                        }

                                        if (!Array.isArray(value)) {
                                            console.error('Value', value, 'is invalid.');
                                            continue;
                                        }

                                        value.forEach(maybeItem => {
                                            const codeInfo: any[] = bookwork.get(key) ?? [];
                                            const { valid: itemIsValid, item } = validateItem(maybeItem);

                                            if (!itemIsValid) {
                                                console.error('Item', maybeItem, 'is invalid.');
                                                return;
                                            }

                                            const { valid: answersAreValid } = validateAnswers(item.answers);

                                            if (!answersAreValid) {
                                                console.error('Answers', item.answers, 'are invalid.');
                                                return;
                                            }

                                            bookwork.set(key, [
                                                ...codeInfo.filter(existingItem => existingItem.id !== item.id),
                                                item
                                            ]);
                                        });
                                    }

                                    logger.info('Updating with new data...');
                                    forceRender({});

                                    logger.info('Cleaning up...');
                                    input.removeEventListener('change', handleFileSelection);
                                    input.remove();

                                    logger.info('Done!');
                                } catch(e) {
                                    console.info('Failed to import bookwork codes:', e);
                                }
                            };

                            reader.readAsText(file);
                        }

                        input.click();
                    }}
                />
            </div>
            <div style={commonStyles.merge(x => [x.flex, x.row, styles.navigation, styles.answers])}>
                <p style={styles.paragraph}>Total questions stored:</p>
                <strong>
                    {Object.values(listing)
                        .reduce((pre: any[], cur: any[]) => [...pre, ...cur], [])
                        .filter(item => item.answers.length > 0).length}
                </strong>
            </div>
        </div>

        <div 
            style={merge(x => [
                x.collapsable, 
                {
                    maxHeight: enabled ? '0' : '100%',
                    opacity: enabled ? '0' : '1',
                }
            ])}
        >
            <components.SectionBody style={commonStyles.merge(x => [x.textCenter, styles.message])}>
                <p>
                    With Auto-bookwork disabled, <strong>Answers will no longer be selected automatically</strong> if the answer provided matches a bookwork-check option.
                </p>
                <components.Dividers.Small />
                <p>
                    They will still be <strong>saved</strong> and <strong>displayed in bookwork checks</strong> for you to choose manually.
                </p>
            </components.SectionBody>
        </div>

        <Listing query={query} listing={listing} forceRender={forceRender} />
    </>;
}

export default Bookwork;