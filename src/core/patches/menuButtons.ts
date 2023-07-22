import patcher from "@core/patcher"
import utilities from "@utilities"
import handlers from "@handlers"
import modules from "@modules"
import items from "@patches/menu"

import { BaseItem } from "@azalea/types";

const { lazyModule, findReact, getImage } = utilities;
const { Theming } = handlers;

export default async function() {
    const label = await lazyModule(() => document.querySelector(".status-bar-label-text"));
    const status = await lazyModule(() => document.querySelector(".status"));
    const Immutable = await lazyModule(() => modules.common.Immutable);

    const StatusBar = findReact(status);

    patcher.after("render", StatusBar.__proto__, function(_, res) {
        // Apply label again, in-case the XP of the user changes
        Theming.applyLabel(label);
        
        if (!this.props.menuItems) return;

        // Map items and wrap the values in calls to abstract away the actual classes
        const newMenuItems = Object.values(items).map(item => {
            const instance = new item();

            return {
                ...instance,
                img: getImage(instance.img),
                hoverImg: getImage(instance.hoverImg),
                callback: instance.callback
            }
        }) satisfies BaseItem[]

        // Iterate through every new item and add it to the menuItems Immutable Map
        newMenuItems.forEach(newMenuItem => {
            for (const [idx, oldMenuItem] of this.props.menuItems.entries()) {
                newMenuItem.action === oldMenuItem.get("action") 
                    && (this.props.menuItems = this.props.menuItems.delete(idx));
            }

            // This must be calculated every iteration as the index moves down for each item that is added
            const insertIndex = this.props.menuItems.findIndex((item) => item.get("text").includes("Log out"));

            this.props.menuItems = this.props.menuItems.insert(insertIndex, Immutable?.fromJS(newMenuItem));
            Object.assign(this.props, { [newMenuItem.action]: newMenuItem.callback });
        })

        return res;
    })
}