SelectionBlock:

    initialState = {
      iconColor: '#ccc',
      selectedCard: null,
      type: 'horizontal',
      align: 'center',
    };

    <div>
      <div style={{ paddingBottom: '20px', display: 'flex' }}>
        <div>
          <RadioButton
            checked={state.type === 'horizontal'} 
            id="selectionBlockTypeHorizontal" 
            name="selectionBlockType"
            onChange={() => setState({ type: 'horizontal' })}
          >
            type: horizontal
          </RadioButton>
          <RadioButton
            checked={state.type === 'vertical'} 
            id="selectionBlockTypeVertical" 
            name="selectionBlockType"
            onChange={() => setState({ type: 'vertical' })}
          >
            type: vertical
          </RadioButton>
        </div>
        <div>
          <RadioButton
            disabled={state.type === 'vertical'}
            checked={state.align === 'start'} 
            id="selectionBlockAlignStart" 
            name="selectionBlockAlign"
            onChange={() => setState({ align: 'start' })}
          >
            align: start
          </RadioButton>
          <RadioButton
            disabled={state.type === 'vertical'}
            checked={state.align === 'center'} 
            id="selectionBlockAlignCenter" 
            name="selectionBlockAlign"
            onChange={() => setState({ align: 'center' })}
          >
            align: center
          </RadioButton>
          <RadioButton
            disabled={state.type === 'vertical'}
            checked={state.align === 'end'} 
            id="selectionBlockAlignEnd" 
            name="selectionBlockAlign"
            onChange={() => setState({ align: 'end' })}
          >
            align: end
          </RadioButton>
        </div>
      </div>
      <SelectionBlock
        align={state.align}
        icon=<span style={{ fontSize: '60px', color: state.iconColor }}>{!state.selectedCard ? '☻' : '☺'}</span>
        logo=<img style={{ height: '30px' }} src="https://www.travix.com/wp-content/uploads/2015/09/travix-logo_blue.png" />
        logoLabel="Powered by"
        subtitle="Subtitle Example"
        title="Title Example"
        type={state.type}
      >
        <div style={{ display: state.type === 'horizontal' ? 'block' : 'flex' }} >
          {[0,1].map(item =>
            <Card 
              checked={state.selectedCard === item} 
              showIcon hovering 
              onClick={() => setState({ selectedCard: item, iconColor: item ? 'var(--tx-generic-color-negative-light)' : 'var(--tx-generic-color-active)' })}
            >
              <div style={{ background: 'var(--tx-generic-color-secondary)', padding: '50px', borderRadius: '8px' }}>
                {item ? 'NO' : 'YES'}
              </div>
            </Card>
          )}
        </div>
      </SelectionBlock>
    </div>
