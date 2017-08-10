Map:

    initialState = {
      zoomControl: true,
      mapTypeControl: true,
      enableCustomStyles: false,
      enableCustomMarker: false,
      points: [{
        position: { lat: 52.379189, lng: 4.899431 },
        customMarker: true,
        info: {
          title: 'custom title',
        },
      }],
      center: { lat: 52.379189, lng: 4.899431 },
      customStyles: [
        { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
        { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{ color: '#263c3f' }],
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#6b9a76' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{ color: '#38414e' }],
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#212a37' }],
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{ olor: '#9ca5b3' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{ color: '#746855' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{ color: '#1f2835' }],
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#f3d19c' }],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{ color: '#2f3948' }],
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#d59563' }],
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{ color: '#17263c' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{ color: '#515c6d' }],
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{ color: '#17263c' }],
        },
      ],
    };

    <div style={{marginTop: '10px'}}>
      <div>
        <Checkbox
          checked={state.zoomControl}
          name="zoomControl"
          onChange={() => setState({ zoomControl: !state.zoomControl })}
        >
          show zoom control
        </Checkbox>
        <Checkbox
          checked={state.mapTypeControl}
          name="mapTypeControl"
          onChange={() => setState({ mapTypeControl: !state.mapTypeControl })}
        >
          show map type control
        </Checkbox>
        <Checkbox
          checked={state.enableCustomStyles}
          name="enableCustomStyles"
          onChange={() => setState({ enableCustomStyles: !state.enableCustomStyles })}
        >
          enable custom styles (example)
        </Checkbox>
        <Checkbox
          checked={state.enableCustomMarker}
          name="enableCustomMarker"
          onChange={() => setState({ enableCustomMarker: !state.enableCustomMarker })}
        >
          enable custom marker (example)
        </Checkbox>
      </div>
      <GoogleMap
        apiKey=""
        points={state.enableCustomMarker ? state.points : undefined}
        center={state.enableCustomMarker ? state.center : undefined}
        google={window.google}
        zoomControl={state.zoomControl}
        mapTypeControl={state.mapTypeControl}
        styles={state.enableCustomStyles ? state.customStyles : []}
      />
    </div>
