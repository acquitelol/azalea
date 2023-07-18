import StorageHandler from "./storage";

export const storages = {
    preferences: new StorageHandler("AzaleaPreferences", false),
    bookwork: new StorageHandler("AzaleaBookwork")
}