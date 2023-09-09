import About from './About';
import { common } from '@modules';

import { RouteItem } from '@azalea/types';

const { React } = common;

export const path = '/azalea/about';

class Route implements RouteItem {
    path = path

    component() {
        return <About />;
    }
}

export default { Item: null, Route };