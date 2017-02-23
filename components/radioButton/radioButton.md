Radio Button:

    <div>
      <RadioButton />
      <RadioButton children="test 1" checked id="radio_1" name="testRadioButton1" />
      <RadioButton children={<span>with span</span>} id="radio_2" name="testRadioButton2" onChange={alert} />
      <RadioButton disabled id="radio_3" id="radio_3" name="testRadioButton3" onChange={alert}>disabled </RadioButton>
    </div>
