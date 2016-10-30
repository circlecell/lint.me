import MatreshkaArray from 'matreshka/array';

export default class Warnings extends MatreshkaArray {
    itemRenderer = `<pre class="alert alert-danger">{{ text }}</pre>`;
    constructor() {
        super()
            .bindNode({
                sandbox: '.warnings'
            });
    }
}
