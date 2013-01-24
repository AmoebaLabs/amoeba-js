describe 'Amoeba.Router', ->
  router = undefined

  beforeEach ->
    Amoeba.app = new Amoeba.App(viewPath: 'test')
    view = Amoeba.View
    lookupContext = Amoeba.app.lookupContext
    sinon.stub(lookupContext, 'find').returns(view)

    router = new Amoeba.Router()

  describe '#render', ->
    it "should set the Amoeba's current view", ->
      view = router.render('partial')
      Amoeba.app.currentView.should.equal view

    it 'cannot be called multiple times', ->
      router.render('partial')
      ( -> router.render('partial')).should.throw('Render already called with partial')
