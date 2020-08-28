import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Loader from '../components/Loader';
import NotFoundPage from '../components/NotFoundPage';

const ChatPage = React.lazy(() => import('../components/ChatPage'));

const AppRouter = () => (
  <BrowserRouter>
    <React.Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <Route path="/chat" component={ChatPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
    </React.Suspense>
  </BrowserRouter>
);

export default AppRouter;
