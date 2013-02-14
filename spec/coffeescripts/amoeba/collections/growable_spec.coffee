describe 'Amoeba.Collection.Growable', ->
  collection = fetchStub = undefined

  beforeEach ->
    collection = new Amoeba.Collection.Growable()
    collection.url = '/test'
    fetchStub = sinon.stub(Amoeba.Collection.Growable.__super__, 'fetch')

  afterEach ->
    Amoeba.Collection.Growable.__super__.fetch.restore()

  describe '#reset', ->
    it 'should clear the next page', ->
      collection.nextPage = +new Date
      collection.reset()
      expect(collection.nextPage).to.be.undefined

  describe '#fetch', ->
    nextPage = undefined

    beforeEach ->
      nextPage = +new Date
      collection.nextPage = nextPage

    it 'should not remove the models', ->
      collection.fetch()

      fetchStub.should.have.been.calledWithMatch remove: false

    it 'should call with the correct url', ->
      collection.fetch()

      fetchStub.should.have.been.calledWithMatch url: "/test?page=#{nextPage}"

  describe '#hasMorePages', ->
    it 'should if there is a next page', ->
      collection.nextPage = true
      collection.hasMorePages().should.be.true

    it 'should not if there is no next page', ->
      collection.nextPage = undefined
      collection.hasMorePages().should.be.false
