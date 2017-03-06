Basic Modal:

    <div>
      <Button size="s" onClick={() => setState({ isOpen: true })}>Open base modal</Button><br/><br/>
      <br/><br/>
      <Modal title="Modal Title" active={state.isOpen}>
        <Button size="s" onClick={() => setState({ isOpen: false })}>Close</Button><br/><br/>
      </Modal>
    </div>
