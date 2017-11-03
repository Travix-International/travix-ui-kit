Basic toggleButton:

    <div>
      <ToggleButton
        handleSelect={(e, selectedIndex) => setState({ selectedIndex1: selectedIndex })}
        items={['Upper deck', 'Lower deck']}
        mods={['insurance']}
        selectedIndex={state.selectedIndex1}
      /><br/><br/>
      <ToggleButton
        handleSelect={(e, selectedIndex) => setState({ selectedIndex2: selectedIndex }) }
        items={['Example with specific', 'item selected initially']}
        mods={['insurance']}
        selectedIndex={typeof state.selectedIndex2 !== 'undefined' ? state.selectedIndex2 : 1}
      /><br/><br/>
    </div>
