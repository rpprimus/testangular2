import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './shared/services/auth.guard';
import { StoreRoutingModule } from './store/store-routing.module';
import { RoleGuardService } from './shared/services/role-guard.service';
import { Enum } from './shared/config/enum.enum';
import { ClientSelectionService } from './shared/services/client-selection.service';
import { LandingComponent } from './components/landing/landing.component';


const routes: Routes = [
  {
    path: 'admin',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  {
    path: 'users',
    loadChildren: 'app/components/user/user.module#UserModule',  //lazy load the users component
    canActivate: [RoleGuardService]
  },
  {
    path: 'clients',
    loadChildren: 'app/components/client/client.module#ClientModule',   //lazy load the clients component
    canActivate: [RoleGuardService]
  },
  {
    path: 'client-store-users',
    loadChildren: 'app/components/client-store-user/client-store-user.module#ClientStoreUserModule',  //lazy load the clients store user component
    canActivate: [RoleGuardService, ClientSelectionService], data: { roles: [Enum.CreditCard_Admin, Enum.ADMIN, Enum.MANAGER, Enum.Store_Admin] }
  },
  {
    path: 'warehouse',
    loadChildren: 'app/components/warehouse/warehouse.module#WarehouseModule',   //lazy load the warehouse component
    canActivate: [RoleGuardService]
  },
  {
    path: 'category',
    loadChildren: 'app/components/category/category.module#CategoryModule',
    canActivate: [RoleGuardService, ClientSelectionService], data: { roles: [Enum.CreditCard_Admin, Enum.ADMIN, Enum.MANAGER] }
  },
  {
    path: 'product',
    loadChildren: 'app/components/product/product.module#ProductModule',
    canActivate: [ClientSelectionService]
  },
  {
    path: 'inventory',
    loadChildren: 'app/components/inventory/inventory.module#InventoryModule',
    canActivate: [ClientSelectionService]
  },
  {
    path: 'orders',
    loadChildren: 'app/components/order-list/orderlist.module#OrderListModule',
    canActivate: [ClientSelectionService]    //here role permission is not given because this component is opened in store as well and no additional role permission was required
  },
  {
    path: 'manageorder',
    loadChildren: 'app/components/manage-order/manage-order.module#ManageOrderModule',
    canActivate: [ClientSelectionService]  //here role permission is not given because this component is opened in store as well and no additional role permission was required
  },
  {
    path: 'kit',
    loadChildren: 'app/components/kit/kit.module#KitModule',
    canActivate: [ClientSelectionService]
  },
  {
    path: 'damageproduct',
    loadChildren: 'app/components/damage-product/damage-product.module#DamageProductModule',
    canActivate: [RoleGuardService, ClientSelectionService], data: { roles: [Enum.CreditCard_Admin, Enum.ADMIN, Enum.MANAGER] }
  },
  {
    path: 'reports',
    loadChildren: 'app/components/reports/reports.module#ReportsModule',
    canActivate: [ClientSelectionService]
  },
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  }), StoreRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
