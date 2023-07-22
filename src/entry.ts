import azalea from "@core";
import utilities from "@utilities"
import handlers from "@handlers"
import modules from "@modules";

const { name, lazyModule, getImage } = utilities;
const { Theming, storages: { preferences } } = handlers;
window.azalea = azalea;

(async function() {
    const labelNode = await lazyModule(() => document.querySelector(".status-bar-label-text"));
    const sparxLogo: HTMLImageElement | null = await lazyModule(() => document.querySelector(".sparx-logo"));
    const Redux = await lazyModule(() => modules.common.Redux);

    // Apply cuter logo
    sparxLogo!.src = getImage("logo.png");
    preferences.get("themeIndex") ?? preferences.set("themeIndex", 0);
    preferences.get("autoBookwork") ?? preferences.set("autoBookwork", true);
    
    // Initialization by applying preferences
    const user = Redux?.getState().get("user");

    preferences.set("firstName", user.get("firstName"));
    preferences.set("lastName", user.get("lastName"));

    Redux?.dispatch({ 
        type: "SET_USER",

        // As this is an Immutable Map, using the `set` method returns a cloned collection
        // This means chained `set` calls are valid here
        user: user
            .set("id", "1nitiat3-cut3-m0d3-f0r-5parx-m4ths")
            .set("isStaffUser", true)
            .set("firstName", name.firstName)
            .set("lastName", name.lastName)
    })
    
    Theming.setTheme();
    Theming.applyLabel(labelNode);
})();