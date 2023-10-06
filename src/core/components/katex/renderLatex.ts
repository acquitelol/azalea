import katex, { KatexOptions } from 'katex';
import logger from '@logger';

import { htmlEscape } from './htmlEscape';
import { preprocessMaths, preprocessText } from './preprocess';
import { replaceLatexTagsWithHtmlTags } from './replaceLatex';

const renderMathsToString = (maths: string, options?: KatexOptions) => {
    return katex.renderToString(preprocessMaths(maths), options);
};

export const renderMixedTextToString = (text: string, suppressWarnings?: boolean) => {
    const tagStack: string[] = [];
    const parts = text.match(/\$|(?:\\.|[^$])+/g);

    if (parts?.length < 1) {
        return '';
    }

    let isMaths = false;

    for (let i = 0; i < parts.length; i++) {
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