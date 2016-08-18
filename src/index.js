/**
 * Created by youngwind on 16/8/18.
 */

function Bue (options) {
    this._init(options);
}

Bue.prototype = {
    constructor: Bue,
    ...require('./instance/init'),
    ...require('./instance/compile'),
    ...require('./api/lifecycle')
};

module.exports = Bue;
