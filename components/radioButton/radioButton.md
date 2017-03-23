Radio Button:

    <div>
      <RadioButton id="radio_0" name="testRadioButton0" />
      <RadioButton children="test 1" checked id="radio_1" name="testRadioButton1" onChange={alert} />
      <RadioButton dataAttrs={{gtm: 'radioButtonId'}} id="radio_2" name="testRadioButton2" onChange={alert}>with custom data attribute</RadioButton>
      <RadioButton children={<span>with html element</span>} checked id="radio_3" name="testRadioButton3" onChange={alert} />
      <RadioButton disabled id="radio_4" name="testRadioButton4" onChange={alert}>disabled</RadioButton>
      <RadioButton id="radio_10" name="testRadioButton10" />
    </div>
