import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { CreateBlogComponent } from './pages/create-blog/create-blog.component';
import { BlogComponent } from './pages/blog/blog.component'; // Importa BlogComponent
import { ProfileComponent } from './pages/profile/profile.component';
import { TermsOfUseComponent } from './pages/legal/terms-of-use/terms-of-use.component';
import { PrivacyPolicyComponent } from './pages/legal/privacy-policy/privacy-policy.component';
import { CookiesPolicyComponent } from './pages/legal/cookies-policy/cookies-policy.component';
import { unloggedGuard } from './guards/user/unlogged.guard';
import { ApiDocumentationComponent } from './pages/api-documentation/api-documentation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'api-documentation', component: ApiDocumentationComponent },

  { path: 'registro', component: RegistroComponent },
  { path: 'blogs', component: BlogsComponent, canActivate: [unloggedGuard] },
  {
    path: 'blog/:blog',
    component: BlogComponent,
    canActivate: [unloggedGuard],
  },
  {
    path: 'create-blog',
    component: CreateBlogComponent,
    canActivate: [unloggedGuard],
  },
  {
    path: 'create-blog/:idBlog',
    component: CreateBlogComponent,
    canActivate: [unloggedGuard],
  },

  /* LEGAL */

  { path: 'terminos-y-condiciones', component: TermsOfUseComponent },
  { path: 'politica-de-privacidad', component: PrivacyPolicyComponent },
  { path: 'politica-de-cookies', component: CookiesPolicyComponent },

  /**/
  { path: 'admin', component: AdminComponent, canActivate: [unloggedGuard] },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [unloggedGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    canActivate: [unloggedGuard],
  },
  { path: '**', redirectTo: '/inicio' },
];
