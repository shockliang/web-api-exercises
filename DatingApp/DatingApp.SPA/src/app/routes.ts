import { ListResolver } from './resolvers/list.resolver';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '', runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver } },
      { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver } },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver },
        canDeactivate: [PreventUnsavedChangesGuard]
      },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent, resolve: { users: ListResolver } }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
