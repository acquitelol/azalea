import Theming from "./theming";
import LocalStorageHandler from "./storage";
import { storages } from "./default"

const handlers = {
    Theming,
    LocalStorageHandler,
    ...storages
}

export default handlers;
