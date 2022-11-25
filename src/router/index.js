import { createRouter, createWebHistory } from 'vue-router'

// Login
import Login from '../views/Login.vue';

// Product
import Product from '../views/Product.vue';
import AddProduct from '../views/AddProduct.vue';
import EditProduct from '../views/EditProduct.vue';

// User
import User from '../views/User.vue';
import AddUser from '../views/AddUser.vue';
import EditUser from '../views/EditUser.vue';

// Account
import Account from '../views/Account.vue';
import AddAccount from '../views/AddAccount.vue';
import EditAccount from '../views/EditAccount.vue';

// Category
import Category from '../views/Category.vue';
import AddCategory from '../views/AddCategory.vue';
import EditCategory from '../views/EditCategory.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/product',
    name: 'Product',
    component: Product,
  },
  {
    path: '/product/add',
    name: 'add-product',
    component: AddProduct,
  },
  {
    path: '/edit-product/:id',
    name: 'edit-product',
    component: EditProduct,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/account/add',
    name: 'add-account',
    component: AddAccount,
  },
  {
    path: '/edit-account/:id',
    name: 'edit-account',
    component: EditAccount,
  },
  
  {
    path: '/user',
    name: 'User',
    component: User,
  },
  {
    path: '/user/add',
    name: 'add-user',
    component: AddUser,
  },
  {
    path: '/edit-user/:id',
    name: 'edit-user',
    component: EditUser,
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/category/add',
    name: 'add-category',
    component: AddCategory,
  },
  {
    path: '/edit-category/:id',
    name: 'edit-category',
    component: EditCategory,
  },
  
  // {
  //   path: '/edit-product/:id',
  //   name: 'edit-product',
  //   component: EditProduct,
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes
})

export default router
