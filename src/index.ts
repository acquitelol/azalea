async function loadFromURL(src, async = false) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;

    (document.head || document.body || document.documentElement).appendChild(script)
}

loadFromURL(window['chrome'].runtime.getURL('bundle.js'));