import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import MainLayout from './container/layouts/main';
import ClientLayout from './container/layouts/client';
import HomeView from './container/views/HomeView';
import MapView from './container/views/MapView';
import UploadFileView from './container/views/UploadFileView';
import NotFoundView from './container/views/NotFoundView';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <ClientLayout>
              <HomeView />
            </ClientLayout>
          </Route>
          <Route path="/dashboard">
            <MainLayout>
              <Typography variant="h3">Dashborad Page</Typography>
            </MainLayout>
          </Route>
          <Route path="/baskets/:action">
            <MainLayout hasPadding={false}>
              <MapView />
            </MainLayout>
          </Route>
          <Route path="/update">
            <MainLayout>
              <UploadFileView />
            </MainLayout>
          </Route>
          <Route path="/employees/:action">
            <MainLayout>
              <Typography variant="h3">Employees Page</Typography>
            </MainLayout>
          </Route>
          <Route>
            <NotFoundView />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
