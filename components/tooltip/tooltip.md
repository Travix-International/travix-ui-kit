Also check OverlayTrigger specification.

    initialState = {
      align: 'center',
      customOppositeOffset: false,
      onElementHideAction: false,
      onElementShowAction: false,
      position: 'top',
      showCloseButton: false,
      showCloseButton: false,
      triggerAction: 'click',
    };

    <div>
      <div style={{ marginBottom: "20px", display: "flex" }}>
        <div style={{ marginRight: "15px" }}>
          <div style={{ marginBottom: "10px" }}> Trigger action: </div>
          {['hover', 'click'].map(action => (
            <RadioButton
              checked={action === state.triggerAction}
              children={action}
              id={action}
              key={action}
              name="action"
              onChange={onChange = e => setState({ triggerAction: action })}
            />
          ))}
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ marginBottom: "10px" }}> Position: </div>
          {['top', 'right', 'left', 'bottom'].map(pos => (
            <RadioButton
              checked={pos === state.position}
              children={pos}
              id={pos}
              key={pos}
              name="pos"
              onChange={onChange = e => setState({ position: pos })}
            />
          ))}
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ marginBottom: "10px" }}> Align: </div>
          {['center', 'start', 'end'].map(align => (
            <RadioButton
              checked={align === state.align}
              children={align}
              id={align}
              key={align}
              name="align"
              onChange={onChange = e => setState({ align })}
            />
          ))}
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ marginBottom: "10px" }}> Do something: </div>
            <Checkbox
              checked={state.onElementHideAction}
              name="onElementHideAction"
              onChange={e => setState({ onElementHideAction: !state.onElementHideAction })}
            >
              elementOnHide action
            </Checkbox>
            <Checkbox
              checked={state.onElementShowAction}
              name="onElementShowAction"
              onChange={e => setState({ onElementShowAction: !state.onElementShowAction })}
            >
              elementOnShow action
            </Checkbox>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ marginBottom: "10px" }}> Change some indentations: </div>
            <Checkbox
              checked={state.customOppositeOffset}
              name="customOppositeOffset"
              onChange={e => setState({ customOppositeOffset: !state.customOppositeOffset })}
            >
              custom axisOffset
            </Checkbox>
        </div>
        <div style={{ marginRight: "15px" }}>
          <div style={{ marginBottom: "10px" }}> Show close button: </div>
            <Checkbox
              checked={state.showCloseButton && state.triggerAction === 'click'}
              disabled={state.triggerAction !== 'click'}
              name="showCloseButton"
              onChange={e => setState({ showCloseButton: !state.showCloseButton })}
            >
              show close button
            </Checkbox>
        </div>
      </div>
      <OverlayTrigger
        triggerAction={state.triggerAction}
        onElementHide={state.onElementHideAction ? () => { alert(':(') } : () => {}}
        onElementShow={state.onElementShowAction ? () => { alert('hi :)') } : () => {}}
        elemToToggle={
          <Tooltip
            align={state.align}
            margin={state.customMargin ? '22px' : undefined}
            axisOffsetX={state.customOppositeOffset ? '-50%' : undefined}
            axisOffsetY={state.customOppositeOffset ? '-100px' : undefined}
            position={state.position}
            showCloseButton={state.showCloseButton}
            width="250px"
          >
            <div>
              <b> Lorem Ipsum </b> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </div>
          </Tooltip>
        }>
        <div style={{ width: "600px" }}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
        </div>
      </OverlayTrigger>
    </div>
