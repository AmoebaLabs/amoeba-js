var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

describe('Amoeba.View.Collection', function() {
  var ParentView, SubView, TestCollection, collection, model, view;
  view = collection = model = void 0;
  TestCollection = (function(_super) {

    __extends(TestCollection, _super);

    function TestCollection() {
      return TestCollection.__super__.constructor.apply(this, arguments);
    }

    TestCollection.prototype.sync = function(method, coll, options) {
      return options.success(this, [], options);
    };

    return TestCollection;

  })(Backbone.Collection);
  SubView = (function(_super) {

    __extends(SubView, _super);

    function SubView() {
      return SubView.__super__.constructor.apply(this, arguments);
    }

    SubView.prototype.render = function() {
      this.el.innerHTML = 'Beam me up';
      return this;
    };

    return SubView;

  })(Amoeba.View);
  ParentView = (function(_super) {

    __extends(ParentView, _super);

    function ParentView() {
      return ParentView.__super__.constructor.apply(this, arguments);
    }

    return ParentView;

  })(Amoeba.View.Collection);
  beforeEach(function() {
    Amoeba.App.start();
    model = new Backbone.Model({
      id: 1
    });
    collection = new TestCollection([model]);
    return view = new ParentView({
      collection: collection,
      subView: {
        partial: SubView
      }
    });
  });
  describe('#render', function() {
    it('should load up the subviews', function() {
      view.render();
      return view.subviews.length.should.equal(collection.length);
    });
    it('should render the subviews into the el', function() {
      view.render();
      return view.el.textContent.should.equal('Beam me up');
    });
    it('should trigger the render event', function() {
      var everything;
      everything = false;
      view.on('render', function() {
        return everything = true;
      });
      view.render();
      return everything.should.be.ok;
    });
    return it('should not rerender unless necessary', function() {
      var spy;
      view.rendered = true;
      spy = sinon.spy(view, 'extractSubViews');
      view.render();
      return spy.should.not.have.beenCalled;
    });
  });
  describe('#refresh', function() {
    it('should clear the subviews', function() {
      view.render();
      return view.refresh().subviews.length.should.equal(0);
    });
    it('should reset the collection', function() {
      var spy;
      spy = sinon.spy(collection, 'reset');
      view.refresh();
      return spy.should.have.beenCalled;
    });
    return it('should rerender the view', function() {
      var spy;
      spy = sinon.spy(view, 'render');
      view.refresh();
      spy.should.have.beenCalled;
      return view.subviews.length.should.equal(0);
    });
  });
  describe('#extractSubView', function() {
    it('should render the subview with the subView view options merged in', function() {
      var stub;
      view.options.subView = {
        test: 'me!'
      };
      stub = sinon.stub(view, '_render');
      view.extractSubView(model);
      return stub.should.have.been.calledWith(SubView, {
        test: 'me!',
        model: model
      });
    });
    return it('should add the new subview to the list', function() {
      view.extractSubView(model);
      return view.subviews.length.should.equal(1);
    });
  });
  describe('#renderSubViews', function() {
    return it('should append all the subviews to a fragment', function() {
      var fragment, spy, stub;
      fragment = document.createDocumentFragment();
      spy = sinon.spy(fragment, 'appendChild');
      stub = sinon.stub(document, 'createDocumentFragment').returns(fragment);
      view.extractSubViews();
      view.renderSubViews();
      spy.should.have.been.calledOnce;
      return document.createDocumentFragment.restore();
    });
  });
  describe('#add', function() {
    it('should add the subview', function() {
      view.add(model);
      return view.subviews.length.should.equal(1);
    });
    it('should add to the el if rendered', function() {
      view.render();
      view.add(model);
      return view.el.textContent.should.equal('Beam me upBeam me up');
    });
    it('should not add to the el if rendered', function() {
      var everything;
      everything = false;
      view.on('render', function() {
        return everything = true;
      });
      view.add(model);
      return everything.should.be.not.ok;
    });
    return it('should trigger a render event', function() {
      var everything;
      everything = false;
      view.render();
      view.on('render', function() {
        return everything = true;
      });
      view.add(model);
      return everything.should.be.ok;
    });
  });
  return describe('#remove', function() {
    it('should remove the subview from the page if rendered', function() {
      view.render();
      view.remove(model);
      return view.el.innerText.should.equal('');
    });
    return it('should resize the subviews', function() {
      view.render();
      view.remove(model);
      return view.subviews.length.should.equal(0);
    });
  });
});
