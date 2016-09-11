/**
 * Created by youngwind on 16/8/18.
 *
 */

import _ from './util';

function Bue(options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./instance/element'),
    ...require('./instance/bindings'),
    ...require('./instance/scope'),
    ...require('./api/lifecycle'),
    ...require('./api/data'),
    ...require('./api/dom')
};

Bue.options = {
    directives: {...require('./directives')}
};

module.exports = _.Bue = Bue;
