import StorageHandler from "./storage";

export const storages = {
    colors: new StorageHandler("AzaleaCustomTheme", false),
    preferences: new StorageHandler("AzaleaPreferences", false),
    bookwork: new StorageHandler("AzaleaBookwork"),
}