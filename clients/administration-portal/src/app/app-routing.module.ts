import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SplashpageComponent } from './splashpage/splashpage.component';

const routes: Routes = [
  { path: '', component: SplashpageComponent },
  { path: 'login', component: LoginpageComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/internalusers/internalusers.module').then(
        (m) => m.InternalusersModule
      ),
  },
  {
    path: 'clients',
    loadChildren: () =>
      import('./modules/externalusers/externalusers.module').then(
        (m) => m.ExternalusersModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
