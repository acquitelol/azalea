import cutest from "./api";
import utilities from "./api/core/utilities";
import handlers from "./api/core/handlers";

const { cuteName, lazyModule } = utilities;
const { Theming, preferences } = handlers;
window.cutest = cutest;

(async function() {
    const labelNodes = await lazyModule(() => document.getElementsByClassName("status-bar-label-text")) as HTMLCollectionOf<Element>;
    
    // Initialization by applying preferences
    preferences.set("realName", labelNodes[1].textContent)
    preferences.get("name") && (labelNodes[1].textContent = cuteName);
    
    Theming.setTheme(labelNodes[0]);
})()