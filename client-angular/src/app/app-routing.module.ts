import { unauthenticatedOnlyGuard } from './app-guards/unauthenticated-only/unauthenticated-only.guard'
import { authenticatedOnlyGuard } from '@/app-guards/authenticated-only/authenticated-only.guard'
import { userLoaderGuard } from '@/app-guards/user-loader/user-loader.guard'
import { NoReuseRouteReuseStrategy } from '@/no-reuse.route-reuse-strategy'
import { NgModule } from '@angular/core'
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router'

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

      // TODO give app its own module (named as HomeModule since AppModule is taken)
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
  imports: [
    RouterModule.forRoot(routes, {
      bindToComponentInputs: true,
    }),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: NoReuseRouteReuseStrategy,
    },
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
