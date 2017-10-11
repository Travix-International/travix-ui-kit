Basic toggleButton:

    <div>
      <ToggleButton items={['Upper deck', 'Lower deck']} handleSelect={(msg) => console.log(msg)} mods={['insurance']} /><br/><br/>
      <ToggleButton className="container-class" items={['Example with', 'Custom Classes']} handleSelect={(msg) => console.log(msg)} /><br/><br/>
    </div>
