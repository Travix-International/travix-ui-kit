Basic button:

    <div>
      <Button onClick={alert}>Show alert</Button><br/><br/>
      <Button onClick={alert} disabled={true}>Disabled</Button><br/><br/>
      <Button dataAttrs={{gtm: 'some-id'}} type="reset">With GTM id</Button><br/><br/>
      <Button className="my-class">Example with custom class set</Button><br/><br/>
    </div>

Sizes:

    <div>
      <Button type="reset" size="xs">Extra small</Button><br/><br/>
      <Button type="reset" size="s">Small</Button><br/><br/>
      <Button type="reset" size="m">Medium</Button><br/><br/>
      <Button type="reset" size="l">Large</Button><br/><br/>
      <Button type="reset" size="xl">Extra large</Button><br/><br/>
    </div>

Variations - Ghost:

    <div>
      <Button onClick={alert} variation="ghost" size="xs">Extra small Ghost</Button><br/><br/>
      <Button onClick={alert} variation="ghost" size="s">Small Ghost</Button><br/><br/>
      <Button onClick={alert} variation="ghost" size="m">Medium Ghost</Button><br/><br/>
      <Button onClick={alert} variation="ghost" size="l">Large Ghost</Button><br/><br/>
      <Button onClick={alert} variation="ghost" size="xl">Extra large Ghost</Button><br/><br/>
    </div>

Variations - Link:

    <div>
      <Button onClick={alert} variation="link">Link button</Button><br/><br/>
      <p>
        You can put a <Button onClick={alert} variation="link">link button</Button><br/> along with regular text.
      </p>
    </div>

