import modules from '@core/modules';

import { TextWithMathsProps } from '@azalea/components';
import { renderMixedTextToString } from './renderLatex';

const { React } = modules.common;

export const TextWithMaths = ({ text, element = 'p', ...props }: TextWithMathsProps) => (
    React.createElement(element, {
        dangerouslySetInnerHTML: { __html: renderMixedTextToString(text, false) },
        ...props
    })
);
