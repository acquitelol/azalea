import modules from '@modules';
import * as components from '@components';
import handlers from '@handlers';
import utilities from '@utilities';
import patches from '@patches';
import patcher from '@core/patcher';
import bookwork from '@core/bookwork';
import * as hooks from '@core/hooks';

import { Navigation } from '@azalea/utilities';

const azalea = {
    modules,
    components,
    handlers,
    utilities,
    patches,
    patcher,
    bookwork,
    hooks,
    navigation: null as Navigation
}

export default azalea;