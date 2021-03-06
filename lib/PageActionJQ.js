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
