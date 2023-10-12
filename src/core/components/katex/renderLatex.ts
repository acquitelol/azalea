import katex, { KatexOptions } from 'katex';
import logger from '@logger';

import { htmlEscape } from './htmlEscape';
import { preprocessMaths, preprocessText } from './preprocess';
import { replaceLatexTagsWithHtmlTags } from './replaceLatex';
import { patterns } from './constants';

const renderMathsToString = (maths: string, options?: KatexOptions) => {
    return katex.renderToString(preprocessMaths(maths), options);
};

export const renderMixedTextToString = (text: string, suppressWarnings?: boolean) => {
    const tagStack: string[] = [];
    const parts = text.match(patterns.maths);

    if (parts?.length < 1) {
        return '';
    }

    let isMaths = false;

    for (let i = 0; i < parts.length; i++) {
        // The '$' character is used as a switch to enter latex maths mode
        // For example, "some normal text and then $3x^2+5$"
        // Where the '3x^2+5' would render in latex instead of plain text.
        // The first '$' enters maths mode and then the second '$' exits it.
        if (parts[i] === '$') {
            isMaths = !isMaths;
            parts[i] = '';

            continue;
        }

        if (isMaths) {
            try {
                parts[i] = renderMathsToString(parts[i]);
            } catch (exception) {
                parts[i] = `<code class="invalid-math">${htmlEscape(parts[i])}</code>`;

                if (!suppressWarnings) {
                    logger.warn(exception, 'Invalid Maths:', parts[i]);
                }
            }
        } else {
            parts[i] = htmlEscape(parts[i].replace('\\$', '$'));
            parts[i] = replaceLatexTagsWithHtmlTags(parts[i], tagStack);
        }
    }

    return preprocessText(parts.join(''));
};