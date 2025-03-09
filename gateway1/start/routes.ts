const UsersController = () => import('#controllers/users_controller')
const SessionController = () => import('#controllers/session_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const TransactionsController = () => import('#controllers/transactions_controller')
const GatewaysController = () => import('#controllers/gateways_controller')
const ProductsController = () => import('#controllers/products_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.post('login', [SessionController, 'store'])
router.post('user', [UsersController, 'store'])
router.post('transactions', [TransactionsController, 'store'])
router
  .group(() => {
    router.get('user/:id', [UsersController, 'show'])
    router.put('user/:id', [UsersController, 'update'])
    router.delete('user/:id', [UsersController, 'destroy'])
    router.get('user', [UsersController, 'index'])
    router.resource('product', ProductsController)
    router.put('user/:id/role', [UsersController, 'role'])
    router.resource('gateway', GatewaysController)
    router.get('transactions', [TransactionsController, 'index'])
  })
  .use(middleware.auth())
