import MatreshkaArray from 'matreshka/array';
import display from 'matreshka/binders/display';

export default class Results extends MatreshkaArray {
    itemRenderer = '<pre class="results-item">{{ text }}</pre>';
    constructor() {
        super()
            .set({
                noWarnings: false
            })
            .bindNode({
                sandbox: '.results',
                noWarnings: {
                    node: ':sandbox .results-no-warnings',
                    binder: display(true)
                }
            });
    }
}
