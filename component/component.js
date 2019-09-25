let toString = Object.prototype.toString;
class AXS {
  constructor () {
    
    this.root = $("#root");
    this.xFor();
    this.xBind();
    this.handleSrcAttr();
  }

  state = {
    rediu: 'aaaaa',
    slicelists: [{
      id: 1,
      title: 'jerer',
      src: 'b.jpg',
    }, {
      id: 2,
      title: 'yusadf',
      src: 'c.jpg',
    }]
  }

  xFor () {
    let domlist = this.root.find('[x-for]');

    domlist.each((ind, cur)=>{
      let aVal = $(cur).attr('x-for');
      let index = aVal.indexOf('in');
      
      let listParams = {
        itemName: aVal.substring(0, index).trim(),
        listAttr: aVal.substring(index+2).trim(),
      }
      $(cur).removeAttr('x-for');

      let listDatas = this.state[listParams.listAttr];
      var listTpl = listDatas.map((current, index) => {
        var itemTpl = cur.outerHTML;
        var reg = new RegExp('{{'+listParams.itemName+'(.*?)}}', 'gi');
        itemTpl = itemTpl.replace(reg, '{{current$1}}');
        itemTpl = this.handleXForTpl(itemTpl, listParams.itemName, current);
        return itemTpl;
      });
      listTpl = listTpl.join('');
      $(cur).parent().html(listTpl);
    });
  }

  xBind () {
    let domlist = this.root.find('[x-bind]');
    domlist.each((ind, cur) => {
      let aVal = $(cur).attr('x-bind');
      var index = aVal.indexOf('.');
      if(index>=0){
        aVal = aVal.substring(0, index).trim();
      }
      if(this.state[aVal]){
        $(cur).text(this.state[aVal]);
      } else{
        $(cur).text(this.state[aVal]);
      }
      $(cur).removeAttr('x-bind');
    });
  }

  handleXForTpl (itemTpl, attrName, current) {
    var tpl = '';
    tpl = itemTpl;
    var matchList = tpl.match(/{{current.*?}}/gi);

    matchList && matchList.forEach((c, i)=>{
      var reg2 = new RegExp(c, 'gi');
      c = c.slice(2, -2);
      c = this.stringToObj(c, current);
      tpl = tpl.replace(reg2, c);
    });
    return tpl;
  }

  handleSrcAttr (val){
    let attrs = this.root.find('[x-src]');
    attrs.each((index, current) => {
      let src = $(current).attr('x-src');
      let objItem = src && src.replace(/{{(.*)?\.(.*)}}/gi, '$1');
      let str = src && src.replace(/{{(.*)}}/gi, '$1');
      if(src.indexOf('}}') < 0){
        $(current).removeAttr('x-src');
        $(current).attr('src', src);
        return;
      }
      if(/{{(.*)?}}/gi.test(src)){
        if(val){
          $(current).attr('src', val);
        } else if(this.state[objItem]){
          let srcV = stringObj(str, this.state[objItem]);
          $(current).attr('src', srcV);
        }
      }
    });
  }

  stringToObj (str, obj) {
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

  isArray(val) {
    return toString.call(val) === '[object Array]';
  }

  isString(val) {
    return typeof val === 'string';
  }

  isObject(val) {
    return val !== null && typeof val === 'object';
  }
}
new AXS();