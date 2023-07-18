# <img src="extension/assets/logo.png" style="width: 2rem"> Azalea

## **The** ***cutest*** **SparxMaths bookwork-bypass extension for Chromium ~!**

### ✩ *If you like this project, consider giving it a star!* ✩

<img src="extension/assets/divider.png">

### **Features provided by the extension:**

- Adds a simple CSS property which **allows all text to be selectable**:

```css
:root {
    --user-select-accessibility-setting: default !important;
}
```

- <img src="extension/assets/menu_theme.png" style="width: 1rem"> Provides access to **Themes** by going into your **Menu** at the top right!
  - Currently the **themes available** include:
  - Pink (Default ✓), Purple, Blue, Aqua, Green, Creme, Dusk, Noir
    <hr>
  - *Note:* ***you cannot select a specific theme (for now)***, *only cycle through them. Adding a specific theme selector is, of course, quite simple, and* ***will be added future updates.***
- <img src="extension/assets/menu_bookwork.png" style="width: 1rem"> Stores **bookwork checks** and automatically submits them if possible (this is *on* by default, and can be disabled from **Menu**), otherwise shows you the answer to choose the correct option yourself.
- <img src="extension/assets/menu_name.png" style="width: 1rem"> Allows you to anonymize your username by setting it to **Rosie :3** (toggleable from **Menu**, off by default) and anonymizes your ID to `1nitiat3-cut3-m0d3-f0r-5parx-m4ths`. This aims to make Sparx a place where you cannot be doxxed by showing your Redux User-state or a screenshot asking for help!
- <img src="extension/assets/menu_garden.png" style="width: 1rem"> Adds a button in the **Menu** allowing you to open garden game. This is meant for if your school disabled times tables minigames and you had progress on Garden Game beforehand, or want to try the game out!

<img src="extension/assets/divider.png">

### **How to install:**

- Go to [**Releases**](https://github.com/acquitelol/azalea/releases/) > **[Latest](https://github.com/acquitelol/azalea/releases/latest)** or click on **[Azalea.zip](https://github.com/acquitelol/azalea/releases/latest/download/Azalea.zip)** to download the **compressed extension bundle** containing all the things to be injected into Sparx!
- Extract the ZIP to a folder onto your local file system.
- Open the **Manage Extensions** tab in your Chromium-based browser
  - (This can be any browser ranging from `Chrome` to `Edge` to `Opera` to `Arc`).
- Enable **Developer Mode** if not enabled already.
- Click on **Load Unpacked**.
- Select the **Azalea-(version)** directory.
- **You're done!** Open/Refresh `Sparx` the extension should be installed! :D

<img src="extension/assets/divider.png">

### **Notes on bundling:**

- The codebase **is minified into a bundle**, but this is simply done to reduce file size when installing. This means that **all of the source code is public** and the codebase is transformed into a bundle using GitHub Actions, available to view [here](https://github.com/acquitelol/azalea/actions).
- This ensures that the code is safe to use for everyone! If you don't trust me, the actions, or want to be extra sure, *which is perfectly fair enough*, **clone the repository and build the extension yourself**!
- At the moment, **there is no updater implementation in the extension**, so you will need to reinstall the extension manually from here when updates arrive. When this does eventually release, it will be **opt-in only**, which means it will be **disabled by default**, to ensure safety.

<img src="extension/assets/divider.png">

### **Contributing:**

- To contribute to this project, it's **really** simple!
- Fork **[this repository](https://github.com/acquitelol/azalea)**
- Clone the fork locally using:

```sh
git clone https://github.com/[YOU]/[FORK]
```

- Open up the repository, and checkout a new branch:

```sh
git checkout -b feature/cuter
```

- Add your amazing feature(s) and **commit & push to the branch**:

```sh
git commit -m 'Added cutest new feature! :3'
git push origin feature/cuter
```

- Create a **[pull request](https://github.com/acquitelol/azalea/pulls)** and wait for it to be reviewed
- ***You're done!*** **Thanks for your contribution! :D**

<img src="extension/assets/divider.png">

<div align="center">
    Made by Rosie :3
    <hr>
    <a href="#top">⇡ Back to top️!</a>
</div>