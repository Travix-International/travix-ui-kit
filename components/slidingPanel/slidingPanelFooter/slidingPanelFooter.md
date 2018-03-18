Sliding Panel Footer:

    <div>
      <button
        onClick={() => setState({ isSlidingPanelOpen: !state.isSlidingPanelOpen })}
      >Open panel</button>

      <SlidingPanel
        active={state.isSlidingPanelOpen}
        onClose={() => setState({ isSlidingPanelOpen: false })}
      >
        <SlidingPanelContent>
          This is an example<br/>
          Of how simple it is to use<br/>
          Our sliding panel footer.<br/><br/>
        </SlidingPanelContent>
        <SlidingPanelFooter>
          <button data-rel="close" key="1">Close</button>
          <button key="2">Action button</button>
        </SlidingPanelFooter>
      </SlidingPanel>
    </div>