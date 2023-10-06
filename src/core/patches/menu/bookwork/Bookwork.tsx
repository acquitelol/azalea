import components from '@core/components';
import utilities from '@core/utilities';
import { useStorageValue } from '@core/hooks';
import { createStyleSheet, commonStyles } from '@stylesheet';
import { common } from '@core/modules';
import { storages } from '@core/handlers/state';

import Toggle from './Toggle';
import Listing from './Listing';

const { React } = common;
const { navigate } = utilities;
const { bookwork } = storages;
const { merge, styles } = createStyleSheet({
    common: {
        marginLeft: '1em'
    },

    input: {
        borderRadius: '10em', 
        height: 'auto'
    },

    message: {
        marginInline: '2em',
        background: 'var(--raw-lightest)'
    },

    navigation: {
        marginBlock: '1em'
    },

    collapsable: {
        overflow: 'hidden',
        transition: 'max-height 300ms ease, opacity 300ms ease'
    }
});

export default () => {
    const [enabled, setEnabled] = useStorageValue<boolean>('autoBookwork', 'preferences');
    const [query, setQuery] = React.useState<string>('');
    const [force, forceRender] = React.useState({});

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

        <Listing query={query} force={force} />
    </>
}