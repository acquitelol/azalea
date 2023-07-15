import LocalStorageHandler from "./storage";

export const storages = {
    preferences: new LocalStorageHandler("CutestBypassPreferences", false),
    bookwork: new LocalStorageHandler("CutestBypassStorage")
}