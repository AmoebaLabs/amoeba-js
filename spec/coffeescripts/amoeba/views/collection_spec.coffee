describe 'Amoeba.View.Collection', ->
  view = collection = model = undefined

  class TestCollection extends Backbone.Collection
    sync: (method, coll, options) ->
      options.success(@, [], options)

  class SubView extends Amoeba.View
    render: ->
      @el.innerHTML = 'Beam me up'
      @

  class ParentView extends Amoeba.View.Collection

  beforeEach ->
    sinon.stub(Backbone.history, 'start')
    Amoeba.App.start()
    model = new Backbone.Model(id: 1)
    collection = new TestCollection([model])
    view = new ParentView
      collection: collection
      subView:
        partial: SubView

  afterEach ->
    Backbone.history.start.restore()

  describe '#render', ->
    it 'should load up the subviews', ->
      view.render()
      view.subviews.length.should.equal collection.length

    it 'should render the subviews into the el', ->
      view.render()
      view.el.textContent.should.equal 'Beam me up'

    it 'should trigger the render event', ->
      everything = false

      view.on 'render', ->
        everything = true

      view.render()

      everything.should.be.ok

    it 'should not rerender unless necessary', ->
      view.rendered = true
      spy = sinon.spy(view, 'extractSubViews')

      view.render()
      spy.should.not.have.beenCalled

  describe '#refresh', ->
    it 'should clear the subviews', ->
      view.render()
      view.refresh().subviews.length.should.equal 0

    it 'should reset the collection', ->
      spy = sinon.spy(collection, 'reset')

      view.refresh()
      spy.should.have.beenCalled

    it 'should rerender the view', ->
      spy = sinon.spy(view, 'render')
      view.refresh()

      spy.should.have.beenCalled
      view.subviews.length.should.equal 0

  describe '#extractSubView', ->
    it 'should render the subview with the subView view options merged in', ->
      view.options.subView =
        test: 'me!'
      stub = sinon.stub(view, '_render')

      view.extractSubView(model)
      stub.should.have.been.calledWith(SubView, test: 'me!', model: model)

    it 'should add the new subview to the list', ->
      view.extractSubView(model)
      view.subviews.length.should.equal 1

  describe '#renderSubViews', ->
    it 'should append all the subviews to a fragment', ->
      fragment = document.createDocumentFragment()
      spy = sinon.spy(fragment, 'appendChild')
      stub = sinon.stub(document, 'createDocumentFragment').returns(fragment)

      view.extractSubViews()
      view.renderSubViews()

      spy.should.have.been.calledOnce

      document.createDocumentFragment.restore()

  describe '#addModel', ->
    it 'should add the subview', ->
      view.addModel(model)

      view.subviews.length.should.equal 1

    it 'should add to the el if rendered', ->
      view.render()
      view.addModel(model)
      view.el.textContent.should.equal 'Beam me upBeam me up'

    it 'should not add to the el if rendered', ->
      everything = false
      view.on 'render', ->
        everything = true

      view.addModel(model)
      everything.should.be.not.ok

    it 'should trigger a render event', ->
      everything = false

      view.render()
      view.on 'render', ->
        everything = true

      view.addModel(model)
      everything.should.be.ok

  describe '#removeModel', ->
    it 'should remove the subview from the page if rendered', ->
      view.render()
      view.removeModel(model)
      view.el.innerText.should.equal ''

    it 'should resize the subviews', ->
      view.render()
      view.removeModel(model)
      view.subviews.length.should.equal 0
