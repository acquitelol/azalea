function loadFromURL(src, async = true) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;

    (document.head || document.documentElement).prepend(script);
}

loadFromURL(window["chrome"].runtime.getURL("bundle.js"));