var domain = require('domain');

var domainHelper = {};

var defaultOption = {
    errorHandler: function(err){}, // 错误触发时的处理函数，一般打日志
    maxTimes: 100 // 触发异常最大的次数，超过此数目，主动结束进程
};

domainHelper.middleware = function(option){
    option = option || {};

    var errorHandler = option.errorHandler || defaultOption.errorHandler;
    var maxTimes = option.maxTimes || defaultOption.maxTimes;

    var times = 0;
    return function domainMiddleware(req, res, next) {
        var domainInstance = domain.create();
        domainInstance.add(req);
        domainInstance.add(res);
        domainInstance.on('error', function (err) {
            times++;

            if(times >= maxTimes)
            {
                process.exit(1); // 进程终止
                return;
            }

            errorHandler(err);
            next(err);
        });

        domainInstance.run(next);
    };
};

module.exports = domainHelper;
