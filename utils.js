;var Utils = (function(){
  
  var setCookie = function(key,value, expiredays){
    var Days = expiredays || 1;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = key + '=' + value + ';expires=' + exp.toGMTString()+';path=/;domain=.rakuten.co.jp';
  }
  var getCookie = function(key) {
    if (document.cookie.length>0){
      c_start=document.cookie.indexOf(key + '=');
      if (c_start!=-1){ 
        c_start=c_start + key.length + 1;
        c_end=document.cookie.indexOf(';',c_start);
        if (c_end==-1){
          c_end=document.cookie.length;
        }
        return document.cookie.substring(c_start,c_end);
      } 
    }
    return '';
  }
  var removeCookie = function (key) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(key);
    if(cval!=null){
      document.cookie= key + '='+cval+';expires='+exp.toGMTString()+';path=/;domain=.rakuten.co.jp';
    }
  }
  
  // compare two array
  var arrEqual = function (arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length != arr2.length) return false;
    for (var i=0, len = arr1.length; i < len; i++) {
      if (arr1[i] !== arr2[]i) return false;
    }
    return true;
  }
  
  // get version and type of the current browser;
  var getBrowser = function () {
    var sys = {};
    var ua = navigator.userAgent.toLowerCase();
    var s;
    
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
      (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
      (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
      (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
      (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
      (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
      (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    
    if (sys.ie) return {browser: 'IE', 'type': sys.ie};
    if (sys.edge) return {browser: 'EDGE', 'type': sys.edge};
    if (sys.firefox) return {browser: 'Firefox', 'type': sys.firefox};
    if (sys.chrome) return {browser: 'Chrome', 'type': sys.chrome};
    if (sys.opera) return {browser: 'Opera', 'type': sys.opera};
    if (sys.safari) return {browser: 'Safari', 'type': sys.safari};
    
    return 'Unkonwn';
  }
  
  var getOs = function () {
    var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';
    if (/android/i.test(userAgent)) return 'android';
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
    if (/mac/i.test(appVersion)) return 'MacOSX';
    if (/win/i.test(appVersion)) return 'windows';
    if (/linux/i.test(appVersion)) return 'linux';
    
  }
  
  // get the distance that scrollbar to the page's top 
  var getScrollTop = function () {
    return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  }
  
  var getOffset = function (ele) {
    var pos = {
      left: 0,
      top: 0
    };
    
    while (ele) {
      pos.left += ele.offsetLeft;
      pos.top += ele.offsetTop;
      ele = ele.offsetParent;
    };
    return pos;
  }
  
  /**
   * @description 函数节流
   * @param {Number} delay 0 或者更大的毫秒数,对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
   * @param {Boolean} noTrailing 可选，默认为false。
   *  如果noTrailing为true，当节流函数被调用，每过`delay`毫秒`callback`也将执行一次。
   *  如果noTrailing为false或者未传入，`callback`将在最后一次调用节流函数后再执行一次.
   *  （延迟`delay`毫秒之后，节流函数没有被调用,内部计数器会复位） 
   * @param {Object} callback  延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，执行去节流功能时，调用`callback`。
   * @param {Object} debounceMode 如果`debounceMode`为true，`clear`在`delay`ms后执行。
   *     如果debounceMode是false，`callback`在`delay` ms之后执行。
   */
  var throttle = function (delay, noTrailing, callback, debounceMode) {
    var timeoutID;
    var lastExec = 0;
    if (typeof noTrailing !== 'boolean') {
        debounceMode = callback;
        callback = noTrailing;
        noTrailing = undefined;
    }
    function wrapper() {
      var self = this;
      var elapsed = Number(new Date()) - lastExec;
      var args = arguments;
      // Execute `callback` and update the `lastExec` timestamp.
      function exec() {
        lastExec = Number(new Date());
        callback.apply(self, args);
      }
      function clear() {
        timeoutID = undefined;
      }
      if (debounceMode && !timeoutID) {
        exec();
      }
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      if (debounceMode === undefined && elapsed > delay) {
        exec();
      } else if (noTrailing !== true) {
        timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
      }
    }
    return wrapper;
  };
  
  /**
  * @desc 函数防抖 
  * 与throttle不同的是，debounce保证一个函数在多少毫秒内不再被触发，只会执行一次，
  * 要么在第一次调用return的防抖函数时执行，要么在延迟指定毫秒后调用。
  * @example 适用场景：如在线编辑的自动存储防抖。
  * @param  {Number}   delay     0或者更大的毫秒数。 对于事件回调，大约100或250毫秒（或更高）的延迟是最有用的。
  * @param  {Boolean}  atBegin   可选，默认为false。
  *  如果`atBegin`为false或未传入，回调函数则在第一次调用return的防抖函数后延迟指定毫秒调用。
  *  如果`atBegin`为true，回调函数则在第一次调用return的防抖函数时直接执行
  * @param  {Function} callback  延迟毫秒后执行的函数。`this`上下文和所有参数都是按原样传递的，
  *  执行去抖动功能时，，调用`callback`。
  * @return {Function} 新的防抖函数。
  */
  var debounce = function (delay, atBegin, callback) {
    return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
  };
  
  var deepClone = function (values) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == values || "object" != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
      copy = new Date();
      copy.setTime(values.getTime());
      return copy;
    }
    // Handle Array
    if (values instanceof Array) {
      copy = [];
      for (var i = 0, len = values.length; i < len; i++) {
        copy[i] = deepClone(values[i]);
      }
      return copy;
    }
    // Handle Object
    if (values instanceof Object) {
      copy = {};
      for (var attr in values) {
        if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
      }
      return copy;
    }
    throw new Error("Unable to copy values! Its type isn't supported.");
  }
  
  var isEmptyObject = function (obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
      return false;
    return !Object.keys(obj).length;
  }
  
  var isEmail = function () {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
  }
  
  var isIdCard = function () {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
  }
  
  // 数字金额转中文汉字
  var digitUppercase = function (n) {
    var fraction = ['角', '分'];
    var digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ];
    var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  };
  
  var isLeapYear = function (year) {
    if (0 === year % 4 && (year % 100 !== 0 || year % 400 === 0)) {
      return true
    }
    return false;
  }
  
  var parseUrlParams = function (url) {
    url = !url ? window.location.href : url;
    if(url.indexOf('?') === -1) {
      return {};
    }
    var search = url[0] === '?' ? url.substr(1) : url.substring(url.lastIndexOf('?') + 1);
    if (search === '') {
      return {};
    }
    search = search.split('&');
    var query = {};
    for (var i = 0; i < search.length; i++) {
      var pair = search[i].split('=');
      query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
  }
  var stringToObj = function (str, obj) {
    str = str.split('.');
    if (str.length < 2) {
      return str;
    }
    var result = obj;
    for(var i=1,l=str.length; i<l; i++) {
      result = result[str[i]];
    }
    return result;
  }
  
  return {
    setCookie: setCookie,
    getCookie: getCookie,
    removeCookie: removeCookie,
    arrEqual: arrEqual,
    getBrowser: getBrowser,
    getOs: getOs,
    getScrollTop: getScrollTop,
    getOffset: getOffset,
    throttle: throttle,
    debounce: debounce,
    deepClone: deepClone,
    isEmptyObject: isEmptyObject,
    isEmail: isEmail,
    isIdCard: isIdCard,
    digitUppercase: digitUppercase,
    isLeapYear: isLeapYear,
    parseUrlParams: parseUrlParams
  }
})();
