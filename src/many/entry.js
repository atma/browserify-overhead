var submodules = {
        a: require('./a'),
        b: require('./b'),
        c: require('./c'),
        d: require('./d'),
        e: require('./e'),
        f: require('./f'),
        g: require('./g'),
        h: require('./h'),
        i: require('./i'),
        j: require('./j'),
        k: require('./k'),
        l: require('./l'),
        m: require('./m'),
        n: require('./n'),
        o: require('./o'),
        p: require('./p'),
        q: require('./q')
    },
    names = [],
    el = document.createElement('pre');

for (var mod in submodules) {
    if (submodules.hasOwnProperty(mod)) {
        names.push(submodules[mod].getName());
    }
}

el.innerHTML  = names.join(', ');
document.body.appendChild(el);
