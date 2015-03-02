var submodule = require('./submodule'),
    resultString,
    resultPath,
    srcString = 'abc',
    el = document.createElement('pre');

resultString = submodule.stringRepeat(srcString, 3);
resultPath = resultString + '/' + 'xyz';

el.innerHTML = 'path: ' + resultPath;

document.body.appendChild(el);
