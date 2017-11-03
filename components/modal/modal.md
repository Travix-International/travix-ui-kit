Basic Modal:

    <div>
      <div>
        <Button size="s" onClick={() => setState({ isOpenBaseModal: true })}>Open base modal</Button>
        <Modal
          active={state.isOpenBaseModal}
          onClose={() => setState({ isOpenBaseModal: false })}>
            Modal Content
        </Modal>
      </div>
      <br/>
      <div>
        <Button size="s" onClick={() => setState({ isOpenModalWithTitle: true })}>Open modal with title</Button>
        <Modal
          active={state.isOpenModalWithTitle}
          title="Modal with title"
          closable={false}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          onClose={() => setState({ isOpenModalWithTitle: false })}>
            You can't close this modal on ESC or overlay click
            <Button size="s" onClick={() => setState({ isOpenModalWithTitle: false })}>Close</Button>
        </Modal>
      </div>
      <br/>
      <div>
        <Button size="s" onClick={() => setState({ isOpenCustomModal: true })}>Open custom modal</Button>
        <Modal
          active={state.isOpenCustomModal}
          title={<header><h1>Custom Header</h1></header>}
          footer={(
            <div>
              <Button size="s" onClick={() => setState({ isOpenCustomModal: false })}>Cancel</Button>
              <Button size="s" onClick={() => setState({ isOpenCustomModal: false })}>Ok</Button>
            </div>
          )}
          onClose={() => setState({ isOpenCustomModal: false })}>
            Press ESC or click on overlay to close this modal
            <List items={Array.apply(null, Array(100)).map(() => 'List Item')} />
        </Modal>
      </div>
      <br/>
      <div>
        <Button size="s" onClick={() => setState({ isOpenFullscreenModal: true })}>Open fullscreen modal</Button>
        <Modal
          active={state.isOpenFullscreenModal}
          title="Full Screen modal"
          fullscreen
          onClose={() => setState({ isOpenFullscreenModal: false })}
          footer={(
            <div>
              <Button size="s" onClick={() => setState({ isOpenFullscreenModal: false })}>Cancel</Button>
              <Button size="s" onClick={() => setState({ isOpenFullscreenModal: false })}>Ok</Button>
            </div>
          )}>
            <List items={['London', 'Amsterdam', 'Madrid']} />
        </Modal>
      </div>
      <br/>
      <div>
        <Button size="s" onClick={() => setState({ isOpenModalWithDelay: true })}>Open modal with delay</Button>
        <Modal
          active={state.isOpenModalWithDelay}
          delay={600}
          onClose={() => setState({ isOpenModalWithDelay: false })}>
            Modal Content
        </Modal>
      </div>
    </div>
