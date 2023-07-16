import patcher from "../patcher";
import utilities from "../utilities";
import handlers from "../handlers";
import modules from "../modules";

const { cuteName, lazyModule, findReact, getImage } = utilities;
const { Theming, preferences } = handlers;

export default async function() {
    const Nodes = {} as Record<string, Element>;
    const nodeNames = {
        labels: ".status-bar-label-text",
        status: ".status"
    };

    for (const [name, value] of Object.entries(nodeNames)) {
        Nodes[name] = await lazyModule(
            () => document.querySelector(value),
            r => r !== null
        )
    }

    const Modules = {} as Record<string, any>;

    for (const key of ["Redux", "Immutable"]) {
        Modules[key] = await lazyModule(
            () => modules.common[key],
            r => r !== null
        );
    }

    const StatusBar = findReact(Nodes.status);

    patcher.after("render", StatusBar.__proto__, function(_, res) {
        if (!this.props.menuItems) return;

        function onCycleTheme() {
            preferences.set(
                "themeIndex", 
                Theming.themes[Theming.current + 1] ? Theming.current + 1 : 0
            )

            Theming.setTheme(Nodes.labels);
        }

        function onToggleName() {
            preferences.set("name", !preferences.get("name"));

            Modules.Redux.dispatch({ 
                type: "SET_USER", 
                user: Modules.Redux.getState()
                    .get("user")
                    .set("firstName", preferences.get("name") ? cuteName.firstName : preferences.get("firstName"))
                    .set("lastName", preferences.get("name") ? cuteName.lastName : preferences.get("lastName"))
            })
        }

        const newItems = [
            {
                text: "Cycle theme",
                img: getImage("menu_theme.png"), // Note: This can take in any image link, but the size of the icon isn't predefined
                hoverImg: getImage("menu_theme_hover.png"),
                action: onCycleTheme.name,
                keyBinding: null,
                newBadge: false
            },
            {
                text: `${preferences.get("name") ? "Disable" : "Enable"} name`,
                img: getImage("menu_name.png"),
                hoverImg: getImage("menu_name_hover.png"),
                action: onToggleName.name,
                keyBinding: null,
                newBadge: false
            }
        ]
        
        Object.assign(this.props, { onCycleTheme, onToggleName });

        // Ensure that the components from this patch haven't been added already
        // Reassign to menuItems because `push` returns a copy of the List
        newItems.forEach(newItem => {
            for (const [idx, oldItem] of this.props.menuItems.entries()) {
                newItem.action === oldItem.get("action") 
                    && (this.props.menuItems = this.props.menuItems.delete(idx));
            }

            this.props.menuItems = this.props.menuItems.push(Modules.Immutable.fromJS(newItem));
        })

        return res;
    })
}