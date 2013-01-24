
describe('Amoeba.Helpers', function() {
  var MyHelper;
  MyHelper = {
    helpMe: function() {
      return 'helped';
    }
  };
  beforeEach(function() {
    return Amoeba.Helpers.register(MyHelper);
  });
  describe('.register', function() {
    return it('should add a helper', function() {
      return Amoeba.Helpers.helpers.should.eql([MyHelper]);
    });
  });
  return describe('#new', function() {
    return it('should add all the methods of the registered helpers to the instance', function() {
      var helpers;
      helpers = new Amoeba.Helpers();
      helpers.helpMe.should.be.ok;
      return helpers.helpMe().should.equal('helped');
    });
  });
});
