Basic toggleButton:

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
    </ToggleButton>
      
      
Passing the selected item:

    <ToggleButton
      handleSelect={(e, selectedIndex) => setState({ selectedIndex3: selectedIndex })}
      selectedIndex={state.selectedIndex3 !== undefined ? state.selectedIndex3 : 1}
    >
      <ToggleItem>
        Example with specific
      </ToggleItem>
      <ToggleItem>
        item selected initially
      </ToggleItem>
    </ToggleButton>

Passing items as property (deprecated):

    <ToggleButton
      handleSelect={(e, selectedIndex) => setState({ selectedIndex4: selectedIndex })}
      selectedIndex={state.selectedIndex4}
      items={['Upper', 'Lower']}
    />

More items:

    <ToggleButton
      handleSelect={(e, selectedIndex) => setState({ selectedIndex1: selectedIndex })}
      selectedIndex={state.selectedIndex1}
    >
      <ToggleItem>
        Banana
      </ToggleItem>
      <ToggleItem>
        Apple
      </ToggleItem>
      <ToggleItem>
        Strawberry
      </ToggleItem>
      <ToggleItem>
        Pineapple
      </ToggleItem>
      <ToggleItem>
        Avocado
      </ToggleItem>
    </ToggleButton>


Passing data attributes:

    <ToggleButton
      data-gtm-id={123}
      handleSelect={(e, selectedIndex) => setState({ selectedIndex1: selectedIndex })}
      selectedIndex={state.selectedIndex1}
    >
      <ToggleItem data-xivart-elm={'upper'}>
        Upper <strong>deck</strong>
      </ToggleItem>
      <ToggleItem>
        Lower <strong>deck</strong>
      </ToggleItem>
    </ToggleButton>

Passing className:

    <div>
      <style dangerouslySetInnerHTML={{__html: `
        .toggleButton {
          margin: 30px;
        }

        .toggleItem {
          color: #ff9000;
        }
      `}} />

      <ToggleButton
        className={'toggleButton'}
        data-gtm-id={123}
        handleSelect={(e, selectedIndex) => setState({ selectedIndex1: selectedIndex })}
        selectedIndex={state.selectedIndex1}
      >
        <ToggleItem data-xivart-elm={'upper'}>
          Upper <strong>deck</strong>
        </ToggleItem>
        <ToggleItem className={'toggleItem'}>
          Lower <strong>deck</strong>
        </ToggleItem>
      </ToggleButton>
    </div>
