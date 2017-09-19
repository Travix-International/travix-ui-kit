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

Sliding Panel with preopening and preclosing hooks:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        beforeOpening={() => alert('You are trying to open a sidepanel.')}
        active={state.isSlidingPanelOpen}
        beforeClosing={() => alert('You are trying to close a sidepanel.')}
        onClose={() => setState({ isSlidingPanelOpen: false })}
        title="Panel Title"
      >
        This is an example<br/>
        Of how simple it is to use<br/>
        Our sliding panel.<br/><br/>
        <button data-rel="close">Close</button>
      </SlidingPanel>
    </div>

Sliding Panel unclosable with buttons:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        closeOnButtonsClick={false}
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
