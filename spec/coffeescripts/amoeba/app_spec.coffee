describe 'Amoeba.App', ->
  describe '.start', ->
    it 'should set the global app as a new App', ->
      spy = sinon.spy(Amoeba, 'App')
      Amoeba.App.start()

      spy.should.have.been.calledWithNew
      spy.should.have.been.calledWith({})

    it 'should start the Backbone history with the supported options', ->
      spy = sinon.stub(Backbone.history, 'start')
      options =
        pushState: true
        hashChange: false
        silent: true
        root: '/'

      Amoeba.App.start(options)

      spy.should.have.been.calledWith(options)

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
