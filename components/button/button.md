Basic button:

    <div>
      <Button onClick={alert}>Show alert</Button><br/><br/>
      <Button onClick={alert} disabled={true}>Disabled</Button><br/><br/>
      <Button dataAttrs={{gtm: 'some-id'}} type="reset">With GTM id</Button><br/><br/>
    </div>

Sizes:

    <div>
      <Button type="reset" size="xs">Extra small</Button><br/><br/>
      <Button type="reset" size="s">Small</Button><br/><br/>
      <Button type="reset" size="m">Medium</Button><br/><br/>
      <Button type="reset" size="l">Large</Button><br/><br/>
      <Button type="reset" size="xl">Extra large</Button><br/><br/>
    </div>
