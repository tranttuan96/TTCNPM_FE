import { BrowserRouter, Switch } from 'react-router-dom'
import CartPage from './pages/User/CartPage';
import Homepage from './pages/User/Homepage';
import Searchpage from './pages/User/Searchpage';
import HomeAdmin from './pages/Admin/HomeAdmin';
import QuanLyThucDon from './pages/Admin/QuanLyThucDon';
import AdminSearchpage from './pages/Admin/AdminSearchpage';
import BaoCaoDoanhThu from './pages/Admin/BaoCaoDoanhThu';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';
import { BlankTemplate } from './templates/BlankTemplate/BlankTemplate';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import { ChefTemplate } from './templates/ChefTemplate/ChefTemplate';
import Chefpage from './pages/Chef/Chefpage.js';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserTemplate exact path='/search/keyword=:tuKhoa' component={Searchpage}/>
        <BlankTemplate exact path='/cart' component={CartPage}/>
        <UserTemplate exact path='/' component={Homepage}/>
				<AdminTemplate exact path='/admin' component={HomeAdmin}/>
				<AdminTemplate exact path='/admin/quanlythucdon' component={QuanLyThucDon}/>
				{/* <AdminTemplate exact path='/admin/baocaodoanhthu' component={BaoCaoDoanhThu}/> */}
        <ChefTemplate exact path='/chef' component={Chefpage} />
				<AdminTemplate exact path='/admin/quanlythucdon/search/keyword=:tuKhoa' component={AdminSearchpage}/>
				<AdminTemplate exact path='/admin/baocaodoanhthu' component={BaoCaoDoanhThu}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
