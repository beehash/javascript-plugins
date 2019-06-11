# javascript-plugins
there is some javascript plugins created by me;

# pops

# 弹出一个消息提示框

options:{

 type: [alert | comfirm] string
 
 popText: 弹窗文字 string
 
 showClose: 是否显示关闭按钮 boolean
 
 };
 
 Popup.alert(options)
 
# 关闭弹窗：
 popup.close()


# myxhr
原生javascript写的异步请求封装，实现类似axios的功能。

options: {
  method: [get | post | put | head | delete | head | connect],
  url: url
}

# 使用方法
```
XHR.axios({
  method: method,
  url: url,
}).then(function (data) {
  console.log(data.success);
}, function(data) {
  console.log(2333333, data);
});
}
```
