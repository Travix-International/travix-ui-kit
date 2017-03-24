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

Open one with expanded first item by default:

    <div style={{marginTop: '10px'}}>
      <Collapse isAccordion onChange={key => setState({ example1ActiveKey: key })} activeKey={(state.example1ActiveKey === undefined ? 'example1.1' : state.example1ActiveKey)}>
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

Open multiple with expanded items by default:

    <div style={{marginTop: '10px'}}>
      <Collapse activeKey={state.example2ActiveKey || ['example2.1', 'example2.2']} onChange={key => setState({ example2ActiveKey: key })}>
        <CollapseItem title="Collapse Title 1" id="example2.1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2" id="example2.2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>
