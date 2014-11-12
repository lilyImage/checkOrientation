/**
 * 修改jquery的检测横竖屏为五依赖
 * 用法： 
 * （1）监听屏幕改变的事件
 * window.addEventListener("orientation:change",function(e){//e.detail获得横竖屏信息});
 * （2）获得横竖屏信息
 * CheckOrientation.getOri()
 */
var CheckOrientation = (function(){
    var getOri,
        last_orientation,
        initial_orientation_is_landscape,
        initial_orientation_is_default,
        portrait_map = { "0": true, "180": true },
        ww, wh, landscape_threshold;

    if(window.orientation !== undefined){
        ww = window.innerWidth || window.screen.width;
        wh = window.innerHeight || window.screen.height;
        landscape_threshold = 50;

        initial_orientation_is_landscape = ww > wh && ( ww - wh ) > landscape_threshold;
        initial_orientation_is_default = portrait_map[ window.orientation ];

        // (初始是横屏，方向是0或者180), *OR*
        // 初始是竖屏，方向是90或者-90, we
        //需要调整portrait_map
        if ( ( initial_orientation_is_landscape && initial_orientation_is_default ) || ( !initial_orientation_is_landscape && !initial_orientation_is_default ) ) {
          portrait_map = { "-90": true, "90": true };
        }
    }
      /**
       * 判断是横竖屏
       * @return {[type]} [description]
       */
    function getOri(){
        var isPortrait = true, elem = document.documentElement;

        if ( window.orientation !== undefined ) {
           
            isPortrait = portrait_map[ window.orientation ];
        } else {
            isPortrait = elem && elem.clientWidth / elem.clientHeight < 1.1;
        }

        return isPortrait ? "portrait" : "landscape";
    }

    last_orientation = getOri();

    function handler() {
        var orientation = getOri();
        if ( orientation !== last_orientation ) {
            last_orientation = orientation;

            
            var evt;
            if (window.CustomEvent) {
                evt = new window.CustomEvent('orientation:change', {
                    bubbles: true,
                    cancelable: true,
                    detail : last_orientation
                });
            } else {
                evt = document.createEvent('CustomEvent');
                evt.initCustomEvent('orientation:change', true, true,last_orientation);
            }
            window.dispatchEvent(evt);
            
        }
    }
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", handler, false); 
    return {
        getOri : getOri
    }
})();
