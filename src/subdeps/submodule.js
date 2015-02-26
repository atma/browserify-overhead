var dateMod = require('./subsubmodule1'),
    timeMod = require('./subsubmodule2');

var getDateTime = function () {
    var now = new Date;

    return dateMod.getDate(now) + ' ' + timeMod.getTime(now);
};

module.exports = {
    getDateTime: getDateTime
};
