import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import ReactDOM from 'react-dom';

/**
 * GoogleMap component
 */
export default class GoogleMap extends Component {
  /**
   * Calls custom marker constructor for further using while creating new markers
   *
   * @method constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.overlay = null;
    this.CustomMarker = this.initCustomMarkerConstructor();
  }

  /**
   * Calls initialize method passing google api and options
   *
   * @method componentDidMount
   */
  componentDidMount() {
    this.initialize(this.props);
  }

  /**
   * Calls initialize method to reinit a map passing new options
   *
   * @method componentWillReceiveProps
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (!nextProps.google) {
      return;
    }

    this.initialize(nextProps);
  }

  /**
   * Calls passed handler for marker click event if any
   *
   * @method handleMarkerClick
   * @param {Number} index - index of marker from marker array
   */
  handleMarkerClick = (index) => {
    if (typeof this.props.onMarkerClick === 'function') {
      this.props.onMarkerClick(index);
    }
  }

  /**
   * Initializes custom marker constructor
   *
   * @method initCustomMarkerConstructor
   * @return {function} CustomMarker constructor
   */
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

  /**
   * Create normal marker using passed props
   *
   * @method createMarker
   * @param {Object} google - google api object
   * @param {Object} pointData - contains config for position, marker, info window
   * @param {Number} index - index of marker from marker array
   * @param {Object} map - map where to put a new marker
   * @param {Object} newInfoWindow - info window data
   * @return {Object} newMarker instance
   */
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

  /**
   * Calls Custom Marker constructor and links new marker to `this`
   *
   * @method createCustomMarker
   * @param {Object} google - google api object
   * @param {Object} pointData - contains config for position, marker, info window
   * @param {Number} index - index of marker from marker array
   * @param {Object} map - map where to put a new marker
   */
  createCustomMarker(google, pointData, index, map) {
    this.overlay = new this.CustomMarker(pointData, map, index);
  }

  /**
   * Sets up a map with passed options and calls a corresponding methods for creating markers
   *
   * @method initialize
   * @param {Object} options - google api object
   */
  initialize(options) {
    const { zoom, styles, center, restMapSettings, points, zoomControl, mapTypeControl, google } = options;

    if (!google) {
      return;
    }

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

  /**
   * Sets up a map with passed options and calls a corresponding methods for creating markers
   *
   * @method linkRef
   * @param {Object} ref - node object to be linked as a ref; a map will be rendered here
   */
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
  /**
   * Map center coordinates.
   */
  center: PropTypes.object,
  /**
   * Special google api object.
   */
  google: PropTypes.object.isRequired,
  /**
   * The height of map container.
   */
  height: PropTypes.string,
  /**
   * Visibility of map type control.
   */
  mapTypeControl: PropTypes.bool,
  /**
   * Optional onClick handler for markers.
   */
  onMarkerClick: PropTypes.func,
  /**
   * Points coordinates.
   */
  points: PropTypes.arrayOf(PropTypes.object),
  /**
   * Any other properies Google API allows for customization.
   */
  restMapSettings: PropTypes.object,
  /**
   * Object which contains settings for custom style.
   * It has special format.
   * Please, check docs: https://developers.google.com/maps/documentation/javascript/style-reference
   */
  styles: PropTypes.arrayOf(PropTypes.object),
  /**
   * The width of map container.
   */
  width: PropTypes.string,
  /**
   * The initial resolution at which to display the map. As a rule, from 0 to 18.
   */
  zoom: PropTypes.number,
  /**
   * Visibility of zoom control.
   */
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
