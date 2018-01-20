Loading overlay:

    initialState = {
      messageDirection: 'right',
      loading: true,
      transparency: false,
      showLoadingMessage: true,
      spinner: true,
    };

    <div>
      <div>
        <Checkbox
          checked={state.loading}
          name="loading"
          onChange={() => setState({ loading: !state.loading })}
        >
          Enable loading
        </Checkbox>
        <Checkbox
          checked={state.loading && state.transparency}
          disabled={!state.loading}
          name="transparency"
          onChange={() => setState({ transparency: !state.transparency })}
        >
          Enable transparency
        </Checkbox>
        <Checkbox
          checked={state.loading && state.showLoadingMessage}
          disabled={!state.loading}
          name="showLoadingMessage"
          onChange={() => setState({ showLoadingMessage: !state.showLoadingMessage })}
        >
          Show loading message
        </Checkbox>
        <Checkbox
          checked={state.loading && state.spinner}
          disabled={!state.loading}
          name="spinner"
          onChange={() => setState({ spinner: !state.spinner })}
        >
          Show spinner
        </Checkbox>
        <div style={{ margin: '15px 0' }}>
          <div style={{ marginBottom: '7px' }}> Message direction: </div>
          {['left', 'right', 'top', 'bottom'].map(messageDirection => (
            <RadioButton
              checked={state.loading && state.spinner && state.showLoadingMessage && messageDirection === state.messageDirection}
              children={messageDirection}
              disabled={!(state.loading && state.spinner && state.showLoadingMessage)}
              id={messageDirection}
              key={messageDirection}
              name="message-messageDirection"
              onChange={onChange = e => setState({ messageDirection })}
            />
          ))}
        </div>
      </div>
      <LoadingOverlay
        loading={state.loading}
        message={state.showLoadingMessage && "Loading"}
        messageDirection={state.messageDirection}
        spinner={state.spinner}
        transparency={state.transparency}
      >
        At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
        <button onClick={() => console.log('clicked!')}> click! </button>
      </LoadingOverlay>
    </div>
