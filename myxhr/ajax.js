;var XHR =  function () {
  var xhr = '';
  if (typeof XMLHttpRequest != 'undefined') {
    xhr = new XMLHttpRequest();
  } else if(typeof ActiveXObject != 'undefined'){
    xhr = new ActiveXObject("Microsoft.XMLHTTP");
  }
  
  var ajax = function (options) {

    return new Promise((resolve, reject) => {
      
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(JSON.parse(xhr.responseText));
          }
        }
      }

      xhr.open(options.method, options.url, options.async);
      
      if(options.isCors) {
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', '*');
        xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      }
      
      var data = null;
      if(options.method === 'post' ||options.method === 'put') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        params = options.data || null;
      }
      
      xhr.send(data);
    })
  };
  
  return {
    axios: function (options) {
      return ajax(options);
    }
  }
}();
