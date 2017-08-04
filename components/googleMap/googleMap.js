import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';

export default class GoogleMap extends Component {
  componentDidMount() {
    this.initialize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.google) {
      return;
    }

    this.initialize(nextProps);
  }

  createMarker(google, pointData, index, map, newInfoWindow) {
    const { markerClickHandler } = this.props;
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

    if (typeof markerClickHandler === 'function') {
      const onMarkerClick = markerClickHandler.bind(newMarker, index);
      newMarker.addListener('click', onMarkerClick);
    }

    return newMarker;
  }

  createInfoWindow(google, pointData, index, map) {
    const { infoWindowClickHandler, infoWindowOnCloseHandler } = this.props;
    const { position, info } = pointData;
    const { content, opened } = info;

    const newWindow = new google.maps.InfoWindow({
      position,
      ...info,
    });

    const infoWindowContent = document.createElement('div');
    infoWindowContent.className = `ui-google-map__info-window-content ui-google-map__info-window-content-${index}`;
    infoWindowContent.innerHTML = content;

    if (typeof infoWindowClickHandler === 'function') {
      const onInfoClick = infoWindowClickHandler.bind(infoWindowContent, index);
      infoWindowContent.addEventListener('click', onInfoClick);
    }

    if (typeof infoWindowOnCloseHandler === 'function') {
      const onInfoClose = infoWindowOnCloseHandler.bind(newWindow, index);
      newWindow.addListener('closeclick', onInfoClose);
    }

    newWindow.setContent(infoWindowContent);

    if (opened) {
      newWindow.open(map);
    }

    return newWindow;
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

    const myWindows = [];
    const myMarkers = [];

    points.forEach((point, i) => {
      let newInfoWindow;

      if (point.showInfo) {
        newInfoWindow = this.createInfoWindow(google, point, i, map);
        myWindows.push(newInfoWindow);
      }

      if (point.showMarker === false) {
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
  infoWindowClickHandler: PropTypes.func,
  infoWindowOnCloseHandler: PropTypes.func,
  mapTypeControl: PropTypes.bool,
  markerClickHandler: PropTypes.func,
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
