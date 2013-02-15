
describe('Amoeba.Collection.Growable', function() {
  var collection, fetchStub;
  collection = fetchStub = void 0;
  beforeEach(function() {
    collection = new Amoeba.Collection.Growable();
    collection.url = '/test';
    return fetchStub = sinon.stub(Amoeba.Collection.Growable.__super__, 'fetch');
  });
  afterEach(function() {
    return Amoeba.Collection.Growable.__super__.fetch.restore();
  });
  describe('#reset', function() {
    return it('should clear the next page', function() {
      collection.nextPage = +(new Date);
      collection.reset();
      return expect(collection.nextPage).to.be.undefined;
    });
  });
  describe('#fetch', function() {
    var nextPage;
    nextPage = void 0;
    beforeEach(function() {
      nextPage = +(new Date);
      return collection.nextPage = nextPage;
    });
    it('should not remove the models', function() {
      collection.fetch();
      return fetchStub.should.have.been.calledWithMatch({
        remove: false
      });
    });
    return it('should call with the correct url', function() {
      collection.fetch();
      return fetchStub.should.have.been.calledWithMatch({
        url: "/test?page=" + nextPage
      });
    });
  });
  return describe('#hasMorePages', function() {
    it('should if there is a next page', function() {
      collection.nextPage = true;
      return collection.hasMorePages().should.be["true"];
    });
    return it('should not if there is no next page', function() {
      collection.nextPage = void 0;
      return collection.hasMorePages().should.be["false"];
    });
  });
});
