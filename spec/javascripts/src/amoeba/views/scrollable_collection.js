var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Amoeba.View.ScrollableCollection = (function(_super) {

  __extends(ScrollableCollection, _super);

  ScrollableCollection.prototype.loading = false;

  ScrollableCollection.prototype.padding = 100;

  function ScrollableCollection() {
    this.onLoad = __bind(this.onLoad, this);

    this.onScroll = __bind(this.onScroll, this);
    ScrollableCollection.__super__.constructor.apply(this, arguments);
    $(window).on("scroll." + this.cid, this.onScroll);
  }

  ScrollableCollection.prototype.onScroll = function() {
    var elBottom, elHeight, elOffset, scrollTop, winBottom, winHeight;
    if (!this.rendered || this.loading) {
      return true;
    }
    winHeight = $(window).height();
    scrollTop = $(window).scrollTop();
    winBottom = winHeight + scrollTop;
    elHeight = this.$el.height();
    elOffset = this.$el.offset().top;
    elBottom = elHeight + elOffset;
    if (elBottom + this.padding < winBottom && this.collection.hasMorePages()) {
      this.loading = true;
      return this.collection.fetchNextPage({
        success: this.onLoad,
        error: this.onLoad
      });
    }
  };

  ScrollableCollection.prototype.onLoad = function() {
    return this.loading = false;
  };

  return ScrollableCollection;

})(Amoeba.View.Collection);
