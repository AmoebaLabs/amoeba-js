
describe('Amoeba.PaginatedCollection', function() {
  var collection, fetchStub;
  collection = fetchStub = void 0;
  beforeEach(function() {
    collection = new Amoeba.PaginatedCollection();
    collection.url = '/test';
    return fetchStub = sinon.stub(collection, 'fetch');
  });
  describe('#reset', function() {
    return it('should clear the next page', function() {
      collection.nextPage = +(new Date);
      collection.reset();
      return expect(collection.nextPage).to.be.undefined;
    });
  });
  describe('#fetchNextPage', function() {
    var nextPage;
    nextPage = void 0;
    beforeEach(function() {
      nextPage = +(new Date);
      return collection.nextPage = nextPage;
    });
    it('should not remove the models', function() {
      collection.fetchNextPage();
      return fetchStub.should.have.been.calledWithMatch({
        remove: false
      });
    });
    it('should append the page parameter to a new query string', function() {
      collection.fetchNextPage();
      return fetchStub.should.have.been.calledWithMatch({
        url: "/test?page=" + nextPage
      });
    });
    return it('should append the page parameter to an existing query string', function() {
      collection.url = '/test?test=true';
      collection.fetchNextPage();
      return fetchStub.should.have.been.calledWithMatch({
        url: "/test?test=true&page=" + nextPage
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
