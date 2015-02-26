var submodule = require('./submodule'),
    result,
    el = document.createElement('pre');

result = submodule.getDateTime();
el.innerHTML = 'date and time: ' + result;

document.body.appendChild(el);
