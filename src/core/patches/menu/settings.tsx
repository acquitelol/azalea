import { common } from "@modules";
import { useStorageValue } from "@core/hooks";
import { Arrows, Button, EndAlertButton } from "@components";
import { storages } from "@core/handlers/state";
import utilities from "@utilities";

import manifest from "@extension/manifest.json";
import { BaseItem } from "@azalea/types";

const { Redux, React, Immutable } = common;
const { repository, noop, name, getImage } = utilities;
const { preferences } = storages

const BookworkMessage = () => {
    return <p style={{ textAlign: "center" }}>
        With Auto-bookwork disabled, <strong>Answers will no longer be submitted automatically</strong> if the answer provided matches a bookwork-check option.
        <br />
        <br />
        They will still be <strong>saved</strong> and <strong>displayed in bookwork checks</strong> for you to choose manually.
        <br />
        <p
            style={{
                fontSize: "2rem",
                marginBottom: "0"
            }}
        >
            Current status: <strong>{preferences.get("autoBookwork") ? "Enabled" : "Disabled"}</strong>.
        </p>
    </p>
}

const AboutMessage = () => {
    return <>
        <h3>{manifest.description}</h3>
        <h4>Written by {manifest.author}. Version: {manifest.version}</h4>
        {"You can access the entire source code "}
        <a 
            href={repository.plain}
            target={"blank"}
        >
            here
        </a> 
        {" and the license "}
        <a 
            href={repository.plain + "/blob/main/LICENSE"}
            target={"blank"}
        >
            here
        </a>.
        {" You can also access the build workflows of the codebase "}
        <a 
            href={repository.plain + "/actions"}
            target={"blank"}
        >
            here
        </a>.
        <br />
        <br />
        <h4 style={{ marginBlock: 0 }}>
            Thank you for installing {manifest.name} ♡
        </h4>
    </>
}

const ToggleBookwork = () => {
    const [enabled, setEnabled] = useStorageValue<boolean>("autoBookwork", "preferences");

    return <div 
        style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "0"
        }}
    >
        <h3 style={{ marginRight: "0.5em" }}>
            Autobookwork
        </h3>
        <Button 
            text={enabled ? "Disable" : "Enable"}
            className={"special-btn"}
            onClick={() => setEnabled(previous => !previous)}
        />
        <img 
            src={getImage("information.png")}
            style={{
                width: "1em",
                height: "1em",
                marginLeft: "0.3em",
                filter: "var(--tint)",
                cursor: "pointer"
            }}
            onClick={() => Redux.dispatch({
                type: "START_ALERT",
                alert: Immutable.Map({
                    title: "Auto-bookwork Notice",
                    message: <BookworkMessage />
                })
            })}
        />
    </div>
}

const NameInput = ({ type, label, placeholder, user }) => {
    const [value, setValue] = useStorageValue(type, "preferences");

    React.useEffect(() => {
        Redux?.dispatch({ 
            type: "SET_USER",
            user: user
                .set("firstName", name.firstName)
                .set("lastName", name.lastName)
        })
    })
    
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
            {label}
        </p>
        <input 
            type={"text"}
            className={"revision-search"}
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
}

const NameInputs = ({ user }) => {
    const [shouldUseCuteName, setShouldUseCuteName] = useStorageValue("shouldUseCuteName", "preferences");

    return <>
        <div 
            style={{ 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 0
            }}
        >
            <h2 style={{ textAlign: "center" }}>Anonymize name</h2>
            <Button
                text={shouldUseCuteName ? "Disable" : "Enable"}
                className={"clear-custom-btn"}
                onClick={() => setShouldUseCuteName(previous => !previous)}
            />
        </div>
        <div 
            style={{ 
                justifyContent: "center",
                overflowY: "scroll",
                flexWrap: "wrap",
                display: "flex"
            }}
        >
            <NameInput 
                type={"cuterFirstName"} 
                label={"First Name"} 
                placeholder={name.defaults.firstName}
                user={user}
            />
            <NameInput 
                type={"cuterLastName"} 
                label={"Last Name"}
                placeholder={name.defaults.lastName} 
                user={user}
            />
        </div>
    </>
}

const Buttons = () => {
    return <div style={{ display: "flex", marginBottom: "2em" }}>
        <EndAlertButton 
            text={"About"}
            trailing={<Arrows.Right />}
            className={"special-btn"}
            onClick={() => Redux.dispatch({
                type: "START_ALERT",
                alert: Immutable.Map({
                    title: manifest.name,
                    message: <AboutMessage />
                })
            })}
        />
        <EndAlertButton 
            text={"Open garden"}
            className={"cycle-theme-btn"}
            onClick={() => Redux.dispatch({
                type: "SELECT_GAME",
                gameType: "gardengame"
            })}
        />
        <EndAlertButton 
            text={"Done"}
            trailing={<Arrows.Right />}
            className={"cycle-theme-btn"}
            onClick={noop}
        />
    </div>
}

const Settings = ({ user }) => (
    <>
        <ToggleBookwork />
        <NameInputs user={user} />
        <br />
        <Buttons />
    </>
);

export default class Item implements BaseItem {
    text = "Settings";

    img = "menu_name.png";
    hoverImg = "menu_name_hover.png";
    keyBinding = null;

    action = "onOpenPreferences";
    callback() {
        const user = Redux.getState().get("user");

        Redux.dispatch({
            type: "START_ALERT",
            alert: Immutable.Map({
                title: `Welcome to Azalea, ${user.get("firstName")}!`,
                message: <Settings user={user} />,
                type: "innerComponent",
                noDefaultButton: true
            })
        })
    }
}