const cuteName = {
    firstName: "Rosie",
    lastName: ":3"
};
const wait = (time: number) => new Promise(res => setTimeout(res, time));
const getImage = (name: string) => `https://raw.githubusercontent.com/acquitelol/CutestBypass/main/extension/assets/${name}`;

export default {
    cuteName,
    wait,
    getImage
}