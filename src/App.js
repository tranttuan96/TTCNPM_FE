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
import Checkout from './pages/User/Checkout';
import UpdateDishStt from './pages/Chef/UpdateDishStatus';
import OrderDetail from './pages/User/OrderDetail';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <UserTemplate exact path='/search/keyword=:tuKhoa' component={Searchpage}/>
        <BlankTemplate exact path='/checkout/:orderID' component={Checkout}/>
        <BlankTemplate exact path='/cart' component={CartPage}/>
        <BlankTemplate exact path='/orderdetail/:orderID' component={OrderDetail}/>
				<AdminTemplate exact path='/admin' component={QuanLyThucDon}/>
				<AdminTemplate exact path='/admin/quanlythucdon' component={QuanLyThucDon}/>
				<AdminTemplate exact path='/admin/quanlythucdon/search/keyword=:tuKhoa' component={AdminSearchpage}/>
				<AdminTemplate exact path='/admin/baocaodoanhthu' component={BaoCaoDoanhThu}/>
        <ChefTemplate exact path='/chef' component={Chefpage} />
				<ChefTemplate exact path='/stt' component={UpdateDishStt} />
        <UserTemplate exact path='/' component={Homepage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
