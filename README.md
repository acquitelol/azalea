# <img src="extension/assets/logo.png" style="width: 2rem"> Azalea

## **The** ***cutest*** **SparxMaths bookwork-bypass extension for Chromium ~!**

### ✩ *If you like this project, consider giving it a star!* ✩

<img src="extension/assets/divider.png">

### ♡ **How to install:**

- Go to [**Releases**](https://github.com/acquitelol/azalea/releases/) > **[Latest](https://github.com/acquitelol/azalea/releases/latest)** or click on **[Azalea.zip](https://github.com/acquitelol/azalea/releases/latest/download/Azalea.zip)** to download the **compressed extension bundle** containing all the things to be injected into Sparx!
    <hr />
- Extract the ZIP to a folder onto your local file system.
- Open the **Manage Extensions** tab in your Chromium-based browser
  - (This can be any browser ranging from `Chrome` to `Edge` to `Opera` to `Arc`).
  <hr />
- *(Enable* ***Developer Mode*** *if not enabled already.)*
- Click on **Load Unpacked**.
- Select the **Azalea-(version)** directory.
  <hr />
- **You're done!** Open/Refresh `Sparx` the extension should be installed! :D

<img src="extension/assets/divider.png">

### ♡ **Features provided by the extension:**

- Adds a simple CSS property which **allows all text to be selectable**:

    ```css
    :root {
        --user-select-accessibility-setting: default !important;
    }
    ```

- Provides access to **Themes** by going into **Menu > Settings** at the top right!
  - Currently the **themes available** include:
  - None (Default ✓), Pink, Purple, Blue, Aqua, Green, Creme, Dusk, Custom
    <hr />
  - *Note:* ***Custom themes allow you to theme every colored variable available in Azalea, ranging from tints to regular colors to text colors. This uses the colors for `Pink` by default because I advocate for pink and believe it is the best color <3.***
  <hr />

- Stores **bookwork checks** and automatically selects them if possible (this is *on* by default, and can be disabled from **Menu > Bookwork**), otherwise shows you the most recent answers to choose the correct option yourself.

- *Note:* **You can manage your stored bookwork checks by going into ***Menu > Bookwork*** at the top right**

  <hr />

- Allows you to anonymize your username by setting it to **Rosie :3** by default (editable from **Menu > Settings**, off by default). This aims to make Sparx a place where you cannot be doxxed by showing a screenshot asking for help!

  <hr />

- Allows you to change the icon usd in Sparx by providing an image URL! (editable from **Menu > Settings**, off by default).

<img src="extension/assets/divider.png">

### ♡ **Notes on bundling and updating:**

- The codebase **is minified and obfuscated into a bundle**, but this is simply done to reduce file size when installing. This means that **all of the source code is public** and the codebase is transformed into a bundle using GitHub Actions, available to view [here](https://github.com/acquitelol/azalea/actions).

    <hr />

- This ensures that the code is safe to use for everyone! If you don't trust me, the actions, or want to be extra sure, *which is perfectly fair enough*, **clone the repository and build the extension yourself**!

    <hr />

- Due to the limited nature of Manifest V3 Chrome Extensions, having an updater without being on the Chrome Web Store is already *very* difficult and convoluted. As such, there is no way to manually check for updates, only to disable them and fetch from local sources.

- **I see a 'Azalea started debugging this browser' message! What is this? Stop hacking me!** <br />
This is only used as a way to execute Azalea's bundle dynamically, as there are many systems put in place by Chrome to prevent running code. If you would like to be extra sure, the only place in the entire codebase where the debugger is used is [here](https://github.com/acquitelol/azalea/blob/sparx-v2/src/loader/worker.ts), for updating and running the bundle.

> If you have any questions, please [raise an issue](https://github.com/acquitelol/azalea/issues/new) :3

<img src="extension/assets/divider.png">

### ♡ **Contributing:**

- To contribute to this project, it's **really** simple!
- Fork **[this repository](https://github.com/acquitelol/azalea)**
- Clone the fork locally using:

    ```sh
    git clone https://github.com/[YOU]/[FORK]
    ```

- Open up the repository, and checkout a new branch:

    ```sh
    git checkout -b feature/meow
    ```

- Add your amazing feature(s) and **commit & push to the branch**:

    ```sh
    git commit -m 'Added cutest new feature! ;3'
    git push origin feature/meow
    ```

- Create a **[pull request](https://github.com/acquitelol/azalea/pulls)** and wait for it to be reviewed
- ***You're done!*** **Thanks for your contribution! :D**

<img src="extension/assets/divider.png">

♡ Made by Rosie :3

Copyright © 2023 Rosie ([acquitelol](https://github.com/acquitelol))

```
All rights reserved.

The software provided is not affiliated with Sparx LTD, Sparx Maths, or Sparx Learning.

All software is provided for educational purposes only, and should not be used for unlawful or unethical modification of the Sparx Maths website.
```

<hr />

<a href="#top">⇡ Back to top️!</a>
