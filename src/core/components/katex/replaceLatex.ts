import { latexTags, brackets } from './constants';

export const replaceLatexTagsWithHtmlTags = (bit: string, tagStack: string[]) => {
    const res = [];
    let input = bit;

    while (input) {
        const firstTag = Object.keys(latexTags).find(tag => input.includes(tag));

        if (!firstTag) {
            res.push(input);
            break;
        }

        const firstTagIndex = input.indexOf(firstTag);
        res.push(input.substring(0, firstTagIndex));
        input = input.substring(firstTagIndex + firstTag.length);

        if (firstTag === brackets.closingCurly) {
            const lastOpenedTag = tagStack.pop();
            res.push(lastOpenedTag ? `${brackets.closingAngledLeft}${lastOpenedTag}${brackets.closingAngledRight}` : brackets.closingCurly);
        } else {
            res.push(`${brackets.openingAngledLeft}${latexTags[firstTag]}${brackets.closingAngledRight}`);
            tagStack.push(latexTags[firstTag]);
        }
    }

    return res.join('');
};

export default replaceLatexTagsWithHtmlTags;