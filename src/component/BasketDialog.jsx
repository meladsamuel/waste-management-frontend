import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Dialog,
  DialogContent,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Slide,
  Grid,
} from '@material-ui/core';
import Chart from 'react-apexcharts';
import { Close as CloseIcon } from '@material-ui/icons';
import { useGet } from '../api';
import { useSocket } from '../contexts/SocketContext';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getBasket = (basketList, id) => {
  for (let index = 0; index < basketList.length; index += 1)
    if (basketList[index].id === id) return basketList[index];
  return { sections: null };
};
const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },

  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const BasketDialog = ({
  setOpenDialog,
  openDialog,
  baskets,
  basketId,
  setBasketId,
}) => {
  const classes = useStyles();
  const socket = useSocket();
  const {
    payload: wastesPayload,
    setPayload: setWastesPayload,
    isPending: loadingWastes,
    getByPK: getBasketWaste,
  } = useGet('baskets');

  useEffect(() => {
    if (basketId) getBasketWaste(`${basketId}/wastes`);
  }, [basketId]);

  useEffect(() => {
    if (!socket || !wastesPayload || loadingWastes) return;
    socket.on('add-wastes', ({ wastes }) => {
      const newWastes = wastesPayload.wastes.map((element) => {
        if (element.category === wastes.category) {
          element.data.push({ date: wastes.date, height: wastes.waste_height });
          return element;
        }
        return element;
      });
      setWastesPayload({ wastes: newWastes });
    });
  }, [socket, loadingWastes]);

  const basketLevels = React.useMemo(() => {
    if (!baskets || !basketId) return null;
    const graph = {
      series: [],
      options: {
        plotOptions: {
          radialBar: {
            dataLabels: { total: { show: true, label: 'Total wastes' } },
          },
        },
        stroke: { lineCap: 'round' },
        labels: [],
      },
    };
    const { sections } = getBasket(baskets, basketId);
    for (let i = 0; i < sections.length; i += 1) {
      graph.series.push(sections[i].level);
      graph.options.labels.push(sections[i].category);
    }

    return graph;
  }, [basketId, baskets]);

  const basketWastes = React.useMemo(() => {
    if (!wastesPayload) return null;
    const graph = { series: [], options: { xaxis: { type: 'datetime' } } };
    const { wastes } = wastesPayload;
    for (let i = 0; i < wastes.length; i += 1) {
      graph.series[i] = { name: wastes[i].category, data: [] };
      for (let j = 0; j < wastes[i].data.length; j += 1) {
        graph.series[i].data[j] = {
          x: wastes[i].data[j].date,
          y: wastes[i].data[j].height,
        };
      }
    }
    return graph;
  }, [basketId, baskets, wastesPayload]);

  const handleClose = () => {
    setWastesPayload(null);
    setBasketId(null);
    setOpenDialog(false);
  };

  return (
    <Dialog fullScreen open={openDialog} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Basket {`#${basketId}`}
          </Typography>
          <IconButton
            autoFocus
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Grid container>
          <Grid item xs={12} md={4}>
            {basketLevels && (
              <Chart
                options={basketLevels.options}
                series={basketLevels.series}
                type="radialBar"
                width="100%"
              />
            )}
          </Grid>
          <Grid item xs={12} md={8}>
            {basketWastes && (
              <Chart
                options={basketWastes.options}
                series={basketWastes.series}
                type="line"
                width="100%"
              />
            )}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

BasketDialog.defaultProps = {
  baskets: null,
  basketId: null,
  setBasketId: () => null,
};
BasketDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  setOpenDialog: PropTypes.func.isRequired,
  setBasketId: PropTypes.func,
  basketId: PropTypes.number,
  baskets: PropTypes.arrayOf(
    PropTypes.shape({
      basket: {
        id: PropTypes.number,
        longitude: PropTypes.number,
        latitude: PropTypes.number,
        micro_controller: PropTypes.string,
        software_versions: PropTypes.string,
        sections: PropTypes.arrayOf({
          category: PropTypes.string,
          level: PropTypes.number,
        }),
      },
    })
  ),
};

export default BasketDialog;
