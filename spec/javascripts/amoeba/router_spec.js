
describe('Amoeba.Router', function() {
  var router;
  router = void 0;
  beforeEach(function() {
    var lookupContext, view;
    Amoeba.app = new Amoeba.App({
      viewPath: 'test'
    });
    view = Amoeba.View;
    lookupContext = Amoeba.app.lookupContext;
    sinon.stub(lookupContext, 'find').returns(view);
    return router = new Amoeba.Router();
  });
  describe('#render', function() {
    return it("should set the Amoeba's current view", function() {
      var view;
      view = router.render('partial');
      return Amoeba.app.currentView.should.equal(view);
    });
  });
  return describe('#removeCurrentView', function() {
    var view;
    view = void 0;
    beforeEach(function() {
      return view = router.render('partial');
    });
    it('should remove the view from the page', function() {
      var stub;
      stub = sinon.stub(view, 'remove');
      router.removeCurrentView();
      return stub.should.have.been.called;
    });
    return it('should unset the current view', function() {
      router.removeCurrentView();
      return expect(router.currentView).to.be.undefined;
    });
  });
});
