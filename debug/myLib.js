// Generated by CoffeeScript 1.10.0
(function() {
  var slice = [].slice;

  window.PageAction = (function() {
    function PageAction() {}

    PageAction.prototype.fireAction = function() {};

    PageAction.prototype.getFireCondition = function() {
      return true;
    };

    PageAction.prototype.delayTime = 500;

    return PageAction;

  })();

  window.PageActionController = (function() {
    function PageActionController() {
      this.pageActions = [];
    }

    PageActionController.prototype.doAction = function() {};

    PageActionController.prototype.onFinished = function(result) {};

    PageActionController.prototype.onError = function(err) {};

    PageActionController.prototype.add = function() {
      var ele, eles, i, len, results;
      eles = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      results = [];
      for (i = 0, len = eles.length; i < len; i++) {
        ele = eles[i];
        results.push(this.pageActions.push(ele));
      }
      return results;
    };

    return PageActionController;

  })();

}).call(this);

//# sourceMappingURL=PageAction.js.map
// Generated by CoffeeScript 1.10.0

/*
依赖3个第三方类库
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PageActionControllerZ = (function(superClass) {
    extend(PageActionControllerZ, superClass);


    /*
    1 means Sequential execution
     */

    function PageActionControllerZ() {
      this.parallelCount = 1;
      PageActionControllerZ.__super__.constructor.call(this);
    }


    /*
    顺序执行pageAction
     */

    PageActionControllerZ.prototype.doAction = function() {
      return async.mapLimit(this.pageActions, this.parallelCount, function(ele, callback) {
        return myCommonToolsZ.fireActionByCusCondition(function() {
          return ele.getFireCondition();
        }, function() {
          var err, rT;
          err = null;
          rT = ele.fireAction();
          if (rT && rT[1]) {
            err = rT[0];
          }
          return callback(err, rT);
        }, null, ele.delayTime);
      }, function(err, result) {
        if (err) {
          onError(err);
          return;
        }
        return onFinished(result);
      });
    };

    return PageActionControllerZ;

  })(PageActionController);

}).call(this);

//# sourceMappingURL=PageActionControllerZ.js.map
// Generated by CoffeeScript 1.10.0

/*
  原素型的action
 */

(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  window.PageActionJQ = (function(superClass) {
    extend(PageActionJQ, superClass);

    function PageActionJQ(getElement, fireActionCus) {
      this.getElement = getElement;
      this.fireActionCus = fireActionCus;
    }


    /*
    对象实现
     */

    PageActionJQ.prototype.getElement = function() {};

    PageActionJQ.prototype.fireActionCus = function(ele) {};

    PageActionJQ.prototype.getFireCondition = function() {
      return this.getElement();
    };

    PageActionJQ.prototype.fireAction = function() {
      return this.fireActionCus(this.getElement());
    };

    return PageActionJQ;

  })(PageAction);

}).call(this);

//# sourceMappingURL=PageActionJQ.js.map
// Generated by CoffeeScript 1.10.0
(function() {
  window.myChromePlugTools = {
    privateKeyID: 'PRIVATE_KEY_ID',
    sendMsg: function(key, data, tabID) {
      if (tabID == null) {
        tabID = false;
      }
      data[this.privateKeyID] = key;
      if (tabID) {
        chrome.tabs.sendMessage(tabID, data);
        return;
      }
      return chrome.extension.sendMessage(data);
    },
    onReceiveKey: function(key, callback, NoMsgID) {
      if (NoMsgID == null) {
        NoMsgID = false;
      }
      return this.onReceive([key], callback, NoMsgID);
    },
    onReceive: function(keys, callback, NoMsgID) {
      var me;
      if (NoMsgID == null) {
        NoMsgID = false;
      }
      me = this;
      return chrome.extension.onMessage.addListener(function(obj, sender) {
        if (NoMsgID || keys.indexOf(obj[me.privateKeyID]) !== -1) {
          return callback(obj, sender, obj[me.privateKeyID]);
        }
      });
    }
  };

}).call(this);

//# sourceMappingURL=myChromePlugTools.js.map
// Generated by CoffeeScript 1.10.0
(function() {
  window.myCommonToolsZ = {
    fireActionByCusCondition: function(condionF, action, once, interval, delay) {
      var id;
      if (once == null) {
        once = true;
      }
      if (interval == null) {
        interval = 500;
      }
      if (delay == null) {
        delay = 100;
      }
      return id = setInterval(function() {
        if (condionF()) {
          if (once) {
            clearInterval(id);
          }
          return setTimeout(function() {
            return action();
          }, delay);
        }
      }, interval);
    }
  };

}).call(this);

//# sourceMappingURL=myCommonToolsZ.js.map
// Generated by CoffeeScript 1.10.0
(function() {
  window.myCommonUITools = {
    addButton: function(getPosition, handler, text) {
      var btnClass, button;
      btnClass = 'positionButtonMeZ';
      button = "<button class='" + btnClass + "'>" + text + "</button>";
      getPosition().prepend(button);
      return $("button." + btnClass).click(handler);
    },
    addDefaultButton: function(getPosition, handler, text) {
      var button, id;
      id = 'addDefaultButtonIdZ';
      button = "<button id='" + id + "'>" + text + "</button>";
      getPosition().prepend(button);
      return $("button\#" + id).click(handler);
    },
    addUrlDefault: function(url, text) {
      var ele;
      ele = "<a href='" + url + "' >" + text + "</a>";
      return $('body').prepend(ele);
    },
    setTextDefault: function(text) {
      var ele, id, textEle;
      id = "addTextDefaultDivIdZ";
      ele = "<div id = '" + id + "'>" + text + "</div>";
      textEle = $("div\#" + id);
      if (textEle.length === 0) {
        return $('body').prepend(ele);
      } else {
        textEle.html('');
        return textEle.html(text);
      }
    }
  };

}).call(this);

//# sourceMappingURL=myCommonUITools.js.map
