var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

describe('Amoeba.Module', function() {
  var Obj;
  Obj = void 0;
  beforeEach(function() {
    return Obj = (function(_super) {

      __extends(Obj, _super);

      function Obj() {
        return Obj.__super__.constructor.apply(this, arguments);
      }

      return Obj;

    })(Amoeba.Module);
  });
  describe('#extend', function() {
    var Extended;
    Extended = void 0;
    beforeEach(function() {
      return Extended = {
        method: function() {
          return 'called';
        },
        extended: function() {}
      };
    });
    it('should extend the object with the others methods', function() {
      Obj.extend(Extended);
      return Obj.method().should.equal('called');
    });
    return it('should call the "extended" method on the injected object', function() {
      var stub;
      stub = sinon.stub(Extended, 'extended');
      Obj.extend(Extended);
      return stub.should.have.been.called;
    });
  });
  return describe('#include', function() {
    var Included;
    Included = void 0;
    beforeEach(function() {
      return Included = {
        method: function() {
          return 'called';
        },
        included: function() {}
      };
    });
    it('should extend the object with the others methods', function() {
      Obj.include(Included);
      return (new Obj()).method().should.equal('called');
    });
    return it('should call the "included" method on the injected object', function() {
      var stub;
      stub = sinon.stub(Included, 'included');
      Obj.include(Included);
      return stub.should.have.been.called;
    });
  });
});
