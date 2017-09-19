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

Sliding Panel with preclosing hook:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
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

Sliding Panel with preclosing hook which prevent closing:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>
      <SlidingPanel
        active={state.isSlidingPanelOpen}
        beforeClosing={() => { alert('You shall not pass! :)'); return false; }}
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
