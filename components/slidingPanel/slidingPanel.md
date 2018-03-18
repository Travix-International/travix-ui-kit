Basic Sliding Panel:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onClose={() => setState({ isSlidingPanelOpen: false })}
      >
        <SlidingPanelHeader>
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>
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
      >
        <SlidingPanelHeader>
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>
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
      >
        <SlidingPanelHeader>
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>
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
      >
        <SlidingPanelHeader>
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>
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
      >
        <SlidingPanelHeader
          rightBlock={<button data-rel="close"> close me! </button>}
          leftBlock={<button data-rel="close"> ← </button>}
        >
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>
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
      >
        <SlidingPanelHeader>
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>
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
      >
        <SlidingPanelHeader
          backButtonLabel="Back to the website"
          onBackButtonClick={() => {
            alert('Going back...');
            setState({ isSlidingPanelOpen: false });
          }}
          useDefaultLeftBlock={true}
        >
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>
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
        onClose={() => setState({ isSlidingPanelOpen: false })}
      >
        <SlidingPanelHeader>
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>

          <Button onClick={() => setState({ isOpenBaseModal: !state.isOpenBaseModal })} >Open Modal </Button>
        </SlidingPanelContent>

        <SlidingPanelFooter>
          <button data-rel="close" key="1">Close</button>
          <button key="2">Action button</button>
        </SlidingPanelFooter>

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
      >
        <SlidingPanelHeader>
          Panel title
        </SlidingPanelHeader>

        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel.<br/><br/>
          <button data-rel="close">Close</button>
        </SlidingPanelContent>

        <SlidingPanelFooter>
          <button data-rel="close" key="close">Close</button>
          <button key="action">Action button</button>
        </SlidingPanelFooter>
      </SlidingPanel>
    </div>
