import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';

export default class GoogleMap extends Component {
  constructor(props) {
    super(props);

    this.overlay = null;
    this.CustomMarker = this.initCustomMarkerConstructor();
  }

  componentDidMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.google) {
      return;
    }

    this.initialize(nextProps);
  }

  handleMarkerClick = (index) => {
    if (typeof this.props.onMarkerClick === 'function') {
      this.props.onMarkerClick(index);
    }
  }

  initCustomMarkerConstructor() {
    const { google } = this.props;
    const handleCustomMarkerClick = this.handleMarkerClick;

    function CustomMarker(pointData, map, index) {
      const { position, info } = pointData;

      this.latlng = position;
      this.info = info;
      this.index = index;
      this.setMap(map);
    }

    CustomMarker.prototype = new google.maps.OverlayView();

    CustomMarker.prototype.draw = function draw() {
      let div = this.div;
      if (!div) {
        div = document.createElement('DIV');
        this.div = div;
        div.style.position = 'absolute';
        div.style.paddingLeft = '0px';
        div.style.cursor = 'pointer';
        div.style.width = '10px';
        div.style.height = '10px';
        div.classList.add('ui-google-map__custom-marker');

        if (this.info && this.info.title) {
          div.setAttribute('title', this.info.title);
        }

        if (this.info && this.info.content && this.info.content instanceof HTMLElement) {
          div.appendChild(this.info.content);
        }

        google.maps.event.addDomListener(div, 'click', () => {
          handleCustomMarkerClick(this.index);
        });

        const panes = this.getPanes();
        panes.overlayImage.appendChild(div);
      }

      const { lat, lng } = this.latlng;
      const curPosition = new google.maps.LatLng(lat, lng);
      const point = this.getProjection().fromLatLngToDivPixel(curPosition);

      if (point) {
        div.style.left = `${point.x}px`;
        div.style.top = `${point.y}px`;
      }
    };

    return CustomMarker;
  }

  createMarker(google, pointData, index, map, newInfoWindow) {
    const { onMarkerClick } = this.props;
    const { position, marker, info } = pointData;

    let newMarker;

    if (!marker) {
      newMarker = new google.maps.Marker({
        map,
        position,
      });
    } else {
      const { title, label, icon } = marker;

      newMarker = new google.maps.Marker({
        label,
        map,
        position,
        title,
        icon,
        ...marker,
      });
    }

    if (newInfoWindow && info && !info.opened) {
      newMarker.addListener('click', () => {
        newInfoWindow.open(map, newMarker);
      });
    }

    if (typeof onMarkerClick === 'function') {
      const onClick = onMarkerClick.bind(newMarker, index);
      newMarker.addListener('click', onClick);
    }

    return newMarker;
  }

  createCustomMarker(google, pointData, index, map) {
    this.overlay = new this.CustomMarker(pointData, map, index);
  }

  initialize(options) {
    const { zoom, styles, center, restMapSettings, points, zoomControl, mapTypeControl, google } = options;

    const settings = {
      zoom,
      styles,
      center,
      mapTypeControl,
      mapTypeControlOptions: { style: google.maps.MapTypeControlStyle.DEFAULT },
      zoomControl,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      ...restMapSettings,
    };

    const map = new google.maps.Map(ReactDOM.findDOMNode(this.mapContainer), settings);

    const myMarkers = [];

    points.forEach((point, i) => {
      let newInfoWindow;

      if (point.customMarker) {
        this.overlay = this.createCustomMarker(google, point, i, map);
        return;
      }

      const newMarker = this.createMarker(google, point, i, map, newInfoWindow);
      myMarkers.push(newMarker);
    });
  }

  linkRef = (ref) => {
    this.mapContainer = ref;
  }

  render() {
    const { width, height } = this.props;
    return (
      <div
        className="ui-google-map"
        ref={this.linkRef}
        style={{ width, height }}
      />
    );
  }
}

GoogleMap.propTypes = {
  center: PropTypes.object,
  google: PropTypes.object,
  height: PropTypes.string,
  mapTypeControl: PropTypes.bool,
  onMarkerClick: PropTypes.func,
  points: PropTypes.arrayOf(PropTypes.object),
  restMapSettings: PropTypes.object,
  styles: PropTypes.arrayOf(PropTypes.object),
  width: PropTypes.string,
  zoom: PropTypes.number,
  zoomControl: PropTypes.bool,
};

GoogleMap.defaultProps = {
  center: { lat: 52.379189, lng: 4.899431 },
  height: '400px',
  mapTypeControl: true,
  points: [
    {
      position: { lat: 52.379189, lng: 4.899431 },
    },
  ],
  width: '400px',
  zoom: 10,
  zoomControl: true,
  styles: [],
};
