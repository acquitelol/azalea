import modules from '@modules';
import * as components from '@components';
import handlers from '@handlers';
import utilities from '@utilities';
import patcher from '@core/patcher';
import * as hooks from '@core/hooks';
import initializePatches from '@patches';

import validate from '@entry/validate';

import { Navigation } from '@azalea/utilities';

const generateAzalea = () => validate(() => ({
    modules,
    components,
    handlers,
    utilities,
    patches: initializePatches(),
    patcher,
    hooks,
    navigation: null as Navigation
}));

export default generateAzalea;