var getDate = function (d) {
    if (!d || !(d instanceof Date) || !+d) {
        d = new Date;
    }

    return d.getFullYear() + ':' + (d.getMonth()+1) + ':' + d.getDate();
};

module.exports = {
    getDate: getDate
};
