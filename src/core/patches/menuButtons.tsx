import patcher from '@core/patcher';
import utilities from '@utilities';
import handlers from '@handlers';
import modules from '@modules';
import items from '@patches/menu';

import components from '@core/components';
import { MenuItem } from '@azalea/types';

const { lazyDefine, findReact, findInReactTree } = utilities;
const { Theming } = handlers;
const { React } = modules.common;

export default async function () {
    const labelNode = await lazyDefine(() => document.querySelector('[class*="_XPCount_g7mut_"]'));
    const dropdownNode = await lazyDefine(() => document.querySelector('[class*="_DropdownMenuContent_"][role="menu"]'), undefined, Infinity);

    const Dropdown = findReact(dropdownNode);

    const unpatch = patcher.before('render', Dropdown.type, (args) => {
        // Apply label again, in-case the XP of the user changes
        Theming.applyLabel(labelNode);

        const buttons = findInReactTree(args[0], x => (
            Array.isArray(x.children) 
            && x.className.includes('_DropdownMenuContent_')
        ))

        if (!buttons) return;

        // Map items and wrap the values in calls to abstract away the actual classes
        const menuItems = Object.values(items)
            .filter(item => item.Item)
            .map(item => new item.Item()) satisfies MenuItem[]

        menuItems.forEach(item => {
            for (const button of buttons.children) {
                if (button?.props?.text === item.text) return
            }

            const index = buttons.children.findIndex(x => x?.props?.children === 'Logout');

            buttons.children.splice(index === -1 ? 1 : index, 0, (
                <components.DropdownButton
                    text={item.text}
                    onClick={item.callback}
                />
            ))
        })
    })

    return unpatch;
}