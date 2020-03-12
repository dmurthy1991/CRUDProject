import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStoreComponent } from './components/add-store/add-store.component';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
import { StoresComponent } from './components/stores/stores.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'stores' },
  { path: 'add-store', component: AddStoreComponent },
  { path: 'edit-store/:id', component: EditStoreComponent },
  { path: 'stores', component: StoresComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
