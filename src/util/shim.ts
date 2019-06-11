if (window.setTimeout == null) {
    window.setTimeout = (fn: any) => fn();
}

if (window.clearTimeout == null) {
    window.clearTimeout = () => {};
}

//  this is a temporary shim for the latest versions of react.
if (window.cancelAnimationFrame == null) {
    window.cancelAnimationFrame = () => {};
}

if (window.requestAnimationFrame == null) {
    // @ts-ignore
    window.requestAnimationFrame = (callback: any) => {
        console.warn("requestAnimationFrame is not supported yet");
    }
}

// @ts-ignore
if (window.HTMLIFrameElement == null) {
    // @ts-ignore
    window.HTMLIFrameElement = class HTMLIFrameElement { };
}