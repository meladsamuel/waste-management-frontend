import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import BasketDialog from '../../component/BasketDialog';
import Map from '../../component/Map';
import { useGet } from '../../api';
import UpdateBasketDialog from '../../component/UpdateBasket';

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
}));

function MapView() {
  const classes = useStyles();
  const [openDialog, setOpenDialog] = useState(false);
  const [basketPosition, setBasketPosition] = useState(null);
  const [selectedBasket, setSelectedBasket] = useState(null);
  const { payload, getAll: getAllBasket } = useGet('/baskets');

  const handleAddBasket = (event) => {
    console.log(event);
    setBasketPosition({ lat: event?.latLng.lat(), lng: event?.latLng.lng() });
    setOpenDialog(true);
  };

  const handleShowBaskete = () => {
    setOpenDialog(!openDialog);
  };

  const handleUpdateBasket = (event, id) => {
    setOpenDialog(!openDialog);
    setSelectedBasket(id);
  };

  useEffect(getAllBasket, []);

  return (
    <div className={classes.mapContainer}>
      <Switch>
        <Route path="/baskets/add">
          <Map
            markerClick={handleShowBaskete}
            data={payload}
            onClick={handleAddBasket}
          />
          <BasketDialog
            setOpenDialog={setOpenDialog}
            openDialog={openDialog}
            coordinates={basketPosition}
            onSuccess={getAllBasket}
          />
        </Route>
        <Route path="/baskets/show">
          <Map markerClick={handleShowBaskete} data={payload} />
        </Route>
        <Route path="/baskets/update">
          <Map markerClick={handleShowBaskete} data={payload} />
        </Route>
        <Route path="/baskets/update-software">
          <Map markerClick={handleUpdateBasket} data={payload} />
          <UpdateBasketDialog
            basket={selectedBasket}
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default MapView;
