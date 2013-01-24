
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
  return describe('#render', function() {
    it("should set the Amoeba's current view", function() {
      var view;
      view = router.render('partial');
      return Amoeba.app.currentView.should.equal(view);
    });
    return it('cannot be called multiple times', function() {
      router.render('partial');
      return (function() {
        return router.render('partial');
      }).should["throw"]('Render already called with partial');
    });
  });
});
