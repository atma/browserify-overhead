var stringRepeat = function (str, times) {
    var buf = [];

    if (!times || times < 1) {
        return str;
    }

    while(buf.length < times) {
        buf.push(str);
    }

    return buf.join('');
};

module.exports = {
    stringRepeat: stringRepeat
};
