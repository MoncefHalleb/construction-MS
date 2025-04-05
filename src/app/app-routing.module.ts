import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackHomeComponent } from "./back/back-home/back-home.component";


import { ReclamationComponent } from "./components/Reclamationn/reclamation/reclamation.component";
import { ReclamationListComponent } from "./components/Reclamationn/reclamation-list/reclamation-list.component";
import { ReclamationEditComponent } from "./components/Reclamationn/reclamation-edit/reclamation-edit.component";
import { ReponseComponent } from "./components/Reponsee/reponse/reponse.component";
import { ReponseListComponent } from "./components/Reponsee/reponse-list/reponse-list.component";
import { AuthGuard } from "./guard/auth.guard";
import { UserManagementComponentComponent } from "./back/UserComponents/user-management-component/user-management-component.component";
import { NavBarComponent } from "./back/nav-bar/nav-bar.component";
import { NavBarFrontComponent } from "./front/nav-bar-front/nav-bar-front.component";
import { LoginComponent } from "./login/login.component";
import { ProfileBackComponent } from "./back/UserComponents/profile-back/profile-back.component";
import { UpdateUserComponent } from "./back/UserComponents/update-user/update-user.component";

import { AllFilesComponent } from './back/all-files/all-files.component';
import {
  ReclamationStatistiqueComponent
} from "./components/Reclamationn/reclamation-statistique/reclamation-statistique.component";
import {
  ReclamationListUserComponent
} from "./components/Reclamationn/reclamation-list-user/reclamation-list-user.component";
import {
  ReclamationEditUserComponent
} from "./components/Reclamationn/reclamation-edit-user/reclamation-edit-user.component";
import { ReponseEditComponent } from "./components/Reponsee/reponse-edit/reponse-edit.component";
import { BackComponent } from './back/back.component';
import { AdminAuthGuard } from './guard/admin-auth.guard';
import { UserAuthGuard } from './guard/user-auth.guard';
import { HomeComponent } from './front/home/home.component';
import { FrontComponent } from './front/front.component';
import { ProfileComponent } from './profile/profile.component';
import { UpdateProfileComponent } from './updateprofile/updateprofile.component';

const routes: Routes = [


  { path: '', component: LoginComponent },
  {
    path: 'admins',
    canActivate: [AdminAuthGuard],
    component: BackComponent,
    data: { roles: ['admin'] },
    children:
      [
        { path: '', component: BackHomeComponent },
        { path: 'add', component: UserManagementComponentComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'update/:email', component: UpdateUserComponent },
        { path: 'reclamationList', component: ReclamationListComponent },
        { path: 'reclamationEdit/:id', component: ReclamationEditComponent },
        { path: 'reponse/:id', component: ReponseComponent },
        { path: 'reponseList', component: ReponseListComponent },
        { path: 'reponse', component: ReponseComponent },

        { path: 'filepostulation', component: AllFilesComponent },
        { path: 'reclamationStatistique', component: ReclamationStatistiqueComponent },
        { path: 'reponseEdit', component: ReponseEditComponent },
        { path: 'reponseEdit/:id', component: ReponseEditComponent },
        { path: 'reclamationListUser', component: ReclamationListUserComponent },
        { path: 'reclamationEditUser/:id', component: ReclamationEditUserComponent },
        { path: 'reclamationStatistique', component: ReclamationStatistiqueComponent },

      ]
  },
  {
    path: 'user',
    canActivate: [UserAuthGuard],
    component: FrontComponent,
    data: { roles: ['user'] },
    children:
      [
        { path: '', component: HomeComponent },
        { path: 'reclamation', component: ReclamationComponent },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['user', 'admin'] } },
        { path: 'updateprofile/:email', component: UpdateProfileComponent },
        { path: 'reclamationListUser', component: ReclamationListUserComponent },
        { path: 'reclamationEditUser/:id', component: ReclamationEditUserComponent },
        { path: 'reclamationStatistique', component: ReclamationStatistiqueComponent },


        { path: 'reclamation', component: ReclamationComponent },
      ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
