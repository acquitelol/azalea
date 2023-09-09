import initializeRoutes from './routes';
import initializeWindow from './window';
import initializePrefs from './prefs';
import initializeLogo from './logo';

Promise.allSettled([
    initializeRoutes(),
    initializeWindow(),
    initializePrefs(),
    initializeLogo()
]);