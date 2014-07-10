
module.exports = function(pagerun){
    var self = this;
    var bOpenUrl = false;
    pagerun.on('proxyStart', function(msg){
        var proxy = msg.proxy;
        proxy.addFilter(function(httpData, next){
            if(bOpenUrl === true && httpData.type === 'response'){
                self.info({
                    url: httpData.url,
                    type: httpData.responseType,
                    header: httpData.responseHeaders,
                    data: httpData.responseData.toString('base64'),
                    time: httpData.responseTimes
                });
            }
            next();
        });
    });
    pagerun.on('webdriverOpenUrl', function(){
        bOpenUrl = true;
    });
};