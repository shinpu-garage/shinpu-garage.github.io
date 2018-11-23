!function(s){"use strict";var n={},i=Array.prototype.slice,e=Object.prototype.toString,h=["Top","Right","Bottom","Left"],o=["Attachment","Color","Image","Repeat","Position","Size","Clip","Origin"];function c(t){this.$el=s(t),this.index=0,this.config=s.extend({},c.defaultConfig),this._setupBackgroundElement(),this._listenToResize()}s.fn.bgswitcher=function(){var i=arguments,e=c.keys.instance;return this.each(function(){var t=s.data(this,e);t||(t=new c(this),s.data(this,e,t)),t.dispatch.apply(t,i)})},s.fn.bgSwitcher=s.fn.bgswitcher,s.extend(c.prototype,{dispatch:function(t){switch(e.call(t)){case"[object Object]":this.setConfig(t);break;case"[object String]":this[t].apply(this,i.call(arguments,1));break;default:throw new Error("Please specify a Object or String")}},setConfig:function(t){this.config=s.extend(this.config,t),void 0!==this.config.random&&(this.config.shuffle=this.config.random),this.refresh()},setImages:function(t){this.imageList=new this.constructor.ImageList(t),this.config.shuffle&&this.imageList.shuffle()},setSwitchHandler:function(t){this.switchHandler=s.proxy(t,this)},getBuiltInSwitchHandler:function(t){return this.constructor.switchHandlers[t||this.config.effect]},refresh:function(){this.setImages(this.config.images),this.setSwitchHandler(this.getBuiltInSwitchHandler()),this._prepareSwitching(),this.config.start&&this.start()},start:function(){this._timerID||(this._timerID=setTimeout(s.proxy(this,"next"),this.config.interval))},stop:function(){this._timerID&&(clearTimeout(this._timerID),this._timerID=null)},toggle:function(){this._timerID?this.stop():this.start()},reset:function(){this.index=0,this._prepareSwitching()},next:function(){var t=this.imageList.count();(this.config.loop||this.index+1!==t)&&(++this.index===t&&(this.index=0),this.switching())},prev:function(){(this.config.loop||0!==this.index)&&(-1==--this.index&&(this.index=this.imageList.count()-1),this.switching())},select:function(t){-1===t&&(t=this.imageList.count()-1),this.index=t,this.switching()},switching:function(){var t=!!this._timerID;t&&this.stop(),this._createSwitchableElement(),this._prepareSwitching(),this.switchHandler(this.$switchable),t&&this.start()},destroy:function(){this.stop(),this._stopListeningToResize(),this.$switchable&&(this.$switchable.stop(),this.$switchable.remove(),this.$switchable=null),this.$bg&&(this.$bg.remove(),this.$bg=null),this.$el.removeAttr("style"),this.$el.removeData(this.constructor.keys.instance),this.$el=null},_adjustRectangle:function(){for(var t,i=0,e=h.length,s=this.$el.position(),n={top:s.top,left:s.left,width:this.$el.innerWidth(),height:this.$el.innerHeight()};i<e;i++)n["border"+(t=h[i])]=this.$el.css("border"+t);this.$bg.css(n)},_setupBackgroundElement:function(){this.$bg=s(document.createElement("div")),this.$bg.css({position:"absolute",zIndex:(parseInt(this.$el.css("zIndex"),10)||0)-1,overflow:"hidden"}),this._copyBackgroundStyles(),this._adjustRectangle(),"BODY"===this.$el[0].tagName?this.$el.prepend(this.$bg):(this.$el.before(this.$bg),this.$el.css("background","none")),this.$bg.css("background-size","cover"),this.$bg.css("background-color","#086f94"),this.$bg.css("opacity","0.7")},_createSwitchableElement:function(){this.$switchable&&this.$switchable.remove(),this.$switchable=this.$bg.clone(),this.$switchable.css({top:0,left:0,margin:0,border:"none"}),this.$switchable.appendTo(this.$bg)},_copyBackgroundStyles:function(){for(var t,i={},e=0,s=o.length,n="backgroundPosition";e<s;e++)i[t="background"+o[e]]=this.$el.css(t);void 0===i[n]&&(i[n]=[this.$el.css(n+"X"),this.$el.css(n+"Y")].join(" ")),this.$bg.css(i)},_listenToResize:function(){var t=this;this._resizeHandler=function(){t._adjustRectangle()},s(window).on("resize",this._resizeHandler)},_stopListeningToResize:function(){s(window).off("resize",this._resizeHandler),this._resizeHandler=null},_prepareSwitching:function(){this.$bg.css("backgroundImage",this.imageList.url(this.index))}}),c.keys={instance:"bgSwitcher"},c.defaultConfig={images:[],interval:4e3,start:!0,loop:!0,shuffle:!1,effect:"fade",duration:1e3,easing:"swing"},c.switchHandlers={fade:function(t){t.animate({opacity:0},this.config.duration,this.config.easing)},blind:function(t){t.animate({height:0},this.config.duration,this.config.easing)},clip:function(t){t.animate({top:parseInt(t.css("top"),10)+t.height()/2,height:0},this.config.duration,this.config.easing)},slide:function(t){t.animate({top:-t.height()},this.config.duration,this.config.easing)},drop:function(t){t.animate({left:-t.width(),opacity:0},this.config.duration,this.config.easing)},hide:function(t){t.hide()}},c.defineEffect=function(t,i){this.switchHandlers[t]=i},c.ImageList=function(t){this.images=t,this.createImagesBySequence(),this.preload()},s.extend(c.ImageList.prototype,{isSequenceable:function(){return"string"==typeof this.images[0]&&"number"==typeof this.images[1]&&"number"==typeof this.images[2]},createImagesBySequence:function(){if(this.isSequenceable()){for(var t=[],i=this.images[0],e=this.images[1],s=this.images[2];t.push(i.replace(/\.\w+$/,e+"$&")),++e<=s;);this.images=t}},preload:function(){for(var t,i=this.images.length,e=0;e<i;e++)t=this.images[e],n[t]||(n[t]=new Image,n[t].src=t)},shuffle:function(){var t,i,e=this.images.length,s=this.images.join();if(e){for(;e;)t=Math.floor(Math.random()*e),i=this.images[--e],this.images[e]=this.images[t],this.images[t]=i;this.images.join()===s&&this.shuffle()}},get:function(t){return this.images[t]},url:function(t){return"url("+this.get(t)+")"},count:function(){return this.images.length}}),s.BgSwitcher=c}(jQuery);