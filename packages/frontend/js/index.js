import 'babel-polyfill';
import chain from 'matreshka/chain';
import codeMirror from 'matreshka-binder-codemirror';
import parseForm from 'matreshka-parse-form';
import linterPromise from './linter';
import Warnings from './warnings';

class Application {
    constructor() {
        chain(this)
            .instantiate('warnings', Warnings)
            .bindNode({
                sandbox: 'body',
                code: {
                    node: ':sandbox .code',
                    binder: codeMirror({ lineNumbers: true })
                }
            })
            .on({
                'click::(.submit)': () => this.lint()
            });

        this.initialize();
    }

    async initialize() {
        const {
            // contentType,
            settingsForm,
            settings
        } = await linterPromise;

        this.settings = settings;

        document.body.appendChild(parseForm(this.settings, settingsForm));
    }

    async lint() {
        const { code, settings } = this;
        try {
            const { warnings } = await (
                await fetch('/lint/html', {
                    method: 'post',
                    body: JSON.stringify({ code, settings }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            ).json();

            this.warnings = warnings;
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new Application();
