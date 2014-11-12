checkOrientation
================

##检测移动端横竖屏状态
 * （1）监听屏幕改变的事件
 * window.addEventListener("orientation:change",function(e){//e.detail获得横竖屏信息});
 * （2）获得横竖屏信息
 * CheckOrientation.getOri()