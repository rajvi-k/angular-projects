import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FilterResolverService } from '../../services/filter-resolver.service';
import { ProjectFiltersComponent } from '../../components/dashboard/project-dashboard/project-filters/project-filters.component';
import { ApplicationDashboardComponent } from '../../components/dashboard/application-dashboard/application-dashboard.component';
import { ApplicationResolverService } from '../../services/application-resolver.service';
import { AllProjectsComponent } from '../../components/dashboard/all-projects/all-projects.component';

const routes: Routes = [
  {
    path: 'project/:proj_id',
    component: ProjectFiltersComponent,
    resolve:{
      project_data:FilterResolverService
    }
  },
  {
    path:'project/:proj_id/apps/:app_id',
    component:ApplicationDashboardComponent,
    resolve:{
      app_data:ApplicationResolverService
    }
    
  },
  {
    path:'allprojects',
    component:AllProjectsComponent
  },

  
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardRouterModule { }
