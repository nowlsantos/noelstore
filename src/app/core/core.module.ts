/* Angular */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

/* Components */
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    HomeComponent,
    NavigationComponent,
    LoginComponent
  ],
  exports: [
    NavigationComponent
  ]
})
export class CoreModule { }
