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

      <br/>
      <br/>

      <Collapse isAccordion onChange={key => setState({ example1ActiveKey: key })} activeKey={state.example1ActiveKey}>
        <CollapseItem title="Collapse Title 1" id="example1.1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2" id="example1.2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Open multiple:

    <div>
      <Collapse>
        <CollapseItem title="Collapse Title 1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>
