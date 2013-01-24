var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

describe('Amoeba.View', function() {
  var TestView, template;
  template = function(obj) {
    return "<div>" + obj.name + "</div>";
  };
  TestView = (function(_super) {

    __extends(TestView, _super);

    function TestView() {
      return TestView.__super__.constructor.apply(this, arguments);
    }

    TestView.prototype.template = template;

    return TestView;

  })(Amoeba.View);
  describe('#new', function() {
    it('should replace the template with an amoeba template', function() {
      var spy;
      spy = sinon.spy(Amoeba, 'Template');
      new TestView();
      spy.should.have.been.calledWithNew;
      return spy.should.have.been.calledWith(template);
    });
    it('should have a reference to its parent view', function() {
      var parent, view;
      parent = new TestView();
      view = new TestView({
        parent: parent
      });
      return view.parent.should.equal(parent);
    });
    return it('should have a reference to its local variables', function() {
      var view;
      view = new TestView({
        locals: {
          foo: 'bar'
        }
      });
      return view.locals.foo.should.equal('bar');
    });
  });
  return describe('#_render', function() {
    beforeEach(function() {
      var lookupContext, view;
      Amoeba.app = new Amoeba.App({
        viewPath: 'test'
      });
      view = TestView;
      lookupContext = Amoeba.app.lookupContext;
      return sinon.stub(lookupContext, 'find').returns(view);
    });
    return it('set the parent as itself when rendering', function() {
      var parent, view;
      parent = new TestView();
      view = parent._render('TestView');
      return view.parent.should.equal(parent);
    });
  });
});
