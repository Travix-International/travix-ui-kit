Basic Sliding Panel:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel with custom width:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        width="720px"
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel with preclosing hook:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onTryingToClose={() => alert('You are trying to close a sidepanel.')}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel with preclosing hook which prevent closing:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onTryingToClose={() => confirm('Are you sure you want to exit?')}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>


Sliding Panel with custom left and right blocks in the header:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        rightBlock={<button data-rel="close" style={{ marginRight: '15px' }}> close me! </button>}
        leftBlock={<button data-rel="close" style={{ marginLeft: '15px' }}> ← </button>}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel opening from the left:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        direction='left'
        onClose={() => setState({ isSlidingPanelOpen: false })}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel with custom subheader

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        subheader={
          <div
            style={{background: '#ffd05e', height: '96px' }}>
              * Additional information.
          </div>
        }
        width="720px"
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel with default block with back button

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        width="750px"
        active={state.isSlidingPanelOpen}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        useDefaultLeftBlock={true}
        backButtonLabel="Back to the website"
        onBackButtonClick={() => {
          alert('Going back...');
          setState({ isSlidingPanelOpen: false });
        }}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel with global

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        global
        footer={[
          <button data-rel="close">Close</button>,
          <button>Action button</button>
          ]}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        title="Panel Title"
      >
        <div>
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        This is an example<br/>
        </div>
        <Button onClick={() => setState({ isOpenBaseModal: !state.isOpenBaseModal })} >Open Modal </Button>
        <Modal
          active={state.isOpenBaseModal}
          onClose={() => setState({ isOpenBaseModal: false })}>
            Modal Content
        </Modal>
      </SlidingPanel>
    </div>


Sliding Panel with the sticky footer

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        footer={[
          <button data-rel="close">Close</button>,
          <button>Action button</button>
          ]}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        This is an example<br/>
      </SlidingPanel>
    </div>
