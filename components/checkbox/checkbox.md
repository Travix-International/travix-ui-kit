Basic checkbox:

    <div>
      <div>
        <Checkbox name="checkboxTest1" onChange={() => {alert('without text')}}/><br/><br/>
        <Checkbox name="checkboxTest2" checked onChange={() => {alert('checked')}}>checked</Checkbox><br/>
        <Checkbox name="checkboxTest3" disabled onChange={() => {alert('disabled')}}>disabled</Checkbox><br/>
        <Checkbox
          name="checkboxTest4"
          checked={state.value}
          onChange={() => {setState({value: !state.value})}}
          inputAttr={{role: "radio"}}>
          can toggle
        </Checkbox>
      </div>
    </div>
