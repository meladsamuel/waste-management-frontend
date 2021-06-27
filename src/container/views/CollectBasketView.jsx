import React, { useState, useEffect, useCallback } from 'react';
import {
  DirectionsService,
  DirectionsRenderer,
  Marker,
} from '@react-google-maps/api';
import {
  Grid,
  makeStyles,
  TextField,
  InputAdornment,
  LinearProgress,
} from '@material-ui/core';
import { Switch, Route, useHistory, useParams } from 'react-router-dom';
import { Alert } from '@material-ui/lab';
import Map from '../../component/Map';
import SubmitModal from '../../component/SubmitModal';
import { useGet } from '../../api';
import mapStyle from '../../mapStyle';

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    flex: 1,
    position: 'relative',
    '@media (min-width:0px) and (orientation: landscape)': {
      height: `calc(100% - ${theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)'].minHeight}px)`,
    },
    '@media (min-width:600px)': {
      height: `calc(100% - ${theme.mixins.toolbar['@media (min-width:600px)'].minHeight}px)`,
    },
    height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
  },
  '@global': {
    'html, body, #root': {
      height: '100%',
    },
  },
  info: {
    maxWidth: 200,
    marginTop: theme.spacing(3),
    position: 'absolute',
    right: theme.spacing(3),
    zIndex: 1,
  },
}));

const CollectBasketView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [response, setResponse] = useState(null);
  const { action } = useParams();
  const [params, setParams] = useState({ basket_level: 70, section_level: 90 });
  const [loading, setLoading] = useState(false);
  const {
    payload: basketsPayload,
    setPayload: setBasketsPayload,
    isPending: loadingBasket,
    getAll: getCollectBasket,
  } = useGet(
    `/baskets?basket_level=${params.basket_level}&section_level=${params.section_level}`,
    () => history.push('/collect/show')
  );
  const waypoints = React.useMemo(() => {
    const points = basketsPayload?.baskets.map((basket) => ({
      location: {
        lat: basket.latitude,
        lng: basket.longitude,
      },
    }));
    return points;
  }, [basketsPayload]);
  useEffect(() => {
    if (action === 'show') {
      getCollectBasket();
    } else {
      setBasketsPayload(null);
      setOrigin(null);
      setDestination(null);
    }
    return () => {
      setBasketsPayload(null);
      setOrigin(null);
      setDestination(null);
    };
  }, []);
  const handleClick = (event) => {
    if (!origin) {
      setOrigin({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    } else if (!destination) {
      setDestination({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      setLoading(true);
    }
  };
  const options = React.useMemo(() => {
    return {
      disableDefaultUI: true,
      styles: mapStyle,
      center: { lat: 30.04442, lng: 31.235712 },
      zoom: 10,
    };
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    getCollectBasket();
  };
  const handleInputChange = (event) => {
    setParams((oldParams) => ({
      ...oldParams,
      [event.target.name]: +event.target.value,
    }));
  };
  const directionsCallback = useCallback((res) => {
    if (res !== null && !response) {
      if (res.status === 'OK') {
        setResponse(res);
        console.log(response);
      } else {
        console.log('response: ', res);
      }
    }
  }, []);
  return (
    <div className={classes.mapContainer}>
      <Switch>
        <Route path="/collect/set">
          <SubmitModal
            title="Collect baskets according to a certain level"
            onSubmit={handleSubmit}
            submitLabel="check level"
            open
            onClose={() => history.push('/collect/set-start-end')}
            onLoading={loadingBasket}
          >
            <Grid container spacing={1}>
              <Grid item xs={12} sm>
                <TextField
                  fullWidth
                  variant="outlined"
                  name="basket_level"
                  type="number"
                  label="Basket Level"
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="number"
                  name="section_level"
                  label="Section Level"
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </SubmitModal>
        </Route>
        <Route path="/collect/show">
          {loading && <LinearProgress />}
          <Alert variant="outlined" className={classes.info} severity="info">
            Please click on the map to set the start point and end point
          </Alert>
          <Map onClick={handleClick} data={basketsPayload} options={options}>
            <>
              {origin && destination && !response && (
                <DirectionsService
                  options={{
                    destination,
                    origin,
                    waypoints,
                    optimizeWaypoints: true,
                    travelMode: 'DRIVING',
                  }}
                  callback={directionsCallback}
                  onLoad={() => setLoading(false)}
                />
              )}
              {response && (
                <DirectionsRenderer
                  options={{ directions: response }}
                  onLoad={() => setLoading(false)}
                />
              )}
              {origin && <Marker position={origin} />}
              {destination && <Marker position={destination} />}
            </>
          </Map>
        </Route>
      </Switch>
    </div>
  );
};
export default React.memo(CollectBasketView);
