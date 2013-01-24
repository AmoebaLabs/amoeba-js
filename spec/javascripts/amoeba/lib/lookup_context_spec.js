
describe('Amoeba.LookupContext', function() {
  describe('#new', function() {
    return it('needs a view path', function() {
      return (function() {
        return new Amoeba.LookupContext();
      }).should["throw"]('Cannot find view path');
    });
  });
  return describe('#find', function() {
    var Foo;
    Foo = void 0;
    beforeEach(function() {
      return Foo = {
        Bar: {
          Baz: Amoeba.View
        }
      };
    });
    return it('should go up the namespace tree', function() {
      var context;
      context = new Amoeba.LookupContext(Foo);
      return context.find('Bar.Baz').should.equal(Amoeba.View);
    });
  });
});
