Position top:

    initialState = {
      isCardChecked: true,
      isCardTransparent: false,
      isCardShowIcon: false,
    };

    <div style={{ background: 'var(--tx-generic-color-secondary)', padding: '15px' }}>
      <Checkbox
        checked={state.isCardChecked}
        name="isCardChecked"
        onChange={() => setState({ isCardChecked: !state.isCardChecked })}
      >
        Checked
      </Checkbox>
      <Checkbox
        checked={state.isCardTransparent}
        name="isCardTransparent"
        onChange={() => setState({ isCardTransparent: !state.isCardTransparent })}
      >
        Transparent
      </Checkbox>
      <Checkbox
        checked={state.isCardHovering}
        name="isCardHovering"
        onChange={() => setState({ isCardHovering: !state.isCardHovering })}
      >
        Hovering
      </Checkbox>
      <Checkbox
        checked={state.isCardShowIcon}
        name="isCardShowIcon"
        onChange={() => setState({ isCardShowIcon: !state.isCardShowIcon })}
      >
        Show icon
      </Checkbox>

      <Card checked={state.isCardChecked} showIcon={state.isCardShowIcon} transparent={state.isCardTransparent} hovering={state.isCardHovering} onClick={() => setState({ isCardChecked: !state.isCardChecked })}>
        <p>Card content</p>
      </Card>
    </div>
