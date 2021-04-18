import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core';

const center = {
  lat: -3.745,
  lng: -38.523,
};
const useStyles = makeStyles((theme) => ({
  mapContainer: {
    flex: 1,
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  },
  '@global': {
    'html, body, #root': {
      height: '100%',
    },
  },
}));

function MapWrapper() {
  const classes = useStyles();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });

  const [, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={classes.mapContainer}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : (
    <h1>loading map</h1>
  );
}
export default React.memo(MapWrapper);
