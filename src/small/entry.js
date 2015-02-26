var submodule = require('./submodule'),
    path = require('path'),
    resultString,
    resultPath,
    srcString = 'abc',
    el = document.createElement('pre');

resultString = submodule.stringRepeat(srcString, 3);
resultPath = path.join(resultString, 'xyz');

el.innerHTML = 'path: ' + resultPath;

document.body.appendChild(el);
