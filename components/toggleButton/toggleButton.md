Basic toggleButton:

    <div>
      <ToggleButton
        handleSelect={(e, selectedIndex) => setState({ selectedIndex1: selectedIndex })}
        selectedIndex={state.selectedIndex1}
      >
        <ToggleItem>
          Upper <strong>deck</strong>
        </ToggleItem>
        <ToggleItem>
          Lower <strong>deck</strong>
        </ToggleItem>
      </ToggleButton><br/><br/>
      <ToggleButton
        handleSelect={(e, selectedIndex) => setState({ selectedIndex2: selectedIndex })}
        items={['Upper deck', 'Lower deck']}
        mods={['insurance']}
        selectedIndex={state.selectedIndex2}
      /><br/><br/>
      <ToggleButton
        handleSelect={(e, selectedIndex) => setState({ selectedIndex3: selectedIndex }) }
        items={['Example with specific', 'item selected initially']}
        mods={['insurance']}
        selectedIndex={typeof state.selectedIndex3 !== 'undefined' ? state.selectedIndex3 : 1}
      /><br/><br/>
    </div>
