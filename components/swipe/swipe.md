Swipe:
    
    initialState = {
      direction: ''
    };

    <div>
      <Swipe style={{ background: "#CCC", padding: "50px", font: "normal 15px Arial"}}
        onLeft={() => setState({ direction: 'left' })}
        onRight={() => setState({ direction: 'right' })}
        onUp={() => setState({ direction: 'up' })}
        onDown={() => setState({ direction: 'down' })}
      >
        <div>
          <h4>Swipe me!</h4>  
          <p>Direction: <b>{state.direction.toUpperCase()}</b></p>
        </div>
      </Swipe>
    </div>