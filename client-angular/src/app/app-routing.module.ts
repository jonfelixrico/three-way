import { unauthenticatedOnlyGuard } from './app-guards/unauthenticated-only/unauthenticated-only.guard'
import { authenticatedOnlyGuard } from '@/app-guards/authenticated-only/authenticated-only.guard'
import { userLoaderGuard } from '@/app-guards/user-loader/user-loader.guard'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    canActivateChild: [userLoaderGuard],

    children: [
      {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login-page/login-page.module').then(
            (m) => m.LoginPageModule
          ),
        canActivateChild: [unauthenticatedOnlyGuard],
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register-page/register-page.module').then(
            (m) => m.RegisterPageModule
          ),
        canActivateChild: [unauthenticatedOnlyGuard],
      },
      {
        path: 'app',
        canActivateChild: [authenticatedOnlyGuard],
        children: [
          {
            path: '',
            redirectTo: 'chat',
            pathMatch: 'full',
          },
          {
            path: 'chat',
            loadChildren: () =>
              import('./chat-page/chat-page.module').then(
                (m) => m.ChatPageModule
              ),
          },
        ],
      },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
