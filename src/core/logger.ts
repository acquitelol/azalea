// This code is inspired by Vencord, but I took my own spin on it ;3
// https://github.com/Vendicated/Vencord/blob/main/src/utils/Logger.ts
import utilities from './utilities';
import { storages } from '@core/handlers/state';

const { preferences } = storages;
const { capitalize } = utilities;

export const colors = {
    log: '#ffbded',
    info: '#c2daff',
    warn: '#fff1a8',
    error: '#ffbdbf',
    debug: '#e2c2ff'
}

export const title = ({ background, bold }: { background?: string, bold?: boolean } = {}) => {
    const styles = [
        'border-radius: 5px',
        'text-shadow: 3px 2px 8px #0000004d',
        'color: black'
    ];

    (bold ?? true) && styles.push('font-weight: bold');
    styles.push(`background: ${background ?? colors.log}`);

    return styles.join('; ');
}

const logger = new Proxy(console, {
    get(target, prop) {
        if (!preferences.get('logger')) return function () { };

        // Note that all of the logger levels have the same function signature
        // Therefore using `target['log']` as the Argument list works fine.
        return function (...args: Arguments<typeof target.log>) {
            return target[prop].call(
                console,
                `%c Azalea %c %c ${capitalize(String(prop))} `,
                title(), '',
                title({
                    background: colors[prop] ?? colors.log,
                    bold: false
                }),
                ...args
            );
        }
    }
}) as Pick<typeof console, 'log' | 'info' | 'warn' | 'error' | 'debug'>

export default logger;