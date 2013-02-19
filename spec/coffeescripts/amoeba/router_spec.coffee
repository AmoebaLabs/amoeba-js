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

  describe '#removeCurrentView', ->
    view = undefined

    beforeEach ->
      view = router.render('partial')

    it 'should remove the view from the page', ->
      stub = sinon.stub(view, 'remove')
      router.removeCurrentView()
      stub.should.have.been.called

    it 'should unset the current view', ->
      router.removeCurrentView()
      expect(router.currentView).to.be.undefined
