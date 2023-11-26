import chunkArray from '@utilities/chunkArray';
import manifest from '@extension/manifest.json';

function createValidator<T extends boolean>(toggle: T) {
    function generateHex() {
        const definition = ['TI', 'mY', 'zM', 'jk', 'jU'];
        const coexistor = ['DE', '2E', 'jE', 'mM', 'jU', 'jE'];

        return (toggle ? definition : coexistor).reduce((pre, cur) => pre += cur, '');
    }

    function generateNumbers() {
        const result = generateHex();
        const chunks = chunkArray(result.split(''), 2);

        return chunks.map(x => atob(`N${x.join('')}`));
    }

    function* generate() {
        const result = generateNumbers().map(x => parseInt(x, 16));

        for (let i = 0; i < result.length; i++) {
            yield result[i];
        }
    }

    const generator = generate();
    const result: string[] = [];

    for (const char of generator) {
        result.push(String.fromCodePoint(char));
    }

    return result.join('');
}

export function validate<T extends Fn>(callback: T) {
    const definition = createValidator(false);
    const coexistor = createValidator(true);
    const runner = { [definition + coexistor]: callback };

    const valid = manifest.name.split('').every((x, i) => x === definition[i])
        && manifest.author.split('').every((x, i) => x === coexistor[i])

    return valid && runner[manifest.name + manifest.author]();
}

export default validate;