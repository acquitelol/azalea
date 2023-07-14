const loadScript = (src, async = false) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.onload = function() { this.remove(); };

    (document.head || document.documentElement).appendChild(script);
}

fetch("https://raw.githubusercontent.com/acquitelol/CutestBypass/main/manifest.json")
    .then(r => r.json())
    .then(r => r.web_accessible_resources[0].resources.map(item => loadScript(chrome.runtime.getURL(item))));