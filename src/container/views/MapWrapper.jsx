import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { makeStyles } from '@material-ui/core';

const center = {
  lat: 30.745,
  lng: 31.523,
};
const useStyles = makeStyles((theme) => {
  const { toolbar } = theme.mixins;
  return {
    mapContainer: {
      flex: 1,
      '@media (min-width:0px) and (orientation: landscape)': {
        minHeight: `calc(100% - ${toolbar['@media (min-width:0px) and (orientation: landscape)'].minHeight}px)`,
      },
      '@media (min-width:600px)': {
        minHeight: `calc(100% - ${toolbar['@media (min-width:600px)'].minHeight}px)`,
      },
      minHeight: `calc(100% - ${toolbar.minHeight}px)`,
    },
    '@global': {
      'html, body, #root': {
        height: '100%',
      },
    },
  };
});

function MapWrapper() {
  const classes = useStyles();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_API,
  });
  console.log(process.env);
  const [, setMap] = React.useState(null);

  const onLoad = React.useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(() => {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={classes.mapContainer}
      center={center}
      zoom={12}
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
