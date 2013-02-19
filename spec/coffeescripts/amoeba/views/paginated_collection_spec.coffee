describe 'Amoeba.View.PaginatedCollection', ->
  container = view = undefined

  beforeEach ->
    container = new Amoeba.Collection.Container
    container.resetPage(1, [id: 1])
    view = new Amoeba.View.PaginatedCollection(container: container)

  it 'should have a default current page of 1', ->
    view = new Amoeba.View.PaginatedCollection(container: container)
    view.currentPage.should.equal 1

  it 'should load up the page if passed in', ->
    view = new Amoeba.View.PaginatedCollection(page: 5, container: container)
    view.currentPage.should.equal 5

  describe '#renderPage', ->
    it 'should create the page', ->
      spy = sinon.spy(view, 'createPage')
      view.renderPage(1, container.pages[1])
      view.pages[1].should.not.be.undefined
      spy.should.have.been.calledWith 1, container.pages[1]

    it 'should not rerender the page', ->
      view.renderPage(1, container.pages[1])
      spy = sinon.spy(view, 'getPageEl')
      view.renderPage(1, container.pages[1])
      spy.should.not.have.been.called

    it 'should show the new page if it exists', ->
      view.renderPage(1, container.pages[1])
      $page = view.getPageEl(1).addClass('hide')
      view.refresh()
      $page.hasClass('hide').should.be.false

    it 'should add the page number to the new el', ->
      view.renderPage(1, container.pages[1])
      view.getPageEl(1).hasClass('page-1').should.be.true

    it 'should append the new page if it does not exist', ->
      view.renderPage(1, container.pages[1])
      view.$('.page-1').should.exist

    describe 'swtiching pages', ->
      beforeEach ->
        container.resetPage(2, [id: 2])
        view.refresh()
        view.renderPage(2, container.pages[2])

      it 'should hide the current page', ->
        view.getPageEl(1).hasClass('hide').should.be.true
        view.pages[1].rendered.should.be.false

      it 'should change the current page', ->
        view.currentPage.should.equal 2

    it 'should render the new page', ->
      view.renderPage(1, container.pages[1])
      view.pages[1].rendered.should.be.true

    it 'should trigger a render event', ->
      callback = sinon.spy()
      view.on('renderPage', callback)
      view.renderPage(1, container.pages[1])
      callback.should.have.been.calledWith 1

  describe '#refresh', ->
    describe 'existing page', ->
      beforeEach ->
        view.refresh()

      it 'should remove the page if the collection is dirty', ->
        container.pages[1].dirty = true
        spy = sinon.spy(view, 'removePage')
        sinon.stub(container, 'fetch')
        view.refresh()
        spy.should.have.been.calledWith 1

      it 'should mark the page as unrendered', ->
        spy = sinon.spy(view, 'getPageEl')
        view.refresh()
        spy.should.have.been.calledWith 1

    it 'should fetch the page', ->
      spy = sinon.spy(container, 'fetch')
      view.refresh()
      spy.should.have.been.calledWithMatch(1, silent: true)

    it 'should render the page', ->
      spy = sinon.spy(view, 'renderPage')
      view.refresh()
      spy.should.have.been.calledWith 1, container.pages[1]

  describe '#removePage', ->
    beforeEach ->
      view.refresh()

    it 'should show the zero state when there is no more models'

    it 'should be called when the container removes a page', ->
      container.remove(1)
      expect(view.pages[1]).to.be.undefined

    it 'should remove the view', ->
      spy = sinon.spy(view.pages[1].view, 'remove')
      view.removePage(1)
      spy.should.have.been.called
      view.getPageEl(1).should.not.exist

  describe '#createPage', ->
    it 'should render the view', ->
      spy = sinon.spy(view, '_render')
      view.createPage(1, container.pages[1])
      spy.should.have.been.called
      view.pages[1].view.collection.should.equal container.pages[1]

    it 'should not be rendered', ->
      view.createPage(1, container.pages[1])
      view.pages[1].rendered.should.be.false
