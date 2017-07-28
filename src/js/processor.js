//渲染进度条

(function($,root){
    var $scope = $(document.body);
    var startTime;
    var curDuration;
    var frameId;
    var lastpercentage = 0;
    //转换时间
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time/60);
        var second = time - minute*60;
        if(minute<10){
            minute = '0' + minute;
        }
        if(second<10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    //渲染歌曲总时间
    function render(duration){
        lastpercentage = 0;
        curDuration = duration;
        var allTime = formatTime(duration);
        $scope.find('.all-time').text(allTime);
    }

    //渲染进度条
    function setprocessor(percentage){
        var percent =( percentage - 1)* 100 + '%';
        $scope.find('.pro-top').css({
            'transform':'translateX('+percent+')'
        })
    }

    //渲染当前时间和进度条
    function update (percentage){
        var currentTime = percentage * curDuration;
        var time = formatTime(currentTime);
        $scope.find('.current-time').text(time);
        setprocessor(percentage);
    }
    //开始进度渲染
    function start(percent){
        lastpercentage = percent === undefined ? lastpercentage : percent;
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percentage = lastpercentage +  (curTime - startTime) / (curDuration *1000)
            if(percentage<1){
                update(percentage);
               frameId =  requestAnimationFrame(frame);
            }else{
                    cancelAnimationFrame(frameId);
                }
        }
        frame();
    }
    //停止渲染
    function stop () {
        var curTime = new Date().getTime();
        var percentage = (curTime-startTime)/(1000 * curDuration);
        lastpercentage =lastpercentage + percentage;
        cancelAnimationFrame(frameId);
    }

    root.processor = {
        render:render,
        start:start,
        stop:stop,
        update:update
    }
}(window.Zepto,window.player||(window.player={})));