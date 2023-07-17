import LocalStorageHandler from "./storage";

export const storages = {
    preferences: new LocalStorageHandler("AsterPreferences", false),
    bookwork: new LocalStorageHandler("AsterBookwork")
}