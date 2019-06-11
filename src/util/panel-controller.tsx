import * as React from 'react';
import * as ReactDOM from 'react-dom';

// TODO: add better typings here

export default class PanelController {
    App: any = null;
    instance: any = null;
    rootNode: HTMLDivElement = document.createElement('div');
    attachment: any = null;

    constructor(App: React.ReactNode) {
        this.App = App;

        // @ts-ignore
        ["show", "hide", "update"].forEach(fn => this[fn] = this[fn].bind(this));
    }

    show = (event: any) => {
        // @ts-ignore
        const { selection, root } = require("scenegraph");
        const App = this.App;

        this.attachment = event.node;
        this.attachment.appendChild(this.rootNode);

        if (!this.instance) {
            this.instance = ReactDOM.render(<App selection={selection} />, this.rootNode);
        }

        this.update(selection, root);
    }

    hide = () => {
        this.attachment.removeChild(this.rootNode);
    }

    update = (selection: any, root: any) => {
        if (this.instance.documentStateChanged) {
            this.instance.documentStateChanged(selection, root);
        }
    }
};