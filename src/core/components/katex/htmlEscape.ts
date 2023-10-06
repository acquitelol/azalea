import { patterns } from './constants';

export const htmlEscape = (input: any) => {
    if (!input) {
        return '';
    }

    input = String(input);

    if (patterns.hazardousCharacters.test(input)) {
        return input
            .replace(patterns.ampersand, '&amp;')
            .replace(patterns.leftAngledBracket, '&lt;')
            .replace(patterns.apostrophe, '&apos;')
            .replace(patterns.quotation, '&quot;');
    } else {
        return input;
    }
}