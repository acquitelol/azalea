import { useStorageValue } from '@core/hooks';
import { TextWithMaths } from './katex';
import { createStyleSheet, commonStyles } from '@stylesheet';
import { common } from '@core/modules';

import Dividers from './dividers';
import { SolidButton } from './buttons';

import { RowProps, SettingRowProps } from '@azalea/components';

const { React } = common;
const { merge, styles } = createStyleSheet({
    common: {
        paddingInline: '1em',
        paddingBlock: '0.25em'
    }
});

export const Row = ({ label, sublabel, trailing, extra, centerTrailing = true, backgroundColor = 'lightest' }: RowProps) => {
    return <>
        <div 
            style={commonStyles.merge(x => [
                x.flex, x.row, styles.common,
                {
                    justifyContent: 'space-between',
                    background: `var(--raw-${backgroundColor})`
                }
            ])}
        >
            <div style={{ marginBlock: '0.5em', flexGrow: 1, flexBasis: 0 }}>
                {typeof label === 'string' ? <TextWithMaths 
                    text={label}
                    element='h4'
                /> : label}
                {typeof sublabel === 'string' ? <TextWithMaths
                    text={sublabel} 
                    style={{ margin: 0, padding: 0 }}
                /> : sublabel}
            </div>
            <div style={centerTrailing ? commonStyles.merge(x => [x.flex, x.column, x.justify]) : {}}>
                {trailing}
            </div>
        </div>
        {extra && (<>
            <Dividers.Small />
            
            <div style={merge(x => [x.common, { background: `var(--raw-${backgroundColor})` }])}>
                {extra}
            </div>
        </>)}
    </>
}

export const SettingRow = ({ option, extra, ...props }: SettingRowProps) => {
    const [query, setQuery] = useStorageValue<boolean>(option, 'preferences');

    return <Row 
        trailing={<SolidButton
            text={query ? 'Disable' : 'Enable'}
            onClick={() => setQuery(previous => !previous)}
        />}
        extra={query && extra}
        {...props}
    />
}

export default Row;