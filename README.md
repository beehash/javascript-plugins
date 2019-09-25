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

# Utils 
一些常用的工具包
创建获取删除cookie等的方法， 获取和判断当前浏览器或操作系统， 常用的函数节流和防抖。等

# COMPONENMT
我仿照vue开发的新指令 x-for, x-bind, {{}}, x-src
为方便读取和更新数据，所有的数据，在this.state中，我之后会改良下数据的嵌入方式。

特点，无需使用框架模式写法，直接引入文件即可。

# x-for : 仿照vue的v-for 指令，用法相差不大，参考component/component.html用法
```
<li x-for="item in relaxList">
<img x-src="{{item.img}}"/>
<p class="img-desc">
  {{item.desc}}
</p>
<!--any things you want to add, it's freedom-->
</li>
```
x-bind: 页面中直接使用这个指令就好

x-src: 使用这个指令添加动态值

{{}}: 页面直接使用这个语法可以直接嵌入你想要输入的变量值。方便管理数据。


