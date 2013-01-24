var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Amoeba.PaginatedCollection = (function(_super) {

  __extends(PaginatedCollection, _super);

  function PaginatedCollection() {
    return PaginatedCollection.__super__.constructor.apply(this, arguments);
  }

  PaginatedCollection.prototype.urlPageQuery = 'page';

  PaginatedCollection.prototype.hasMorePages = function() {
    return _.result(this, 'nextPage') != null;
  };

  PaginatedCollection.prototype.fetchNextPage = function(options) {
    var appendChar, query, url;
    if (options == null) {
      options = {};
    }
    url = _.result(this, 'url');
    query = "" + this.urlPageQuery + "=" + (_.result(this, 'nextPage'));
    appendChar = !~url.indexOf('?') ? '?' : '&';
    _.extend(options, {
      url: "" + url + appendChar + query,
      update: true,
      remove: false
    });
    return this.fetch(options);
  };

  return PaginatedCollection;

})(Backbone.Collection);
