const loadScript = (name) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(name);
    script.onload = function() { this.remove(); };

    (document.head || document.documentElement).appendChild(script);
}

fetch("https://raw.githubusercontent.com/acquitelol/CutestBypass/main/manifest.json")
    .then(r => r.json())
    .then(r => r.web_accessible_resources[0].resources.map(loadScript));