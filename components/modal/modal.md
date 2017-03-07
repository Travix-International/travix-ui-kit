Basic Modal:

    <div>
      <Button size="s" onClick={() => setState({ isOpen: true })}>Ope modal</Button>
      <Modal
        title="Modal with List component" active={state.isOpen}
        footer="Modal Footer"
        onClose={() => setState({ isOpen: false })}>
          <List items={['London', 'Amsterdam', 'Madrid']} />
      </Modal>
    </div>
