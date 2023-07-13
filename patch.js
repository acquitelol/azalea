const loadScript = (name) => {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(name);
    script.onload = function() { this.remove(); };

    (document.head || document.documentElement).appendChild(script);
}

["utilities.js", "main.js"].map(loadScript);