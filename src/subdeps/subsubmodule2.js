var getTime = function (d) {
    if (!d || !(d instanceof Date) || !+d) {
        d = new Date;
    }

    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
};

module.exports = {
    getTime: getTime
};
