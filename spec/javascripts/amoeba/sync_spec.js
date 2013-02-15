
describe('Backbone.sync', function() {
  var attributes, model, syncStub;
  syncStub = attributes = model = void 0;
  beforeEach(function() {
    attributes = {
      id: 5,
      name: 'Pete Abred'
    };
    model = new Backbone.Model(attributes);
    return syncStub = sinon.stub(Backbone, 'originalSync');
  });
  afterEach(function() {
    return Backbone.originalSync.restore();
  });
  return describe('creating, updating, or patching', function() {
    it('should serialize the model', function() {
      model.save();
      return syncStub.should.have.been.calledWithMatch('update', {}, {
        data: JSON.stringify(attributes)
      });
    });
    it('should wrap the serialized model in the paramRoot, if specified', function() {
      var data;
      model.paramRoot = 'user';
      model.save();
      data = JSON.stringify({
        user: attributes
      });
      return syncStub.should.have.been.calledWithMatch('update', {}, {
        data: data
      });
    });
    it('should request with json', function() {
      model.save();
      return syncStub.should.have.been.calledWithMatch('update', {}, {
        contentType: 'application/json'
      });
    });
    return it('should merge optional data with the model', function() {
      var data;
      model.save({}, {
        data: {
          company: 'Bobby Meyer'
        }
      });
      data = JSON.stringify(_.extend({
        company: 'Bobby Meyer'
      }, attributes));
      return syncStub.should.have.been.calledWithMatch('update', {}, {
        data: data
      });
    });
  });
});
