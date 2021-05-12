import { BrowserRouter, Switch } from 'react-router-dom'
import Homepage from './pages/User/Homepage';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserTemplate exact path='/' component={Homepage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
