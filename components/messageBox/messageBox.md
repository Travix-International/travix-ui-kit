MessageBox:

    initialState = {
      icon: null,
      title: null,
      type: null,
    };

    <div>
      <Checkbox
        checked={!!state.icon}
        name="icon"
        onChange={e => setState({ icon: e.target.checked ? (
          <div style={{ fontSize: '48px', color: 'red' }}>✅</div>
        ) : null })}
      >
        icon
      </Checkbox>
      <Checkbox
        checked={!!state.title}
        name="title"
        onChange={e => setState({ title: e.target.checked ? 'MessageBox\'s title' : null })}
      >
        title
      </Checkbox>

      <br />

      {['info', 'success', 'error'].map(type => (
        <RadioButton
          checked={type === state.type}
          children={type}
          id={type}
          key={type}
          name="type"
          onChange={onChange=e => setState({ type })}
        />
      ))}

      <br />

      <MessageBox icon={state.icon} title={state.title} type={state.type}>
        <div>{'Hey, you are so awesome! '.repeat(15)}</div>
      </MessageBox>
    </div>
