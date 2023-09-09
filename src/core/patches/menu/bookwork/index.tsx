import Bookwork from './Bookwork';
import { common } from '@modules';

import { RouteItem } from '@azalea/types';

const { React } = common;

export const path = '/azalea/bookwork'

class Route implements RouteItem {
    path = path

    component() {
        return <Bookwork />;
    }
}

export default { Item: null, Route };