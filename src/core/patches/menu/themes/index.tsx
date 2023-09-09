import Themes from './Themes';
import utilities from '@core/utilities';
import { common } from '@modules';

import { MenuItem, RouteItem } from '@azalea/types';

const { React } = common;
const { navigate } = utilities;

export const path = '/azalea/themes'

class Item implements MenuItem {
    text = 'Themes';

    callback() {
        navigate(path)
    }
}

class Route implements RouteItem {
    path = path

    component() {
        const label = document.querySelector('[class*="_XPCount_g7mut_"]');

        return <Themes label={label} />;
    }
}

export default { Item, Route }