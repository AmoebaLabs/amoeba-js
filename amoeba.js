(function() {

  window.Amoeba = {
    version: '0.2.0'
  };

}).call(this);

(function() {
  var methodMap, originalSync;

  methodMap = {
    create: 'POST',
    update: 'PUT',
    patch: 'PATCH',
    "delete": 'DELETE',
    read: 'GET'
  };

  originalSync = Backbone.sync;

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
    return originalSync(method, model, options);
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

  Amoeba.Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Backbone.Model);

}).call(this);

(function() {
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
              object = _.extend({}, item, options.locals);
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
      this.locals = options.locals;
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

    Collection.prototype.subviews = [];

    function Collection(options) {
      var _ref;
      if (options == null) {
        options = {};
      }
      this.extractSubView = __bind(this.extractSubView, this);

      if ((_ref = options.subView) == null) {
        options.subView = {};
      }
      Collection.__super__.constructor.call(this, options);
      this.collection.on('add', this.add.bind(this));
      this.collection.on('remove', this.remove.bind(this));
    }

    Collection.prototype.render = function() {
      this.extractSubViews();
      this.$el.html(this.renderSubViews());
      this.rendered = true;
      this.trigger('render');
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

    Collection.prototype.add = function(model) {
      var subview;
      subview = this.extractSubView(model);
      if (this.rendered) {
        this.$el.append(subview.render().el);
        return this.trigger('render');
      }
    };

    Collection.prototype.remove = function(model) {
      var subviewToRemove;
      subviewToRemove = _.select(this.subviews, function(subview) {
        return subview.model.id === model.id;
      })[0];
      this.subviews = _.without(this.subviews, subviewToRemove);
      if (this.rendered) {
        return subviewToRemove.$el.remove();
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

}).call(this);

(function() {

  Backbone.History.prototype.hasUrl = function(fragment) {
    return _.any(this.handlers, function(handler) {
      if (handler.route.test(fragment)) {
        return true;
      } else {
        return false;
      }
    });
  };

}).call(this);

(function() {

  Amoeba.LookupContext = (function() {

    function LookupContext(viewPath) {
      this.viewPath = viewPath;
      if (!this.viewPath) {
        throw "Cannot find view path";
      }
    }

    LookupContext.prototype.find = function(template) {
      var namespace, namespaces, view, _i, _len;
      view = this.viewPath;
      namespaces = template.split('.');
      for (_i = 0, _len = namespaces.length; _i < _len; _i++) {
        namespace = namespaces[_i];
        view = view[namespace];
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

      this.helpers = new Amoeba.Helpers();
      if (options.viewPath) {
        this.lookupContext = new Amoeba.LookupContext(options.viewPath);
      }
      if (options.templatePath) {
        this.templatePath = options.templatePath;
      }
      this.hijackRequests = options.hijackRequests === false ? false : true;
      if (this.hijackRequests) {
        this.bindRequestListner();
      }
      this;

    }

    App.start = function(options) {
      if (options == null) {
        options = {};
      }
      Amoeba.app = new this(options);
      Amoeba.app.initialize(options);
      Backbone.history.start(_.pick(options, 'pushState', 'hashChange', 'silent', 'root'));
      return Amoeba.app;
    };

    App.prototype.initialize = function() {};

    App.prototype.requestHandler = function(e) {};

    App.prototype.bindRequestListner = function() {
      return $(document).on(this.constructor.settings.linkSelector, 'click', this.requestHandler);
    };

    App.prototype.unbindRequestListener = function() {
      return $(document).off(this.constructor.settings.linkSelector, 'click', this.requestHandler);
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



}).call(this);
