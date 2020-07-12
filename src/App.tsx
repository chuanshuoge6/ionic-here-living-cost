import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Here1 from './pages/Tab2';
import Here2 from './pages/Tab3';
import Here3 from './pages/Tab4';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (

  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/cost_of_living" component={Home} exact={true} />
        <Route path="/purchase_power" component={Here1} exact={true} />
        <Route path="/rent" component={Here2} exact={true} />
        <Route path="/groceries" component={Here3} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/purchase_power" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
