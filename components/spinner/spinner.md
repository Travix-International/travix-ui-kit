Spinner:

    initialState = {
      isLoadingEnabled: true,
      isTransparent: false,
    };

    <div>
      <div style={{ marginBottom: '20px' }}>
        <Checkbox
          checked={state.isLoadingEnabled}
          name="isLoadingEnabled"
          onChange={() => setState({ isLoadingEnabled: !state.isLoadingEnabled })}
        >
          Enable loading
        </Checkbox>
        <Checkbox
          checked={state.isTransparent}
          name="isTransparent"
          onChange={() => setState({ isTransparent: !state.isTransparent })}
        >
          Enable transparency
        </Checkbox>
      </div>
      <div>
        <Spinner size="xs"/><br/><br/>
        <Spinner size="s"/><br/><br/>
        <Spinner size="m"/><br/><br/>
        <Spinner size="l"/><br/><br/>
        <Spinner size="xl"/><br/><br/>

        Spinner with children:

        <Spinner size="s" loadingMessage='Loading' loading={state.isLoadingEnabled} transparent={state.isTransparent}>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.
        </Spinner>
      </div>
    </div>
