
describe('Amoeba.Template', function() {
  beforeEach(function() {
    return new Amoeba.App();
  });
  it('should give the template the render and helpers helper inside the template', function() {
    var template;
    template = function(obj) {
      obj.should.have.property('render');
      return obj.should.have.property('helpers');
    };
    return (new Amoeba.Template(template))();
  });
  return describe('#render', function() {
    var renderStub, template;
    template = renderStub = void 0;
    beforeEach(function() {
      return renderStub = sinon.stub(Amoeba.Template.prototype, '_render');
    });
    afterEach(function() {
      return Amoeba.Template.prototype._render.restore();
    });
    describe('partial', function() {
      var object;
      object = void 0;
      beforeEach(function() {
        return object = {
          test: 'me!'
        };
      });
      it('should render the template once', function() {
        template = function(obj) {
          return obj.render('partial');
        };
        (new Amoeba.Template(template))({
          object: object
        });
        return renderStub.should.have.been.calledOnce;
      });
      return it('should render the template with the locals passed in', function() {
        template = function(obj) {
          return obj.render('partial', {
            locals: {
              phrase: obj.object.test
            }
          });
        };
        (new Amoeba.Template(template))({
          object: object
        });
        return renderStub.should.have.been.calledWith('partial', {
          phrase: 'me!'
        });
      });
    });
    return describe('partial with a collection', function() {
      var collection;
      collection = void 0;
      beforeEach(function() {
        return collection = [1, 2, 3];
      });
      it('should render the template for each object in the collection', function() {
        template = function(obj) {
          return obj.render('partial', {
            collection: obj.collection
          });
        };
        (new Amoeba.Template(template))({
          collection: collection
        });
        return renderStub.should.have.been.calledThrice;
      });
      return it('should render the template with the locals given and a reference to the current object', function() {
        template = function(obj) {
          return obj.render('partial', {
            collection: obj.collection,
            locals: {
              phrase: 'me!'
            }
          });
        };
        (new Amoeba.Template(template))({
          collection: collection
        });
        renderStub.should.have.been.calledWith('partial', {
          phrase: 'me!',
          partial: 1
        });
        renderStub.should.have.been.calledWith('partial', {
          phrase: 'me!',
          partial: 2
        });
        return renderStub.should.have.been.calledWith('partial', {
          phrase: 'me!',
          partial: 3
        });
      });
    });
  });
});
