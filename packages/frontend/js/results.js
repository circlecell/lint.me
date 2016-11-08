import MatreshkaArray from 'matreshka/array';

export default class Results extends MatreshkaArray {
    itemRenderer = '<pre class="results-item">{{ text }}</pre>';
    constructor() {
        super()
            .bindNode({
                sandbox: '.results'
            });
    }
}
