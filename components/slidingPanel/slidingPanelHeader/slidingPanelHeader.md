Sliding Panel Header with custom left and right blocks:

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
          Our sliding panel header.<br/><br/>
        </SlidingPanelContent>
      </SlidingPanel>
    </div>

Sliding Panel Header with default block and back button

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
          Our sliding panel header.<br/><br/>
        </SlidingPanelContent>
      </SlidingPanel>
    </div>
