import patcher from "../patcher";
import utilities from "../utilities";
import handlers from "../handlers";
import modules from "../modules";

const { name, lazyModule, findReact, getImage } = utilities;
const { Theming, preferences } = handlers;

type MenuItem = {
    text: string;
    img: string;
    hoverImg: string;
    action: string;
    keyBinding: string | null;
    newBadge: boolean;
    callback: () => any | void;
}

export default async function() {
    const labelNode = await lazyModule(() => document.querySelector(".status-bar-label-text"));
    const statusNode = await lazyModule(() => document.querySelector(".status"));
    const Redux = await lazyModule(() => modules.common.Redux);
    const React = await lazyModule(() => modules.common.React);
    const Immutable = await lazyModule(() => modules.common.Immutable);

    const StatusBar = findReact(statusNode);

    patcher.after("render", StatusBar.__proto__, function(_, res) {
        Theming.applyLabel(labelNode);
        if (!this.props.menuItems) return;

        const newMenuItems = [
            {
                text: `${preferences.get("autoBookwork") ? "Disable" : "Enable"} bookwork`,
                img: getImage("menu_bookwork.png"),
                hoverImg: getImage("menu_bookwork_hover.png"),
                action: "onToggleBookwork",
                keyBinding: null,
                newBadge: false,
                callback() {
                    preferences.set("autoBookwork", !preferences.get("autoBookwork"));

                    !preferences.get("autoBookwork") && Redux?.dispatch({
                        type: "START_ALERT",
                        alert: Immutable?.Map({
                            title: "Disabled Auto-bookwork",
                            message: React?.createElement("p", {
                                children: [
                                    "Answers will no longer be submitted automatically if the answer provided matches an option.",
                                    React?.createElement("br"),
                                    React?.createElement("br"),
                                    "They will still be saved and displayed in bookwork checks for you to choose the correct option manually regardless."
                                ],
                                style: { textAlign: "center" }
                            }),
                            type: "innerComponent"
                        })
                    })
                },
            },
            {
                text: `${preferences.get("shouldUseCuteName") ? "Disable" : "Enable"} name`,
                img: getImage("menu_name.png"),
                hoverImg: getImage("menu_name_hover.png"),
                action: "onToggleName",
                keyBinding: null,
                newBadge: false,
                callback() {
                    preferences.set("shouldUseCuteName", !preferences.get("shouldUseCuteName"));

                    Redux?.dispatch({ 
                        type: "SET_USER", 
                        user: Redux?.getState()
                            .get("user")
                            .set("firstName", name.firstName)
                            .set("lastName", name.lastName)
                    })
                },
            },
            {
                text: "Cycle theme",
                img: getImage("menu_theme.png"),
                hoverImg: getImage("menu_theme_hover.png"),
                action: "onCycleTheme",
                keyBinding: null,
                newBadge: false,
                callback() {
                    preferences.set(
                        "themeIndex", 
                        Theming.themes[Theming.index + 1] ? Theming.index + 1 : 0
                    )
        
                    Theming.setTheme();
                    Theming.applyLabel(labelNode);
                }
            },
            {
                text: "Open Garden",
                img: getImage("menu_garden.png"),
                hoverImg: getImage("menu_garden_hover.png"),
                action: "onOpenGarden",
                keyBinding: null,
                newBadge: false,
                callback() {
                    Redux?.dispatch({
                        type: "SELECT_GAME",
                        gameType: "gardengame"
                    })
                }
            }
        ] satisfies MenuItem[];

        // Iterate through every new item
        newMenuItems.forEach(newMenuItem => {
            for (const [idx, oldMenuItem] of this.props.menuItems.entries()) {
                newMenuItem.action === oldMenuItem.get("action") 
                    && (this.props.menuItems = this.props.menuItems.delete(idx));
            }

            this.props.menuItems = this.props.menuItems.push(Immutable?.fromJS(newMenuItem));
            Object.assign(this.props, { [newMenuItem.action]: newMenuItem.callback });
        })

        return res;
    })
}