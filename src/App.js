import { BrowserRouter, Switch } from 'react-router-dom'
import CartPage from './pages/User/CartPage';
import Homepage from './pages/User/Homepage';
import Searchpage from './pages/User/Searchpage';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import { BlankTemplate } from './templates/BlankTemplate/BlankTemplate';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserTemplate exact path='/search/keyword=:tuKhoa' component={Searchpage}/>
        <BlankTemplate exact path='/cart' component={CartPage}/>
        <UserTemplate exact path='/' component={Homepage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
