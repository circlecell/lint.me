import 'babel-polyfill';
import chain from 'matreshka/chain';
import codeMirror from 'matreshka-binder-codemirror';
import parseForm from 'matreshka-parse-form';
import linterPromise from './linter';

class Application {
    constructor() {
        chain(this)
            .bindNode({
                sandbox: 'body',
                code: {
                    node: ':sandbox .code',
                    binder: codeMirror({
                        lineNumbers: true
                    })
                }
            })
            .on({
                'click::(.submit)': evt => this.lint()
            });

        this.initialize();
    }

    async initialize() {
        const {
            contentType,
            lint,
            settingsForm,
            settings
        } = await linterPromise;

        this.settings = settings;

        document.body.appendChild(parseForm(this.settings, settingsForm));
    }

    async lint() {
        const { code, settings } = this;
        try {
            const resp = await (
                await fetch('/lint/html', {
                    method: 'post',
                    body: JSON.stringify({ code, settings }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
            ).json();

            console.log(resp);
        } catch(e) {
            console.error(e);
        }
    }
}

module.exports = new Application();
