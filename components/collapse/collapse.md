Open one:

    <div style={{marginTop: '10px'}}>
      <Collapse isAccordion>
        <CollapseItem title="Collapse Title 1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>


With label on the right:

    <div style={{marginTop: '10px'}}>
      <Collapse isAccordion labelPosition="right">
        <CollapseItem title="Collapse Title 1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Open one with expanded first item by default:

    <div style={{marginTop: '10px'}}>
      <Collapse isAccordion defaultActiveKey="example1.1">
        <CollapseItem title="Collapse Title 1" id="example1.1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2" id="example1.2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Custom title:

    <div style={{marginTop: '10px'}}>
      <Collapse isAccordion>
        <CollapseItem title={<h2>Custom Title 1</h2>} id="example1.1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title={<h2>Custom Title 2</h2>} id="example1.2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Open one based on props:

    initialState = {
      activeKey: 'example1.1'
    };

    <div style={{marginTop: '10px'}}>
      <Button onClick={key => setState({ activeKey: null })} size="xs">Reset</Button><br/><br/>
      <Collapse isAccordion defaultActiveKey="example1.2" onChange={key => setState({ activeKey: key })} activeKey={(state.activeKey)}>
        <CollapseItem title="Collapse Title 1" id="example1.1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2" id="example1.2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Open multiple:

    <div style={{marginTop: '10px'}}>
      <Collapse>
        <CollapseItem title="Collapse Title 1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Open multiple items with expanded(1st and 3th) by default:

    <div style={{marginTop: '10px'}}>
      <Collapse defaultActiveKey={['example2.1', 'example2.3']}>
        <CollapseItem title="Collapse Title 1" id="example2.1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2" id="example2.2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2" id="example2.3">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Open multiple based on props:

    initialState = {
      activeKey: ['example3.2']
    };

    <div style={{marginTop: '10px'}}>
      <Collapse activeKey={state.activeKey} onChange={key => setState({ activeKey: key })}>
        <CollapseItem title="Collapse Title 1" id="example3.1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2" id="example3.2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>
