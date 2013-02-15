describe 'Amoeba.Collection.Growable', ->
  collection = fetchStub = undefined

  beforeEach ->
    collection = new Amoeba.Collection.Growable()
    collection.url = '/test'
    fetchStub = sinon.stub(collection, 'fetch')

  describe '#reset', ->
    it 'should clear the next page', ->
      collection.nextPage = +new Date
      collection.reset()
      expect(collection.nextPage).to.be.undefined

  describe '#fetchNextPage', ->
    nextPage = undefined

    beforeEach ->
      nextPage = +new Date
      collection.nextPage = nextPage

    it 'should not remove the models', ->
      collection.fetchNextPage()

      fetchStub.should.have.been.calledWithMatch remove: false

    it 'should call with the correct url', ->
      collection.fetchNextPage()

      fetchStub.should.have.been.calledWithMatch url: "/test?page=#{nextPage}"

  describe '#hasMorePages', ->
    it 'should if there is a next page', ->
      collection.nextPage = true
      collection.hasMorePages().should.be.true

    it 'should not if there is no next page', ->
      collection.nextPage = undefined
      collection.hasMorePages().should.be.false
