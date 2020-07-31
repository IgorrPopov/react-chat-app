import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Loader from '../components/Loader';
import LoginPage from '../components/LoginPage';

const ChatPage = React.lazy(() => import('../components/ChatPage'));

const AppRouter = () => (
  <BrowserRouter>
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/chat" component={ChatPage} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

export default AppRouter;
