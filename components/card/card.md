Position top:

    initialState = {
      isCardChecked: true,
      isCardTransparent: false,
      isCardShowIcon: true,
      isCardHovering: true,
      cardTag: 'div',
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
      <div>Tag:</div>
      <RadioButton checked={state.cardTag === 'div'} id="div" name="cardTag" onChange={() => setState({ cardTag: 'div' })}>div</RadioButton>
      <RadioButton checked={state.cardTag === 'section'} id="section" name="cardTag" onChange={() => setState({ cardTag: 'section' })}>section</RadioButton>

      <Card checked={state.isCardChecked} showIcon={state.isCardShowIcon} transparent={state.isCardTransparent} hovering={state.isCardHovering} tag={state.cardTag} onClick={() => setState({ isCardChecked: !state.isCardChecked })} dataAttrs={{'gtm-id': 'card1'}}>
        <p>Card content</p>
      </Card>
    </div>
