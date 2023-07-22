import { common } from "@modules";
import { storages } from "@handlers/state";
import { useStorageValue } from "@core/hooks";
import { Button } from "@components";
import utilities from "@utilities";
import Theming, { spec } from "@handlers/theming";

import { BaseItem } from "@azalea/types";

const { Redux, React, Immutable } = common;
const { colors } = storages;
const { capitalize } = utilities;

const SelectTheme = ({ label, selected, setSelected }) => {
    React.useEffect(() => {
        Theming.setTheme();
        Theming.applyLabel(label);
    }, [selected]);

    return <select 
        className={"revision-select-stream-dropdown theme-select"}
        autocomplete={false}
        value={selected}
        onChange={e => {
            const index = Number(e.target.value);
            setSelected(Theming.themes[index] ? index : 0);
        }}
    >
        {Theming.themes.map((theme, i) => (
            <option value={i}>
                {theme.name}
            </option>
        ))}
    </select>
}

const ColorInput = ({ label, color, colorKey, colorType }) => {
    const isKeyTint = React.useMemo(() => color.toLowerCase().includes("tint"), []);
    const defaultTheme = React.useMemo(() => Theming.themes[0].colors, []);

    const [value, setValue] = useStorageValue(color, "colors");

    React.useEffect(() => {
        Theming.setTheme();
        Theming.applyLabel(label);
    }, [value]);
    
    return <div 
        style={{ 
            display: "flex", 
            width: "100%", 
            justifyContent: "center",
        }}
    >
        <p 
            style={{ 
                marginRight: "1rem",
                marginBlock: "0.4rem",
                flexGrow: 1,
                maxWidth: "30%"
            }}
        >
            {capitalize(colorKey)}
        </p>
        <input 
            type={"text"}
            className={"revision-search"}
            placeholder={defaultTheme[colorType][colorKey]}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
        <div
            style={{ 
                width: "1.5rem",
                height: "1.5rem",
                marginTop: "0.25rem",
                borderRadius: "0.5rem",
                backgroundColor: isKeyTint ? "#ff6d1f" : (value || `var(--${color})`),
                filter: isKeyTint ? "var(--tint)" : null
            }}
        />
    </div>
}

const ColorInputs = ({ selected, setSelected, label }) => {
    const shouldDisplayEditor = React.useMemo(() => Theming.themes[selected].name === "Custom", [selected])

    return <>
        <div 
            style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <h2 style={{ textAlign: "center", marginBlock: 0 }}>Custom values</h2>
            {shouldDisplayEditor && <Button
                text={"Clear colors"}
                className={"clear-custom-btn"}
                onClick={() => {
                    colors.clear();
                    
                    // Force rerender the inputs by setting away from Custom theme and back
                    // The timeout has no delay specified hence it just gets added to the event queue
                    setSelected(0);
                    setTimeout(() => setSelected(Theming.themes.findIndex(x => x.name === "Custom")));
                }}
            />}
        </div>
        <div 
            style={{ 
                justifyContent: "center",
                overflowY: "scroll",
                flexWrap: "wrap",
                display: "flex"
            }}
        >
            {shouldDisplayEditor
                ? Object.keys(spec).map(key => {
                    return <>
                        <h3 style={{ marginBottom: "1rem !important" }}>
                            {capitalize(key)}
                        </h3>
                        {spec[key].map(color => {
                            return <ColorInput 
                                label={label}
                                color={`${key}-${color}`}
                                colorType={key}
                                colorKey={color}
                            />
                        })}
                    </>
                }) 
                : <p style={{ textAlign: "center", maxWidth: "75%" }}>
                    Select the <strong>Custom</strong> theme from the dropdown above for these colors to be editable!
                </p>}
        </div>
    </>
}

const Themes = ({ label }) => {
    const [selected, setSelected] = useStorageValue("themeIndex", "preferences");

    return <div>
        <div
            style={{
                display: "flex",
                padding: "1em",
                paddingTop: 0,
                paddingBottom: "1.5em",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <SelectTheme 
                label={label}
                selected={selected} 
                setSelected={setSelected} 
            />
            <Button 
                text={"Cycle Theme"}
                className={"cycle-theme-btn"}
                onClick={() => setSelected((previous) => Theming.themes[previous + 1] ? previous + 1 : 0)}
            />
        </div>

        <ColorInputs
            selected={selected}
            setSelected={setSelected}
            label={label}
        />
    </div>
}

export default class Item implements BaseItem {
    text = "Themes";

    img = "menu_theme.png";
    hoverImg = "menu_theme_hover.png";
    keyBinding = null;

    action = "onSelectTheme";
    callback() {
        const label = document.querySelector(".status-bar-label-text");

        Redux.dispatch({
            type: "START_ALERT",
            alert: Immutable.Map({
                title: "Manage your theme",
                message: <Themes label={label} />,
                type: "innerComponent",
                buttons: [
                    Immutable.fromJS({ 
                        key: "continue", 
                        text: "Done", 
                        shortcuts: ["Escape"], 
                        primary: true
                    })
                ],
                noDefaultButton: true
            })
        })
    }
}