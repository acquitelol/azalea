import { common } from '@core/modules';
import { createStyleSheet } from '@core/stylesheet';

const { React } = common;
const { merge } = createStyleSheet({
    common: {
        margin: 0,
        color: 'var(--palette-blue-gradient-start)'
    }
});

export function Small() {
    return <hr
        style={merge(x => [
            x.common, 
            { 
                borderStyle: 'dashed' 
            }
        ])}
    />;
}

export function Large() {
    return <hr
        style={merge(x => [
            x.common,
            {
                borderStyle: 'dotted',
                borderWidth: 3
            }
        ])}
    />;
}

export default { Small, Large };