import React from 'react';
import MapViewDirections from 'react-native-maps-directions';

const Directions = ({destination, origin, onReady}) => (
  <MapViewDirections
    destination={destination}
    origin={origin}
    onReady={onReady}
    apikey="AIzaSyDqnA4clAnRQs89qfNdccBWv7KACcgDc04"
    strokeWidth={3}
    strokeColor="#222"
  />
);

export default Directions;
