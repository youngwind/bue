/**
 * Created by youngwind on 16/9/6.
 */

let lang = require('./lang');
let extend = lang.extend;

extend(exports, lang);
extend(exports, require('./dom'));
extend(exports, require('./debug'));
