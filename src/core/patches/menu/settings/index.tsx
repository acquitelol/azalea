import Settings from './Settings';
import utilities from '@core/utilities';
import { common } from '@modules';

import { MenuItem, RouteItem } from '@azalea/types';

const { React } = common;
const { navigate } = utilities;

export const path = '/azalea/settings';

class Item implements MenuItem {
    text = 'Settings';

    callback() {
        navigate(path);
    }
}

class Route implements RouteItem {
    path = path;

    component() {
        return <Settings />;
    }
}

export default { Item, Route };