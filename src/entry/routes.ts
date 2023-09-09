import modules from '@core/modules';
import utilities from '@core/utilities';
import items from '@patches/menu';
import patcher from '@core/patcher';

import { RouteItem } from '@azalea/types';

const { lazyModule } = utilities;

async function initializeRoutes() {
    const React = await lazyModule(
        () => modules.common.React,
        r => typeof r.useContext === 'function' && typeof r.createElement === 'function'
    );

    patcher.after('useContext', React, (_, res: typeof azalea.navigation) => {
        if (res && res.router && res.navigator) {
            azalea.navigation = res;

            const routeItems = Object.values(items)
                .filter(item => item.Route)
                .map(item => new item.Route()) satisfies RouteItem[]

            // Add each route to the routes if it hasn't been added already
            routeItems.forEach(route => {
                if (!res.router.routes[0].children.find(x => x.path === route.path)) {
                    res.router.routes[0].children.push({
                        path: route.path,
                        element: React.createElement(route.component),
                        hasErrorBoundary: false,
                        children: undefined,
                        id: `0-${res.router.routes[0].children.length}`
                    })
                }
            })

            res.router._internalSetRoutes(res.router.routes);
        }
    })
}

export default initializeRoutes;