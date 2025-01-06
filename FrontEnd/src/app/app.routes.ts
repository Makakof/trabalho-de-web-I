import { Routes } from '@angular/router';
import { LayoutLoginComponent } from './layout-login/layout-login.component';
import { LoginComponent } from './layout-login/login/login.component';
import { CadastroComponent } from './layout-login/cadastro/cadastro.component';
import { LayoutComponent } from './layout/layout.component';
import { authGuard } from './guards/auth.guard';
import { RecipesComponent } from './recipes/recipes.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RecipeComponent } from './recipe/recipe.component';
import { PerfilComponent } from './perfil/perfil.component';

import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';

import { CreateRecipeComponent } from './create-recipe/create-recipe.component';


export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home/recipes'
  },
  {
    path: 'home',
    component: LayoutComponent,
    children: [
      {path: 'create-recipe', component: CreateRecipeComponent},
      {path: 'recipes', component: RecipesComponent},
      {path: 'recipes/:id', component: ViewRecipeComponent},
      {path: 'books', component: SidebarComponent, canActivate: [authGuard]},
      {path: 'perfil', component: PerfilComponent, canActivate: [authGuard]},
      {path: 'mine', component: MyRecipesComponent, canActivate: [authGuard]},
      {path: 'teste', component: ViewRecipeComponent}
    ]
  },
  {
    path: 'user',
    component: LayoutLoginComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'cadastro', component: CadastroComponent}
    ]
  },
];
