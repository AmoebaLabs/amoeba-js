
describe('Amoeba.App', function() {
  var startStub;
  startStub = void 0;
  beforeEach(function() {
    return startStub = sinon.stub(Backbone.history, 'start');
  });
  afterEach(function() {
    return Backbone.history.start.restore();
  });
  describe('.start', function() {
    it('should set the global app as a new App', function() {
      var spy;
      spy = sinon.spy(Amoeba, 'App');
      Amoeba.App.start();
      spy.should.have.been.calledWithNew;
      return spy.should.have.been.calledWith(Amoeba.App.defaults);
    });
    return it('should start the Backbone history with the supported options', function() {
      var options;
      options = {
        pushState: true,
        hashChange: false,
        silent: true,
        root: '/'
      };
      Amoeba.App.start(_.clone(options));
      return startStub.should.have.been.calledWith(options);
    });
  });
  return describe('#new', function() {
    it('should create the helpers', function() {
      var spy;
      spy = sinon.spy(Amoeba, 'Helpers');
      Amoeba.App.start();
      return spy.should.have.been.calledWithNew;
    });
    return it('should set the lookup context with the view path', function() {
      var spy;
      spy = sinon.spy(Amoeba, 'LookupContext');
      Amoeba.App.start({
        viewPath: 'test'
      });
      spy.should.have.been.calledWithNew;
      return spy.should.have.been.calledWith('test');
    });
  });
});
