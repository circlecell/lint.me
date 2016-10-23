import 'babel-polyfill';
import chain from 'matreshka/chain';
import codeMirror from 'matreshka-binder-codemirror';
alert('fff');

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
    }
}

module.exports = new Application();
