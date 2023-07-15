const loadScript = (src, async = false) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.onload = function() { this.remove(); };

    (document.head || document.documentElement).appendChild(script);
}

// Fetches all of the web_accessible_resources from GitHub and loads them as a script
// This is to prevent hardcoding of the things imported here
fetch("https://raw.githubusercontent.com/acquitelol/CutestBypass/main/src/manifest.json")
    .then(r => r.json())
    .then(r => r.web_accessible_resources[0].resources.map(item => loadScript(chrome.runtime.getURL(item))));