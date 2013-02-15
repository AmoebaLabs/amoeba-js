
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
    return it("should set the Amoeba's current view", function() {
      var view;
      view = router.render('partial');
      return Amoeba.app.currentView.should.equal(view);
    });
  });
});
