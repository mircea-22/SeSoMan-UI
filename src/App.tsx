import { Typography } from '@mui/material';
import './App.css';
import { PrivacyNotice } from './components/Privacy-Notice/PrivacyNotice';
import { HashRouter, Route, Switch} from  'react-router-dom';
import { DataSelection } from './components/Data-Selection/DataSelection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/pro-light-svg-icons';
import { LoginPage } from './components/Login-Page/LoginPage';
import { Dashboard } from './components/Dashboard/Dashboard';

const Routes = () => {


  return(
    <HashRouter>
        <Switch>
          <Route path='/privacy-notice'>
            <PrivacyNotice/>
          </Route>
          <Route path='/data-selection'>
            <DataSelection/>
          </Route>
          <Route path='/login/:service'>
            <LoginPage/>
          </Route>
          <Route path='/dashboard'>
            <Dashboard/>
          </Route>
        </Switch>
        </HashRouter>
  );
}

const Title = () =>{
  return(
    <div className='title-wrapper'>
        <FontAwesomeIcon color={'white'} icon={faHandshake} size='2xl'/>
        <Typography  className='app-title' variant="h5">
          SeSoMan
        </Typography>
    </div>
  )
}

export function App(){

  

 

  // Listen for route changes and update background accordingly
 

  return (
    <div className="App">
      <Title/>
      <Routes/>
    </div>
  );
}

export default App;
