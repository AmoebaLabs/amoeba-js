(function() {

  window.Amoeba = {
    version: '0.2.0',
    Collection: {}
  };

}).call(this);

(function() {

  Amoeba.log = function(ln) {
    if (!Amoeba.DEBUG) {
      return false;
    }
    console.log(ln);
    return true;
  };

}).call(this);

(function() {

  Amoeba.Util = {
    appendQueryParam: function(url, param) {
      var appendChar;
      appendChar = !~url.indexOf('?') ? '?' : '&';
      return "" + url + appendChar + param;
    }
  };

}).call(this);

(function() {
  var methodMap;

  methodMap = {
    create: 'POST',
    update: 'PUT',
    patch: 'PATCH',
    "delete": 'DELETE',
    read: 'GET'
  };

  Backbone.originalSync = Backbone.sync;

  Backbone.sync = function(method, model, options) {
    var data, _ref;
    if (options == null) {
      options = {};
    }
    if (model && (method === 'create' || method === 'update' || method === 'patch')) {
      if ((_ref = options.data) == null) {
        options.data = {};
      }
      data = {};
      if (model.paramRoot) {
        data[model.paramRoot] = model.toJSON(options);
      } else {
        data = model.toJSON(options);
      }
      options.contentType = 'application/json';
      options.data = JSON.stringify(_.extend(options.data, data));
    }
    return Backbone.originalSync(method, model, options);
  };

}).call(this);

(function() {

  Amoeba.Helpers = (function() {

    Helpers.helpers = [];

    function Helpers() {
      var methods, _i, _len, _ref;
      _ref = this.constructor.helpers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        methods = _ref[_i];
        this.extractHelper(methods);
      }
    }

    Helpers.prototype.extractHelper = function(methods) {
      var method, name, _results;
      _results = [];
      for (name in methods) {
        method = methods[name];
        _results.push(this[name] = method.bind(this));
      }
      return _results;
    };

    Helpers.register = function(helper) {
      return this.helpers.push(helper);
    };

    return Helpers;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Amoeba.Router = (function(_super) {

    __extends(Router, _super);

    function Router() {
      return Router.__super__.constructor.apply(this, arguments);
    }

    Router.prototype.render = function(partial, options) {
      var view;
      if (options == null) {
        options = {};
      }
      view = Amoeba.app.lookupContext.find(partial);
      return Amoeba.app.currentView = this.currentView = new view(options);
    };

    Router.prototype.removeCurrentView = function() {
      var _ref;
      if ((_ref = this.currentView) != null) {
        if (typeof _ref.remove === "function") {
          _ref.remove();
        }
      }
      return this.currentView = void 0;
    };

    return Router;

  })(Backbone.Router);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Amoeba.Template = (function() {

    function Template(template) {
      var _this = this;
      this.template = template;
      this.render = __bind(this.render, this);

      return function(object) {
        if (object == null) {
          object = {};
        }
        return _this.template(_.extend(object, {
          render: _this.render,
          helpers: Amoeba.app.helpers
        }));
      };
    }

    Template.prototype.render = function(template, options) {
      var item, result, _ref;
      if (options == null) {
        options = {};
      }
      if ((_ref = options.locals) == null) {
        options.locals = {};
      }
      if (options.collection) {
        result = (function() {
          var _i, _len, _ref1, _results,
            _this = this;
          _ref1 = options.collection;
          _results = [];
          for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            item = _ref1[_i];
            _results.push((function(item) {
              var object;
              object = {};
              object[template] = item;
              _.extend(object, options.locals);
              return _this._render(template, object);
            })(item));
          }
          return _results;
        }).call(this);
        return result.join('');
      } else {
        return this._render(template, options.locals);
      }
    };

    Template.prototype._render = function(template, object) {
      template = JST["" + Amoeba.app.templatePath + "/" + template];
      if (!template) {
        throw "" + Amoeba.app.templatePath + "/" + template + " does not exist";
      }
      return new Amoeba.Template(template)(object);
    };

    return Template;

  })();

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Amoeba.View = (function(_super) {

    __extends(View, _super);

    function View(options) {
      if (options == null) {
        options = {};
      }
      this.locals = options.locals || {};
      this.parent = options.parent;
      if (this.template) {
        this.template = new Amoeba.Template(this.template);
      }
      this.helpers = Amoeba.app.helpers;
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype._render = function(partial, options) {
      var view;
      if (options == null) {
        options = {};
      }
      options.parent = this;
      view = Amoeba.app.lookupContext.find(partial);
      return new view(options);
    };

    return View;

  })(Backbone.View);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Amoeba.View.Collection = (function(_super) {

    __extends(Collection, _super);

    Collection.prototype.subView = Amoeba.View;

    function Collection(options) {
      var _ref;
      if (options == null) {
        options = {};
      }
      this.removeModel = __bind(this.removeModel, this);

      this.addModel = __bind(this.addModel, this);

      this.extractSubView = __bind(this.extractSubView, this);

      this.render = __bind(this.render, this);

      this.subviews = [];
      if ((_ref = options.subView) == null) {
        options.subView = {};
      }
      this.subView = options.subView.partial || this.subView;
      Collection.__super__.constructor.call(this, options);
      this.listenTo(this.collection, 'add', this.addModel);
      this.listenTo(this.collection, 'remove', this.removeModel);
    }

    Collection.prototype.render = function() {
      if (this.rendered) {
        return;
      }
      this.extractSubViews();
      if (this.subviews.length) {
        this.$el.html(this.renderSubViews());
      }
      this.rendered = true;
      this.trigger('render');
      return this;
    };

    Collection.prototype.refresh = function() {
      this.subviews = [];
      this.rendered = false;
      this.collection.fetch({
        success: this.render,
        silent: true
      });
      return this;
    };

    Collection.prototype.extractSubViews = function() {
      return this.collection.each(this.extractSubView);
    };

    Collection.prototype.extractSubView = function(model) {
      var subview;
      subview = this._render(this.subView, _.extend(this.options.subView, {
        model: model
      }));
      this.subviews.push(subview);
      return subview;
    };

    Collection.prototype.renderSubViews = function() {
      var fragment,
        _this = this;
      fragment = document.createDocumentFragment();
      _.each(this.subviews, function(subview) {
        return fragment.appendChild(subview.render().el);
      });
      return fragment;
    };

    Collection.prototype.addModel = function(model) {
      var subview;
      subview = this.extractSubView(model);
      if (this.rendered) {
        this.$el.append(subview.render().el);
        return this.trigger('render');
      }
    };

    Collection.prototype.removeModel = function(model) {
      var subviewToRemove;
      subviewToRemove = _.select(this.subviews, function(subview) {
        return subview.model.id === model.id;
      })[0];
      if (subviewToRemove) {
        this.subviews = _.without(this.subviews, subviewToRemove);
        if (this.rendered) {
          return subviewToRemove.remove();
        }
      }
    };

    return Collection;

  })(Amoeba.View);

}).call(this);

(function() {
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
      if (!this.rendered || this.loading) {
        return true;
      }
      if (this.needsToLoad() && this.collection.hasMorePages()) {
        this.loading = true;
        return this.collection.fetchNextPage({
          success: this.onLoad,
          error: this.onLoad
        });
      }
    };

    ScrollableCollection.prototype.needsToLoad = function() {
      var elBottom, elHeight, elOffset, scrollTop, winBottom, winHeight;
      winHeight = $(window).height();
      scrollTop = $(window).scrollTop();
      winBottom = winHeight + scrollTop;
      elHeight = this.$el.height();
      elOffset = this.$el.offset().top;
      elBottom = elHeight + elOffset;
      return elBottom + this.padding < winBottom;
    };

    ScrollableCollection.prototype.onLoad = function() {
      return this.loading = false;
    };

    return ScrollableCollection;

  })(Amoeba.View.Collection);

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Amoeba.View.PaginatedCollection = (function(_super) {

    __extends(PaginatedCollection, _super);

    PaginatedCollection.prototype.collectionView = Amoeba.View.Collection;

    function PaginatedCollection(options) {
      if (options == null) {
        options = {};
      }
      this.removeModel = __bind(this.removeModel, this);

      this.addModel = __bind(this.addModel, this);

      this.removePage = __bind(this.removePage, this);

      this.renderPage = __bind(this.renderPage, this);

      this.pages = {};
      this.currentPage = options.page || 1;
      this.collectionView = options.collectionView || this.collectionView;
      this.container = options.container;
      this.listenTo(this.container, 'removePage', this.removePage);
      this.listenTo(this.container, 'remove', this.removeModel);
      this.listenTo(this.container, 'add', this.addModel);
      PaginatedCollection.__super__.constructor.call(this, options);
    }

    PaginatedCollection.prototype.renderPage = function(page, collection) {
      var $pageEl;
      if (!this.pages[page]) {
        this.createPage(page, collection);
      }
      if (this.pages[page].rendered) {
        return;
      }
      $pageEl = this.getPageEl(page);
      if ($pageEl.length) {
        $pageEl.removeClass('hide');
      } else {
        $pageEl = this.pages[page].view.render().$el.addClass("page-" + page);
        this.$el.append($pageEl);
      }
      if (page !== this.currentPage) {
        if (this.pages[this.currentPage]) {
          this.getPageEl(this.currentPage).addClass('hide');
          this.pages[this.currentPage].rendered = false;
        }
        this.currentPage = page;
      }
      this.pages[page].rendered = true;
      this.trigger('renderPage', page);
      return this;
    };

    PaginatedCollection.prototype.refresh = function(page, options) {
      var success,
        _this = this;
      if (page == null) {
        page = this.currentPage;
      }
      if (options == null) {
        options = {};
      }
      if (this.pages[page]) {
        this.pages[page].rendered = false;
        if (this.pages[page].collection.dirty) {
          this.removePage(page);
        }
      }
      success = options.success;
      _.extend(options, {
        silent: true,
        success: function(collection) {
          _this.renderPage(page, collection);
          return typeof success === "function" ? success(page) : void 0;
        }
      });
      this.container.fetch(page, options);
      return this;
    };

    PaginatedCollection.prototype.removePage = function(page) {
      if (!this.pages[page]) {
        return this;
      }
      this.pages[page].view.remove();
      delete this.pages[page];
      return this;
    };

    PaginatedCollection.prototype.addModel = function(page, model) {};

    PaginatedCollection.prototype.removeModel = function(page, model) {};

    PaginatedCollection.prototype.createPage = function(page, collection) {
      return this.pages[page] = {
        collection: collection,
        view: this._render(this.collectionView, _.extend(this.options, {
          collection: collection
        })),
        rendered: false
      };
    };

    PaginatedCollection.prototype.getPageEl = function(page) {
      return this.$(".page-" + page);
    };

    return PaginatedCollection;

  })(Amoeba.View);

}).call(this);

(function() {

  Backbone.History.prototype.hasUrl = function(fragment) {
    return _.any(this.handlers, function(handler) {
      return handler.route.test(fragment);
    });
  };

}).call(this);

(function() {

  Amoeba.LookupContext = (function() {

    function LookupContext(viewPath) {
      this.viewPath = viewPath;
    }

    LookupContext.prototype.getNamespaces = function(path) {
      return path.split('.');
    };

    LookupContext.prototype.recurse = function(base, path) {
      var namespace, namespaces, _i, _len;
      if (!base) {
        return void 0;
      }
      if (!path.length) {
        return base;
      }
      namespaces = this.getNamespaces(path);
      for (_i = 0, _len = namespaces.length; _i < _len; _i++) {
        namespace = namespaces[_i];
        if (base[namespace]) {
          base = base[namespace];
        } else {
          base = void 0;
          break;
        }
      }
      return base;
    };

    LookupContext.prototype.findFromViewPath = function(viewPath, context) {
      var base, namespaces;
      if (context == null) {
        context = window;
      }
      namespaces = this.getNamespaces(viewPath);
      base = namespaces.shift();
      return this.recurse(context[base], namespaces.join('.'));
    };

    LookupContext.prototype.find = function(template, context) {
      var view;
      if (!template) {
        throw "A template is required";
      }
      if (typeof template !== 'string') {
        return template;
      }
      if (this.viewPath) {
        view = this.recurse(this.viewPath, template);
      } else {
        view = this.findFromViewPath(template, context);
      }
      if (!view) {
        throw "Cannot find template " + template;
      }
      return view;
    };

    return LookupContext;

  })();

}).call(this);

(function() {
  var moduleKeywords,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  moduleKeywords = ['extended', 'included'];

  Amoeba.Module = (function() {

    function Module() {}

    Module.extend = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((_ref = obj.extended) != null) {
        _ref.apply(this);
      }
      return this;
    };

    Module.include = function(obj) {
      var key, value, _ref;
      for (key in obj) {
        value = obj[key];
        if (__indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((_ref = obj.included) != null) {
        _ref.apply(this);
      }
      return this;
    };

    return Module;

  })();

}).call(this);


/*
App is the main object. Think of it like a container for your application settings, helpers, and
routers, as well as a way to automatically initialize and configure Backbone. It's important not to
try and {Amoeba.App.start} the App instance until you're certain the rest of your code (views, etc) are ]
already defined, and jQuery is ready.

See the {#constructor} documentation for specific options.

@example Create a new App and initialize it after jQuery loads
  class MySite.App extends Amoeba.App
    initialize: ->
      @myRouter = new MySite.MyRouter()

  jQuery ($) ->
    MySite.app = MySite.App.start
      pushState: true
      viewPath: MySite.Views
*/


(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Amoeba.App = (function(_super) {

    __extends(App, _super);

    App.include(Backbone.Events);

    App.defaults = {
      hijackRequests: true
    };

    App.settings = {
      linkSelector: 'a'
    };

    /*
      @param [Object] options the app's settings
      @option options [Object] viewPath the base object under which your app's views are contained
      @option options [Object] templatePath the base object under which to find your app's templates
      @option options [Boolean] hijackRequests Hijack click events on "a" tags to fire associated routes
        automatically (default true)
    */


    function App(options) {
      if (options == null) {
        options = {};
      }
      this.unbindRequestListener = __bind(this.unbindRequestListener, this);

      this.bindRequestListner = __bind(this.bindRequestListner, this);

      this.requestHandler = __bind(this.requestHandler, this);

      _.defaults(options, this.constructor.defaults);
      this.helpers = new Amoeba.Helpers();
      this.lookupContext = new Amoeba.LookupContext(options.viewPath);
      if (options.templatePath) {
        this.templatePath = options.templatePath;
      }
      this.hijackRequests = options.hijackRequests;
      if (this.hijackRequests) {
        this.bindRequestListner();
      }
      this;

    }

    App.start = function(options) {
      var backboneOpts;
      if (options == null) {
        options = {};
      }
      Amoeba.app = new this(options);
      Amoeba.app.initialize(options);
      backboneOpts = _.pick(options, 'pushState', 'hashChange', 'silent', 'root');
      Backbone.history.start(backboneOpts);
      return Amoeba.app;
    };

    /*
      This method is intensionally left empty for the user of the library to subclass and implemenet.
    */


    App.prototype.initialize = function() {};

    /*
      Fired whenever a click event is generated. This will search the DOM for the nearest `<a>` tag to
        the event target, and check its href against known routes. If such a route exists, it will
        navigate to that page. Otherwise, it will reach out to the server.
      @param [Object] e the jQuery event fired from a click event
    */


    App.prototype.requestHandler = function(e) {
      var requestedPath;
      requestedPath = $(e.target).closest('a').attr('href').replace(/^\//, '');
      Amoeba.log("Initiating route to '" + requestedPath + "'");
      if (Backbone.history.hasUrl(requestedPath)) {
        Backbone.history.navigate(requestedPath, {
          trigger: true
        });
        return false;
      }
      return true;
    };

    /*
      This method will bind to all click events and listen for click events and fire the
        {#requestHandler} function. It is called during the constructor if `hijackRequests = true`.
    */


    App.prototype.bindRequestListner = function() {
      return $(document).on('click', this.constructor.settings.linkSelector, this.requestHandler);
    };

    /*
      This method will unbind the click event hijacker setup by {#bindRequestListner}.
    */


    App.prototype.unbindRequestListener = function() {
      return $(document).off('click', this.constructor.settings.linkSelector, this.requestHandler);
    };

    return App;

  })(Amoeba.Module);

}).call(this);

(function(){
  Object.keys || (Object.keys = function(object){
    var keys = [];

    for (var key in object) {
      if (object.hasOwnProperty(key)) {
        keys.push(key);
      }
    }

    return keys;
  });

  Function.bind || (Function.bind = function(ctx){
    var fn = this;
    return function(){
      return fn.apply(ctx, arguments);
    };
  });
})();

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Amoeba.Collection.Container = (function(_super) {

    __extends(Container, _super);

    Container.include(Backbone.Events);

    Container.prototype.urlPageQuery = 'page';

    Container.prototype.collection = Backbone.Collection;

    function Container() {
      this.pages = {};
      this.initialize.apply(this, arguments);
    }

    Container.prototype.initialize = function() {};

    Container.prototype.sync = function() {
      return Backbone.sync.apply(this, arguments);
    };

    Container.prototype.parse = function(resp) {
      return resp;
    };

    Container.prototype.resetPage = function(page, resp, options) {
      var collection;
      if (options == null) {
        options = {};
      }
      options = _.clone(options);
      options.parse = true;
      if (this.pages[page]) {
        this.pages[page].reset(this.parse(resp), options);
      } else {
        collection = new this.collection();
        collection.page = page;
        if (this.model) {
          collection.model = this.model;
        }
        collection.reset(this.parse(resp), options);
        collection.on('all', this._onCollectionEvent, this);
        this.pages[page] = collection;
      }
      this.pages[page].dirty = false;
      return this.pages[page];
    };

    Container.prototype._onCollectionEvent = function(event, model, collection) {
      if (event === 'add') {
        return this.trigger('add', collection.page, model, this);
      } else if (event === 'remove') {
        this.shift(collection.page);
        return this.trigger('remove', collection.page, model, this);
      }
    };

    Container.prototype.reset = function() {
      var collection, page, _ref;
      _ref = this.pages;
      for (page in _ref) {
        collection = _ref[page];
        this.remove(page);
      }
      this.pages = {};
      return this;
    };

    Container.prototype.shift = function(page) {
      var collection, nextPage, oldPage, _ref,
        _this = this;
      if (this.perPage && this.pages[page].length >= this.perPage) {
        return this;
      }
      nextPage = page + 1;
      if (this.pages[nextPage]) {
        this._shift(page, nextPage);
      } else {
        this.fetch(nextPage, {
          success: function() {
            if (_this.pages[nextPage]) {
              return _this._shift(page, nextPage);
            }
          }
        });
      }
      _ref = this.pages;
      for (oldPage in _ref) {
        collection = _ref[oldPage];
        if (oldPage > nextPage) {
          this.remove(oldPage);
        }
      }
      return this;
    };

    Container.prototype._shift = function(page, nextPage) {
      var collectionToShift, shifted;
      collectionToShift = this.pages[nextPage];
      shifted = collectionToShift.first();
      if (shifted) {
        collectionToShift.remove(shifted, {
          silent: true
        });
        this.pages[page].add(shifted);
      }
      if (collectionToShift.length === 0) {
        return this.remove(nextPage);
      } else {
        return collectionToShift.dirty = true;
      }
    };

    Container.prototype.remove = function(page) {
      if (!this.pages[page]) {
        return this;
      }
      this.pages[page].reset();
      this.pages[page].off('all', this._onCollectionEvent, this);
      delete this.pages[page];
      this.trigger('removePage', page, this);
      return this;
    };

    Container.prototype.fetch = function(page, options) {
      var success, url,
        _this = this;
      if (options == null) {
        options = {};
      }
      options = _.clone(options);
      page = parseInt(page);
      if (this.pages[page] && !this.pages[page].dirty && !options.force) {
        return typeof options.success === "function" ? options.success(this.pages[page], this, this.pages[page].toJSON(), options) : void 0;
      }
      success = options.success;
      options.success = function(container, resp) {
        var collection;
        collection = _this.resetPage(page, resp, options);
        return typeof success === "function" ? success(collection, _this, resp, options) : void 0;
      };
      url = _.result(this, 'url');
      if (!url) {
        throw 'No url specified';
      }
      options.url = Amoeba.Util.appendQueryParam(url, "" + this.urlPageQuery + "=" + page);
      return this.sync('read', this, options);
    };

    Container.prototype.toJSON = function(options) {
      return _.map(this.pages, function(collection, page) {
        var obj;
        obj = {};
        obj[page] = collection.toJSON(options);
        return obj;
      });
    };

    return Container;

  })(Amoeba.Module);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Amoeba.Collection.Growable = (function(_super) {

    __extends(Growable, _super);

    function Growable() {
      return Growable.__super__.constructor.apply(this, arguments);
    }

    Growable.prototype.urlPageQuery = 'page';

    Growable.prototype.reset = function() {
      this.nextPage = void 0;
      return Growable.__super__.reset.apply(this, arguments);
    };

    Growable.prototype.hasMorePages = function() {
      return _.result(this, 'nextPage') != null;
    };

    Growable.prototype.fetchNextPage = function(options) {
      var query, url;
      if (options == null) {
        options = {};
      }
      url = _.result(this, 'url');
      if (!url) {
        throw 'No url specified';
      }
      query = "" + this.urlPageQuery + "=" + (_.result(this, 'nextPage'));
      _.extend(options, {
        url: Amoeba.Util.appendQueryParam(url, query),
        update: true,
        remove: false
      });
      return this.fetch(options);
    };

    return Growable;

  })(Backbone.Collection);

}).call(this);

(function() {



}).call(this);
