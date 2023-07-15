// @ts-ignore ~ Error is `Cannot redeclare block-scoped variable` even though it isn't defined already
function loadScript(src, async = true) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;

    (document.head || document.documentElement).prepend(script);
}

loadScript(window["chrome"].runtime.getURL("bundle.js"));