import LocalStorageHandler from "./storage";

export const storages = {
    preferences: new LocalStorageHandler("AzaleaPreferences", false),
    bookwork: new LocalStorageHandler("AzaleaBookwork")
}