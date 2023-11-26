import initializeRoutes from './routes';
import initializeWindow from './window';
import initializePrefs from './prefs';
import initializeLogo from './logo';
import validate from './validate';

const allSettledValidated = <T extends Promise<any>, U extends () => T>(promiseFunctions: U[]) => {
    const promises = promiseFunctions.map(x => validate(() => x())) satisfies T[];
    return validate(() => Promise.allSettled(promises));
}

allSettledValidated([
    initializeRoutes,
    initializeWindow,
    initializePrefs,
    initializeLogo
])