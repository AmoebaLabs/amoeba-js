
describe('Amoeba.LookupContext', function() {
  return describe('#find', function() {
    it('requires a template passed', function() {
      var context;
      context = new Amoeba.LookupContext();
      return (function() {
        return context.find();
      }).should["throw"]('A template is required');
    });
    describe('explicit', function() {
      return it('should find the View if passed in', function() {
        var context;
        context = new Amoeba.LookupContext();
        return context.find(Amoeba.View).should.equal(Amoeba.View);
      });
    });
    return describe('implicit', function() {
      describe('with a viewPath', function() {
        var Foo, context;
        context = void 0;
        Foo = {
          Bar: {
            Baz: Amoeba.View
          }
        };
        beforeEach(function() {
          return context = new Amoeba.LookupContext(Foo);
        });
        it('should go up the namespace tree', function() {
          return context.find('Bar.Baz').should.equal(Amoeba.View);
        });
        return it('should throw an error if the namespace is invalid', function() {
          return (function() {
            return context.find('Bar.Boo');
          }).should["throw"]('Cannot find template Foo.Bar');
        });
      });
      return describe('without a viewPath', function() {
        var context;
        context = void 0;
        beforeEach(function() {
          return context = new Amoeba.LookupContext();
        });
        it('should throw an error if the base cannot be found', function() {
          return (function() {
            return context.find('Foo');
          }).should["throw"]('Cannot find template Foo');
        });
        it('should look up the base with the passed in context', function() {
          var Foo;
          Foo = {
            Bar: Amoeba.View
          };
          return context.find('Bar', Foo).should.equal(Amoeba.View);
        });
        it('should look up the base via window if no context', function() {
          window.Foo = Amoeba.View;
          context.find('Foo').should.equal(Amoeba.View);
          return delete window.Foo;
        });
        it('should go up the namespace tree based on the first namespace', function() {
          var Foo;
          Foo = {
            Bar: {
              Baz: Amoeba.View
            }
          };
          return context.find('Bar.Baz', Foo).should.equal(Amoeba.View);
        });
        return it('should throw an error if the namespace is invalid', function() {
          var Foo;
          Foo = {};
          return (function() {
            return context.find('Bar', Foo);
          }).should["throw"]('Cannot find template Foo.Bar');
        });
      });
    });
  });
});
