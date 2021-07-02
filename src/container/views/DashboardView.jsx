import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useGet } from '../../api';

const useStyles = makeStyles((theme) => ({
  containerBox: {
    '&>*': {
      padding: theme.spacing(2),
    },
  },
}));
const DashboardView = () => {
  const classes = useStyles();
  const { payload, getAll } = useGet('/count');
  useEffect(getAll, []);
  return (
    <Container>
      <Box
        pt={1}
        pb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h3">Dashboard</Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3} className={classes.containerBox}>
          <Paper>
            <Typography variant="h5" align="center">
              Total Basket
            </Typography>
            <Typography variant="h2" align="center">
              {payload?.total_baskets}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.containerBox}>
          <Paper>
            <Typography variant="h5" align="center">
              Full Basket
            </Typography>
            <Typography variant="h2" align="center">
              {payload?.full_baskets}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.containerBox}>
          <Paper>
            <Typography variant="h5" align="center">
              Total Users
            </Typography>
            <Typography variant="h2" align="center">
              {payload?.total_users}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3} className={classes.containerBox}>
          <Paper>
            <Typography variant="h5" align="center">
              Pending Users
            </Typography>
            <Typography variant="h2" align="center">
              {payload?.pending_users}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardView;
