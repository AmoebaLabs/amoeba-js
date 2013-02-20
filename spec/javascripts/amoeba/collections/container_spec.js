var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

describe('Amoeba.Collection.Container', function() {
  var container;
  container = void 0;
  beforeEach(function() {
    container = new Amoeba.Collection.Container();
    return container.url = '/test';
  });
  describe('collection events', function() {
    var collection;
    collection = void 0;
    beforeEach(function() {
      container.resetPage(1, [
        {
          id: 1
        }
      ]);
      return collection = container.pages[1];
    });
    it('should mimic the add event', function() {
      var callback;
      callback = sinon.spy();
      container.on('add', callback);
      collection.add({
        id: 2
      });
      return callback.should.have.been.calledWith(1, collection.last(), container);
    });
    it('should mimic the remove event', function() {
      var callback, model;
      callback = sinon.spy();
      container.on('remove', callback);
      model = collection.first();
      collection.remove(model);
      return callback.should.have.been.calledWith(1, model, container);
    });
    return it('should shift over the next pages top model on remove', function() {
      var shiftStub;
      shiftStub = sinon.stub(container, 'shift');
      collection.remove(collection.first());
      return shiftStub.should.have.been.calledWith(1);
    });
  });
  describe('#resetPage', function() {
    it('should set the model on the collection if the container specifies it', function() {
      var TestContainer, TestModel, response;
      TestModel = (function(_super) {

        __extends(TestModel, _super);

        function TestModel() {
          return TestModel.__super__.constructor.apply(this, arguments);
        }

        return TestModel;

      })(Backbone.Model);
      TestContainer = (function(_super) {

        __extends(TestContainer, _super);

        function TestContainer() {
          return TestContainer.__super__.constructor.apply(this, arguments);
        }

        TestContainer.prototype.model = TestModel;

        return TestContainer;

      })(Amoeba.Collection.Container);
      container = new TestContainer();
      container.url = '/test';
      response = [
        {
          id: 1
        }
      ];
      container.resetPage(1, response);
      return container.pages[1].model.should.equal(TestModel);
    });
    it('should clear the dirty state', function() {
      var response;
      response = [
        {
          id: 1
        }
      ];
      container.resetPage(1, response);
      container.pages[1].dirty = true;
      container.resetPage(1, response);
      return container.pages[1].dirty.should.be["false"];
    });
    return it('should fill the collection for the page with the response', function() {
      var response;
      response = [
        {
          id: 1
        }, {
          id: 2
        }
      ];
      container.resetPage(1, response);
      container.pages[1].page.should.equal(1);
      container.pages[1].length.should.equal(2);
      container.pages[1].first().id.should.equal(1);
      return container.pages[1].last().id.should.equal(2);
    });
  });
  describe('#reset', function() {
    beforeEach(function() {
      container.pages[1] = new Backbone.Collection();
      return container.pages[2] = new Backbone.Collection();
    });
    it('should reset all of the pages', function() {
      var spy;
      spy = sinon.spy(container, 'remove');
      container.reset();
      return spy.should.have.been.calledTwice;
    });
    return it('should clear the pages', function() {
      container.reset();
      return container.pages.should.eql({});
    });
  });
  describe('#remove', function() {
    beforeEach(function() {
      return container.pages[1] = new Backbone.Collection();
    });
    it('should reset the collection', function() {
      var spy;
      spy = sinon.spy(container.pages[1], 'reset');
      container.remove(1);
      return spy.should.have.been.called;
    });
    it('should remove the collection from pages', function() {
      container.remove(1);
      return expect(container.pages[1]).to.be.undefined;
    });
    return it('should fire the removePage event', function() {
      var callback;
      callback = sinon.spy();
      container.on('removePage', callback);
      container.remove(1);
      return callback.should.have.been.calledWith(1, container);
    });
  });
  describe('#fetch', function() {
    beforeEach(function() {
      return container.sync = function(method, model, options) {
        return options.success(model, []);
      };
    });
    it('should always have an integer page', function() {
      var spy;
      spy = sinon.spy(container, 'resetPage');
      container.fetch('1');
      return spy.should.have.been.calledWithMatch(1);
    });
    describe('caching', function() {
      var resetSpy;
      resetSpy = void 0;
      beforeEach(function() {
        container.pages[1] = new Backbone.Collection();
        return resetSpy = sinon.spy(container, 'resetPage');
      });
      it('should cache the page', function() {
        container.fetch('1');
        return resetSpy.should.not.have.been.called;
      });
      it('should force reset the page if specified', function() {
        container.fetch('1', {
          force: true
        });
        return resetSpy.should.have.been.calledWith(1, []);
      });
      return it('should reset the page if dirty', function() {
        container.pages[1].dirty = true;
        container.fetch('1');
        return resetSpy.should.have.been.calledWith(1, []);
      });
    });
    return it('should set the correct page url', function() {
      var spy;
      spy = sinon.spy(container, 'sync');
      container.fetch('1', {
        force: true
      });
      return spy.should.have.been.calledWithMatch('read', container, {
        url: '/test?page=1'
      });
    });
  });
  describe('when a model is removed from a collection', function() {
    var removed;
    removed = void 0;
    beforeEach(function() {
      container.perPage = 2;
      container.resetPage(1, [
        {
          id: 1
        }, {
          id: 2
        }
      ]);
      return removed = container.pages[1].first();
    });
    it('should remove the subsequent pages after the next', function() {
      container.resetPage(2, [
        {
          id: 3
        }
      ]);
      container.resetPage(3, [
        {
          id: 4
        }
      ]);
      container.pages[1].remove(removed);
      return expect(container.pages[3]).to.be.undefined;
    });
    it('should not add if the collection has too many models', function() {
      container.pages[1].add({
        id: 4
      });
      container.pages[1].remove(removed);
      return container.pages[1].pluck('id').should.eql([2, 4]);
    });
    return describe('and there a next page', function() {
      var shifted;
      shifted = void 0;
      describe('and it has models', function() {
        beforeEach(function() {
          container.resetPage(2, [
            {
              id: 3
            }, {
              id: 4
            }
          ]);
          return shifted = container.pages[2].first();
        });
        it('should invalidate the pages behind that page', function() {
          container.pages[1].remove(removed);
          return container.pages[2].dirty.should.be["true"];
        });
        it('should remove the next page if empty after shift', function() {
          container.pages[1].remove(removed);
          container.pages[1].remove(container.pages[1].first());
          return expect(container.pages[2]).to.be.undefined;
        });
        return it('should fetch the next page to try and fill in the removed model', function() {
          container.pages[1].remove(removed);
          container.pages[1].length.should.equal(2);
          return container.pages[1].last().should.equal(shifted);
        });
      });
      describe('and it is empty', function() {
        beforeEach(function() {
          return container.resetPage(2, []);
        });
        return it('should remove the page', function() {
          container.pages[1].remove(removed);
          return expect(container.pages[2]).to.be.undefined;
        });
      });
      return describe('and there is a next page remotely', function() {
        beforeEach(function() {
          return container.sync = function(method, model, options) {
            return options.success(model, [
              {
                id: 3
              }, {
                id: 4
              }
            ]);
          };
        });
        return it('should shift over the next pages first model into the last spot of the page', function() {
          container.pages[1].remove(removed);
          container.pages[1].length.should.equal(2);
          container.pages[1].last().id.should.equal(3);
          return container.pages[2].first().id.should.equal(4);
        });
      });
    });
  });
  return describe('#toJSON', function() {
    return it('should be an array of objects with the page number to collection as json', function() {
      var response;
      response = [
        {
          id: 1
        }, {
          id: 2
        }
      ];
      container.resetPage(1, response);
      return container.toJSON().should.eql([
        {
          '1': response
        }
      ]);
    });
  });
});
