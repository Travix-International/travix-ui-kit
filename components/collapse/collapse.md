Open one:

    <div>
      <Collapse name="example0" accordion onChange={(e) => console.log('example0:changed', e)}>
        <CollapseItem title="Collapse Title 1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem title="Collapse Title 2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>

Open multiple:

    <div>
      <Collapse name="example1" onChange={(e) => console.log('example1:changed', e)}>
        <CollapseItem title="Collapse Title 1">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
        <CollapseItem collapsed title="Collapse Title 2">
          <List items={['London', 'Amsterdam', 'Madrid']} />
        </CollapseItem>
      </Collapse>
    </div>
