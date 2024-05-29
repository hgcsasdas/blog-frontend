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

export const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog/:blog', component: BlogComponent },
  { path: 'create-blog', component: CreateBlogComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent},
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/inicio' },
];
