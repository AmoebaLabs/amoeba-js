describe 'Amoeba.Collection.Container', ->
  container = undefined

  beforeEach ->
    container = new Amoeba.Collection.Container()
    container.url = '/test'

  describe 'collection events', ->
    collection = undefined

    beforeEach ->
      container.resetPage(1, [id:1])
      collection = container.pages[1]

    it 'should mimic the add event', ->
      callback = sinon.spy()
      container.on('add', callback)
      collection.add(id: 2)
      callback.should.have.been.calledWith(1, collection.last(), container)

    it 'should mimic the remove event', ->
      callback = sinon.spy()
      container.on('remove', callback)
      model = collection.first()
      collection.remove(model)
      callback.should.have.been.calledWith(1, model, container)

    it 'should shift over the next pages top model on remove', ->
      shiftStub = sinon.stub(container, 'shift')
      collection.remove(collection.first())
      shiftStub.should.have.been.calledWith(1)

  describe '#resetPage', ->
    it 'should set the model on the collection if the container specifies it', ->
      class TestModel extends Backbone.Model
      class TestContainer extends Amoeba.Collection.Container
        model: TestModel

      container = new TestContainer()
      container.url = '/test'
      response = [id: 1]
      container.resetPage(1, response)
      container.pages[1].model.should.equal TestModel

    it 'should clear the dirty state', ->
      response = [id: 1]
      container.resetPage(1, response)
      container.pages[1].dirty = true
      container.resetPage(1, response)
      container.pages[1].dirty.should.be.false

    it 'should fill the collection for the page with the response', ->
      response = [{id: 1}, {id: 2}]
      container.resetPage(1, response)

      container.pages[1].page.should.equal 1
      container.pages[1].length.should.equal 2
      container.pages[1].first().id.should.equal 1
      container.pages[1].last().id.should.equal 2

  describe '#reset', ->
    beforeEach ->
      container.pages[1] = new Backbone.Collection()
      container.pages[2] = new Backbone.Collection()

    it 'should reset all of the pages', ->
      spy = sinon.spy(container, 'remove')

      container.reset()

      spy.should.have.been.calledTwice

    it 'should clear the pages', ->
      container.reset()
      container.pages.should.eql {}

  describe '#remove', ->
    beforeEach ->
      container.pages[1] = new Backbone.Collection()

    it 'should reset the collection', ->
      spy = sinon.spy(container.pages[1], 'reset')
      container.remove(1)
      spy.should.have.been.called

    it 'should remove the collection from pages', ->
      container.remove(1)
      expect(container.pages[1]).to.be.undefined

    it 'should fire the removePage event', ->
      callback = sinon.spy()
      container.on('removePage', callback)
      container.remove(1)

      callback.should.have.been.calledWith(1, container)

  describe '#fetch', ->
    beforeEach ->
      container.sync = (method, model, options) ->
        options.success([])

    it 'should always have an integer page', ->
      spy = sinon.spy(container, 'resetPage')
      container.fetch('1')
      spy.should.have.been.calledWithMatch 1

    describe 'caching', ->
      resetSpy = undefined
      beforeEach ->
        container.pages[1] = new Backbone.Collection()
        resetSpy = sinon.spy(container, 'resetPage')

      it 'should cache the page', ->
        container.fetch('1')
        resetSpy.should.not.have.been.called

      it 'should force reset the page if specified', ->
        container.fetch('1', force: true)
        resetSpy.should.have.been.calledWith 1, []

      it 'should reset the page if dirty', ->
        container.pages[1].dirty = true
        container.fetch('1')
        resetSpy.should.have.been.calledWith 1, []

    it 'should set the correct page url', ->
      spy = sinon.spy(container, 'sync')
      container.fetch('1', force: true)
      spy.should.have.been.calledWithMatch 'read', container, url: '/test?page=1'

  describe 'when a model is removed from a collection', ->
    removed = undefined
    beforeEach ->
      container.perPage = 2
      container.resetPage 1, [{id: 1}, {id: 2}]
      removed = container.pages[1].first()

    it 'should remove the subsequent pages after the next', ->
      container.resetPage 2, [id: 3]
      container.resetPage 3, [id: 4]
      container.pages[1].remove(removed)
      expect(container.pages[3]).to.be.undefined

    it 'should not add if the collection has too many models', ->
      container.pages[1].add(id: 4)
      container.pages[1].remove(removed)
      container.pages[1].pluck('id').should.eql [2,4]

    describe 'and there a next page', ->
      shifted = undefined

      describe 'and it has models', ->
        beforeEach ->
          container.resetPage 2, [{id: 3}, {id: 4}]
          shifted = container.pages[2].first()

        it 'should invalidate the pages behind that page', ->
          container.pages[1].remove(removed)
          container.pages[2].dirty.should.be.true

        it 'should remove the next page if empty after shift', ->
          container.pages[1].remove(removed)
          container.pages[1].remove(container.pages[1].first())
          expect(container.pages[2]).to.be.undefined

        it 'should fetch the next page to try and fill in the removed model', ->
          container.pages[1].remove(removed)
          container.pages[1].length.should.equal 2
          container.pages[1].last().should.equal shifted

      describe 'and it is empty', ->
        beforeEach ->
          container.resetPage 2, []

        it 'should remove the page', ->
          container.pages[1].remove(removed)
          expect(container.pages[2]).to.be.undefined

      describe 'and there is a next page remotely', ->
        beforeEach ->
          container.sync = (method, model, options) ->
            options.success([{id: 3}, {id: 4}])

        it 'should shift over the next pages first model into the last spot of the page', ->
          container.pages[1].remove(removed)
          container.pages[1].length.should.equal 2
          container.pages[1].last().id.should.equal 3
          container.pages[2].first().id.should.equal 4

  describe '#toJSON', ->
    it 'should be an array of objects with the page number to collection as json', ->
      response = [{id: 1}, {id: 2}]
      container.resetPage(1, response)

      container.toJSON().should.eql [{'1': response}]
