import { patterns } from './constants';

const replacers = {
    text: new Map([
        [patterns.nonBreakingSpace, '\xa0'],
        [patterns.backslash, '<br/>']
    ]),

    maths: new Map([
        [patterns.vector, '{$1 \\choose $2}'],
        [patterns.degrees, '^\\circ'],
        [patterns.numberComma, '$1\\!'],
        [patterns.unescapedPercent, '$1\\%'],
        [patterns.ungroupedQuestion, '$1{$2}$3'],
        [patterns.uscore, '\\rule{$1em}{0.03em}'],
        [patterns.pound, '\\pounds'],
        [patterns.euro, '€'],
        [patterns.gap, '\\text{\\textunderscore}']
    ])
} satisfies Record<string, Map<RegExp, string>>

export const preprocessText = (text: string) => {
    if (!text) {
        return '';
    }

    for (const [pattern, replacer] of replacers.text) {
        text = text.replace(pattern, replacer);
    }

    return text;
};

export const preprocessMaths = (maths: string) => {
    if (!maths) {
        return '';
    }

    for (const [pattern, replacer] of replacers.maths) {
        maths = maths.replace(pattern, replacer);
    }

    return `{${maths}}`;
};