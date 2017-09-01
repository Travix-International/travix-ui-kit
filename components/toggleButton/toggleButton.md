Basic toggleButton:

    <div>
      <ToggleButton items={['Upper deck', 'Lower deck']} handleSelect={(msg) => console.log(msg)} /><br/><br/>
    </div>

Extend toggleButton:

    <div>
      <ToggleButton items={['Upper deck', 'Middle deck', 'Lower deck']} handleSelect={(msg) => console.log(msg)} /><br/><br/>
    </div>