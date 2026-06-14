import OrderController from './OrderController'
import Admin from './Admin'
import CodController from './CodController'
import MidtransController from './MidtransController'
import Settings from './Settings'
const Controllers = {
    OrderController: Object.assign(OrderController, OrderController),
Admin: Object.assign(Admin, Admin),
CodController: Object.assign(CodController, CodController),
MidtransController: Object.assign(MidtransController, MidtransController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers