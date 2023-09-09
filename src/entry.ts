import azalea from '@core';
import utilities from '@utilities'
import handlers from '@handlers'
import patcher from '@core/patcher';

import items from '@patches/menu';
import { RouteItem } from '@azalea/types';

const { name, lazyModule, getImage } = utilities;
const { Theming, storages: { preferences } } = handlers;

window.azalea = azalea;

if (window.__sparxweb) {
    window.__sparxweb.environment = 'development';
}

(async function () {
    const React = await lazyModule(
        () => azalea.modules.common.React,
        r => typeof r.useContext === 'function' && typeof r.createElement === 'function'
    );

    patcher.after('useContext', React, (_, res) => {
        if (res && res.router && res.navigator) {
            window.navigation = res;

            const routeItems = Object.values(items)
                .filter(item => item.Route)
                .map(item => new item.Route()) satisfies RouteItem[]

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

    // Initialization by applying preferences
    patcher.after('defineProperty', Object, (_, res: Record<PropertyKey, any>) => {
        if (res.data?.student && ['firstName', 'lastName'].every(k => k in res.data?.student)) {
            res.data.student.firstName = name.firstName;
            res.data.student.lastName = name.lastName;
        }
    })

    const labelNode = await lazyModule(() => document.querySelector('[class*="_XPCount_g7mut_"]'));
    const sparxLogoContainer = await lazyModule(() => document.querySelector('[class*="_SMLogo_g7mut_"]'));
    const sparxLogo = (sparxLogoContainer.childNodes[0] as HTMLImageElement);

    // Apply cuter logo
    sparxLogo.src = getImage('logo.png');
    sparxLogo.style.width = '50px';

    preferences.get('themeIndex') ?? preferences.set('themeIndex', 0);
    preferences.get('autoBookwork') ?? preferences.set('autoBookwork', true);

    Theming.setTheme();
    Theming.applyLabel(labelNode);
})();