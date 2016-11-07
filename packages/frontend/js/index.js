import 'babel-polyfill';
import MatreshkaObject from 'matreshka/object';
import html from 'matreshka/binders/html';
import codeMirror from 'matreshka-binder-codemirror';
import parseForm from 'matreshka-parse-form';
import linterPromise, { linterName } from './linter';
import Warnings from './warnings';

class Application extends MatreshkaObject {
    constructor() {
        super()
            .instantiate('warnings', Warnings)
            .on({
                'click::(.submit)': () => this.lint()
            });

        this.initialize();
    }

    async initialize() {
        const {
            contentType,
            settingsForm,
            settings
        } = await linterPromise;

        this
            .set({
                contentType,
                settingsForm,
                settings,
                linterName
            })
            .bindNode({
                sandbox: 'main',
                code: {
                    node: ':sandbox .code',
                    binder: codeMirror({
                        mode: contentType,
                        lineNumbers: true
                    })
                },
                linterName: {
                    node: ':sandbox .linter-name',
                    binder: html()
                }
            });


        this.nodes.sandbox.appendChild(parseForm(settings, settingsForm));
    }

    async lint() {
        const { code, settings } = this;
        try {
            const { warnings } = await (
                await fetch(`/api/lint/${linterName}`, {
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
