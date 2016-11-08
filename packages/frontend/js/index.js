import 'babel-polyfill';
import MatreshkaObject from 'matreshka/object';
import html from 'matreshka/binders/html';
import codeMirror from 'matreshka-binder-codemirror';
import parseForm from 'matreshka-parse-form';
import linterPromise, { linterName } from './linter';
import Results from './results';

class Application extends MatreshkaObject {
    constructor() {
        super()
            .instantiate('results', Results)
            .on({
                'submit::form': (evt) => {
                    evt.preventDefault();
                    this.lint();
                },
                'reset::form': (evt) => {
                    evt.preventDefault();
                    this.code = '';
                }
            });

        this.initialize();
    }

    async initialize() {
        const {
            contentType,
            settingsFields,
            settings
        } = await linterPromise;

        this
            .set({
                contentType,
                settings,
                linterName
            })
            .bindNode({
                sandbox: 'main',
                form: ':sandbox .lint-form',
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


        this.nodes.form.appendChild(parseForm(settings, settingsFields));
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

            this.results = warnings;
        } catch (e) {
            console.error(e);
        }
    }
}

module.exports = new Application();
