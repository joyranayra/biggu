import DashboardController from './DashboardController'
import ProductController from './ProductController'
import WorkshopController from './WorkshopController'
import OrderAdminController from './OrderAdminController'
const Admin = {
    DashboardController: Object.assign(DashboardController, DashboardController),
ProductController: Object.assign(ProductController, ProductController),
WorkshopController: Object.assign(WorkshopController, WorkshopController),
OrderAdminController: Object.assign(OrderAdminController, OrderAdminController),
}

export default Admin