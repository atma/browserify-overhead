var _ = require('lodash'),
    result = _.uniq([{x: 1}, {x: 2}, {x: 1}], 'x'),
    el = document.createElement('pre');

el.innerHTML = _.map(result, function (m) {
    return 'x: ' + m.x;
}).join(', ');

document.body.appendChild(el);
