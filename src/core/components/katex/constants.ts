export const patterns = {
    vector: /\\vector{((?:[^}$]|\\$[^$]*\\$)*)}{((?:[^}$]|\\$[^$]*\\$)*)}/g,
    degrees: /\\degrees/g,
    numberComma: /(\d,)(?=\d\d\d)/g,
    unescapedPercent: /([^\\]|^)%/g,
    ungroupedQuestion: /([^{?]|^)([?]+)([^}?]|$)/g,
    uscore: /\\uscore{(\d+)}/g,
    pound: /\\pound/g,
    euro: /\\euro/g,
    gap: /\\gap/g,
    newLine: /\\n(?![a-zA-Z])/g,
    nonBreakingSpace: /~/g,
    ampersand: /&/g,
    leftAngledBracket: /</g,
    apostrophe: /'/g,
    quotation: /"/g,
    hazardousComma: /(?<!\s)\\,/g,
    hazardousCharacters: /[&<>"']/,
    maths: /\$|(?:\\.|[^$])+/g,
    bold: /\*\*(.*)\*\*/g
}

export const brackets = {
    openingAngledLeft: '<',
    closingAngledLeft: '</',
    closingAngledRight: '>',
    openingCurly: '{',
    closingCurly: '}'
}

export const latexTags = {
    '\\textbf{': 'b',
    '\\textit{': 'i',
    '}': '',
};

export default { patterns, latexTags };