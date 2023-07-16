import patcher from "../patcher";
import utilities from "../utilities";
import handlers from "../handlers";
import modules from "../modules";

const { name, lazyModule, findReact, getImage } = utilities;
const { Theming, preferences } = handlers;

export default async function() {
    const labelNode = await lazyModule(() => document.querySelector(".status-bar-label-text"));
    const statusNode = await lazyModule(() => document.querySelector(".status"));
    const Redux = await lazyModule(() => modules.common.Redux);
    const Immutable = await lazyModule(() => modules.common.Immutable);

    const StatusBar = findReact(statusNode);

    patcher.after("render", StatusBar.__proto__, function(_, res) {
        if (!this.props.menuItems) return;

        function onCycleTheme() {
            preferences.set(
                "themeIndex", 
                Theming.themes[Theming.current + 1] ? Theming.current + 1 : 0
            )

            Theming.setTheme(labelNode);
        }

        function onToggleName() {
            preferences.set("shouldUseCuteName", !preferences.get("shouldUseCuteName"));

            Redux?.dispatch({ 
                type: "SET_USER", 
                user: Redux?.getState()
                    .get("user")
                    .set("firstName", name.firstName)
                    .set("lastName", name.lastName)
            })
        }

        function onOpenGarden() {
            Redux?.dispatch({
                type: "SELECT_GAME",
                gameType: "gardengame"
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
                text: `${preferences.get("shouldUseCuteName") ? "Disable" : "Enable"} name`,
                img: getImage("menu_name.png"),
                hoverImg: getImage("menu_name_hover.png"),
                action: onToggleName.name,
                keyBinding: null,
                newBadge: false
            },
            {
                text: "Open Garden",
                img: getImage("menu_garden.png"),
                hoverImg: getImage("menu_garden_hover.png"),
                action: onOpenGarden.name,
                keyBinding: null,
                newBadge: false
            }
        ]
        
        Object.assign(this.props, {
            [onCycleTheme.name]: onCycleTheme, 
            [onToggleName.name]: onToggleName,
            [onOpenGarden.name]: onOpenGarden
        });

        // Ensure that the components from this patch haven't been added already
        // Reassign to menuItems because `push` returns a copy of the List
        newItems.forEach(newItem => {
            for (const [idx, oldItem] of this.props.menuItems.entries()) {
                newItem.action === oldItem.get("action") 
                    && (this.props.menuItems = this.props.menuItems.delete(idx));
            }

            this.props.menuItems = this.props.menuItems.push(Immutable?.fromJS(newItem));
        })

        return res;
    })
}