describe 'Amoeba.App', ->
  startStub = undefined

  beforeEach ->
    startStub = sinon.stub(Backbone.history, 'start')

  afterEach ->
    Backbone.history.start.restore()

  describe '.start', ->
    it 'should set the global app as a new App', ->
      spy = sinon.spy(Amoeba, 'App')
      Amoeba.App.start()

      spy.should.have.been.calledWithNew
      spy.should.have.been.calledWith(Amoeba.App.defaults)

    it 'should start the Backbone history with the supported options', ->
      options =
        pushState: true
        hashChange: false
        silent: true
        root: '/'

      # Note: This does not deep-copy options, and the constructor will modify options, so hopefully that's okay
      Amoeba.App.start(_.clone(options))

      startStub.should.have.been.calledWith(options)

  describe '#new', ->
    it 'should create the helpers', ->
      spy = sinon.spy(Amoeba, 'Helpers')

      Amoeba.App.start()

      spy.should.have.been.calledWithNew

    it 'should set the lookup context with the view path', ->
      spy = sinon.spy(Amoeba, 'LookupContext')

      Amoeba.App.start(viewPath: 'test')

      spy.should.have.been.calledWithNew
      spy.should.have.been.calledWith('test')
