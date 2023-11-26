import modules from '@core/modules';
import utilities from '@core/utilities';
import items from '@patches/menu';
import patcher from '@core/patcher';

import { RouteItem } from '@azalea/types';
import logger from '@core/logger';

const { lazyDefine } = utilities;

async function initializeRoutes() {
    const React = await lazyDefine(
        () => modules.common.React,
        r => typeof r.useContext === 'function' && typeof r.createElement === 'function'
    );

    const unpatch = patcher.after('useContext', React, (_, res: typeof azalea.navigation) => {
        if (res && res.router && res.navigator) {
            logger.info('Assigning azalea.navigation...');
            azalea.navigation = res;

            const routeItems = Object.values(items)
                .filter(item => item.Route)
                .map(item => new item.Route()) satisfies RouteItem[]

            // Add each route to the routes if it hasn't been added already
            for (const route of routeItems) {
                if (!res.router.routes[0].children.find(x => x.path === route.path)) {
                    res.router.routes[0].children.push({
                        path: route.path,
                        element: (
                            React.createElement('div', {
                                style: {
                                    background: 'var(--palette-light-grey)',
                                    height: '100%',
                                    overflowY: 'auto'
                                },
                                children: React.createElement(route.component)
                            })
                        ),
                        hasErrorBoundary: false,
                        children: undefined,
                        id: `0-${res.router.routes[0].children.length}`
                    })
                }
            }

            res.router._internalSetRoutes(res.router.routes);
            logger.info('Successfully configured Azalea\'s Routes!');
            unpatch();
        }
    })
}

export default initializeRoutes;