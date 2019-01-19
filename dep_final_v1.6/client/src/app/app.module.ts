import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// import { MaterialModule } from '@angular/material';
import { MaterialModule } from './modules/material/material.module';
import { MatSnackBarComponent } from './components/mat-snack-bar/mat-snack-bar.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
import { ProjectMainComponent } from './components/it/project-main/project-main.component';
// import { MatSnackBarComponent } from './components/mat-snack-bar/mat-snack-bar.component';
import { ProjectAdminComponent } from './components/admin/project-admin/project-admin.component';
import { UserComponent } from './components/admin/user/user.component';
// import { RoutesModule } from './modules/routes/routes.module';
import { ViewProjectComponent } from './components/admin/view-project/view-project.component';
import { EditProjectComponent } from './components/admin/edit-project/edit-project.component';
import { ViewUserComponent } from './components/admin/view-user/view-user.component';
import { RolesComponent } from './components/admin/roles/roles.component';
import { EditUserComponent } from './components/admin/edit-user/edit-user.component';
import { SidenavComponent } from './components/admin/sidenav/sidenav.component';
import { LoginComponent } from './components/login/login.component';
// import { MainDashComponent } from './components/dashboard/main-dash/main-dash.component';

import { ChartsModule as ng2Charts } from 'ng2-charts';
// import for highcharts
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export declare var require: any;

// import { CompletionTileComponent } from './components/dashboard/completion-tile/completion-tile.component';
// import { BusinessCriticalityComponent } from './components/dashboard/business-criticality/business-criticality.component';
// import { CountryBubbleComponent } from './components/dashboard/country-bubble/country-bubble.component';
// import { UiBarChartComponent } from './components/dashboard/ui-bar-chart/ui-bar-chart.component';
// import { ScoreGaugeComponent } from './components/dashboard/score-gauge/score-gauge.component';
// import { ScoreCompletionComponent } from './components/dashboard/score-completion/score-completion.component';
import { MainReportComponent } from './components/reports/main-report/main-report.component';

import { TreemapComponent } from './components/reports/treemap/treemap.component';
import { ProgressBarComponent } from './components/reports/progress-bar/progress-bar.component';
// import { ScoreSpeedometerComponent } from './components/score-speedometer/score-speedometer.component';
import { UsersTableComponent } from './components/reports/users-table/users-table.component';
import { TrialRatingComponent } from './components/it/trial-rating/trial-rating.component';
import { QuestionService } from './components/it/project-main/question.service';

import { DynamicFormQuestionComponent } from './components/it/project-main/dynamic/dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './components/it/project-main/question-control.service';
//import { RatingModule } from 'ng2-rating';
import { Exel4Component } from './components/exel4/exel4.component';
import { UserService } from './services/user-service';
import { HttpModule } from '@angular/http';
import { NgxPermissionsModule } from 'ngx-permissions';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { LocalStorageService } from 'ng2-webstorage';
import { AddAttributeComponent } from './components/admin/add-attribute/add-attribute.component';
import { DataService } from './services/data.service';
import { UserResolverService } from './services/user-resolver.service';
import { ProjectResolverService } from './services/project-resolver.service';
import { ProjectService } from './services/project-service';
import { FrontComponent } from './components/projectdashboard/front/front.component';
import { AppService } from './services/app.service';
import { MappingService } from './services/mapping.service';
import { AppResolverService } from './services/app-resolver.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AggregateResolverService } from './services/aggregate-resolver.service';
import { ExporterComponent } from './components/excelio/exporter/exporter.component';
import { ImporterComponent } from './components/excelio/importer/importer.component';
import { DashboardRouterModule } from './modules/dashboard-router/dashboard-router.module';
import { MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatChipsModule, MatCardModule, MatSelectModule } from '@angular/material';

//multiselect
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown'
//charts

import { AngularEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BusyModule } from 'angular2-busy';
import { NgProgressModule } from 'ngx-progressbar';

import { ApplicationResolverService } from './services/application-resolver.service';
import { FilterResolverService } from './services/filter-resolver.service';
import { BiDataService } from './services/bi-data.service';
import { ProjectFrontComponent } from './components/dashboard/project-dashboard/project-front/project-front.component';
import { AllApplicationsComponent } from './components/dashboard/project-dashboard/project-front/all-applications/all-applications.component';
import { BusinessCriticalityComponent } from './components/dashboard/project-dashboard/project-front/business-criticality/business-criticality.component';
import { CountryUsageComponent } from './components/dashboard/project-dashboard/project-front/country-usage/country-usage.component';
import { UiTypeComponent } from './components/dashboard/project-dashboard/project-front/ui-type/ui-type.component';
import { ProjectFiltersComponent } from './components/dashboard/project-dashboard/project-filters/project-filters.component';
import { SystemInterfaceComponent } from './components/dashboard/project-dashboard/project-front/system-interface/system-interface.component';
import { NumberTilesComponent } from './components/dashboard/project-dashboard/project-front/number-tiles/number-tiles.component';
import { ApplicationAgeComponent } from './components/dashboard/project-dashboard/project-front/application-age/application-age.component';
import { StorageProductComponent } from './components/dashboard/project-dashboard/project-front/storage-product/storage-product.component';
import { LtiOwnerComponent } from './components/dashboard/project-dashboard/project-front/echarts/lti-owner/lti-owner.component';
import { StorageTypeComponent } from './components/dashboard/project-dashboard/project-front/echarts/storage-type/storage-type.component';
import { ProjectDetailsComponent } from './components/dashboard/project-dashboard/project-details/project-details.component';
import { ApplicationDashboardComponent } from './components/dashboard/application-dashboard/application-dashboard.component';
import { OverallScoresComponent } from './components/dashboard/application-dashboard/overall-scores/overall-scores.component';
import { SpecificCategoryComponent } from './components/dashboard/application-dashboard/specific-category/specific-category.component';
import { CategoryCompletionComponent } from './components/dashboard/application-dashboard/category-completion/category-completion.component';
import { AllProjectsComponent } from './components/dashboard/all-projects/all-projects.component';
import { FileioComponent } from './components/admin/fileio/fileio.component';
import { ApplicationDetailsComponent } from './components/dashboard/application-dashboard/application-details/application-details.component';
import { AppByProjectComponent } from './components/it/app-by-project/app-by-project.component';
import { Ng2PaginationModule } from 'ng2-pagination';
import { MaterializeModule } from 'angular2-materialize';
import { SearchPipe } from './pipes/search.pipe';
import { GeomapComponent } from './components/dashboard/project-dashboard/project-front/echarts/geomap/geomap.component';
//funnel
import { FunnelComponent } from './components/funnel/funnel.component';
import { MultiSelectModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { ProjectnameService } from './services/projectname.service';
import { ExcelNewComponent } from './components/excel-new/excel-new.component';
import { ProjectScoresComponent } from './components/dashboard/project-dashboard/project-scores/project-scores.component';
import { ScoresComponent } from './components/dashboard/project-dashboard/project-scores/scores/scores.component';
import { ExcelIncComponent } from './components/excel-inc/excel-inc.component';
import { ViewProjectVersionComponent } from './components/admin/view-project-version/view-project-version.component';
import { RadioButtonModule } from 'primeng/primeng';

import { ScoresDataService } from './services/scores-data.service';
import { ApplicationScoresComponent } from './components/dashboard/project-dashboard/application-scores/application-scores.component';
import { NewLoginComponent } from './components/new-login/new-login.component';
import { UiDemoComponent } from './components/ui-demo/ui-demo.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { WizardComponent } from './components/admin/wizard/wizard.component';
import { Wizard2Component } from './components/admin/wizard2/wizard2.component';
import { Wizard3Component } from './components/wizard3/wizard3.component';
// import { CovalentStepsModule } from '@covalent/core';
import { Wizard4Component } from './components/wizard4/wizard4.component';
import { Addatt4Component } from './components/addatt4/addatt4.component';
// import { InputModalComponent } from './components/it/input-modal/input-modal.component';


const routes: Routes = [

  {
    path: '',
    component: NewLoginComponent
  },
  // {
  //   path: 'project/:proj_id',
  //   component: ProjectFiltersComponent,
  //   resolve:{
  //     project_data:FilterResolverService
  //   }
  // },
  {
    path: 'dashboard',
    component: SidenavComponent,
    children:
    [
      // {
      //   path:'maindash', component: FrontComponent
      // },
      // { path: 'firstdash', component: MainDashComponent },
      {
        path: 'project/:proj_id',
        component: ProjectFiltersComponent,
        resolve: {
          project_data: FilterResolverService
        }
      },
      {
        path: 'tab',
        component: TabsComponent,
        // data:  {  breadcrumb:  'scores'  },
        children: [
          {
            path: 'funnel',
            component: FunnelComponent,
            resolve: {
              projectname: ProjectnameService
            }
            // data:  {  breadcrumb:  'App Filter By Scores'  },

          },
          {
            path: 'applicationscores',
            component: ApplicationScoresComponent,

          },
          {
            path: 'scores',
            component: ProjectScoresComponent,

          }
        ]
      },

      {
        path: 'project/:proj_id/apps/:app_name',
        component: ApplicationDashboardComponent,
        resolve: {
          app_data: ApplicationResolverService
        }

      },
      {
        path: 'allprojects',
        component: AllProjectsComponent
      },
      {
        path: 'input',
        component: AppByProjectComponent
      },
      {
        path: 'inputforms',
        component: ProjectMainComponent,
        resolve: {
          appResolve: AppResolverService
        }
      },
      {
        path: 'add-attribute/:id/:pname',
        component: AddAttributeComponent,
        resolve: {
          project: ProjectResolverService, agg_data: AggregateResolverService
        }
      },
      {
        path: 'reports',
        component: MainReportComponent
      },
      {
        path: 'role',
        component: RolesComponent
      },
      {
        path: 'view-user',
        component: ViewUserComponent,
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: 'wizard',
        component: WizardComponent
      },
       {
        path: 'wizard4',
        component: Wizard4Component
      },
      {
        path: 'view',
        component: UiDemoComponent
      },
      {
        path: 'covalentwizard',
        component: Wizard3Component
      },
      // {
      //   path: 'viewdemo',
      //   component: UiDemoComponent
      // },
      {
        path: 'view-version/:id',
        component: ViewProjectVersionComponent,
        resolve: {
          project: ProjectResolverService
        }
      },
      {
        path: 'edit-project/:id',
        component: EditProjectComponent,
        resolve: {
          project: ProjectResolverService
        }
      }, {
        path: 'user-edit/:id',
        component: EditUserComponent,
        resolve: {
          user: UserResolverService
        }
      },
      {
        path: 'import',
        component: ImporterComponent
      },
      {
        path: 'export',
        component: ExporterComponent
      },
      {
        path: 'new-project',
        component: ProjectAdminComponent
      },
      {
        path: 'fileio',
        component: FileioComponent
      },
      {
        path: 'excelImportNew/:pname',
        component: ExcelNewComponent
      },
      {
        path: 'excelImportInc/:pname',
        component: ExcelIncComponent
      },
      {
        path: 'excel',
        component: Exel4Component,
        resolve: {
          appResolve: AppResolverService
        },

      }
    ]
  },

]

export function highchartsFactory() {

  const hc = require('highcharts/highstock');
  const dd = require('highcharts/modules/exporting');
  const a = require('highcharts/highcharts-3d');
  const b = require('highcharts/highcharts-more');
  const c = require('highcharts/modules/wordcloud');
  const d = require('highcharts/modules/data');
  const e = require('highcharts/modules/drilldown');
  const f = require('highcharts/modules/funnel');
  const g = require('highcharts/modules/solid-gauge');
  const h = require('highcharts/modules/treemap');
  const i = require('highcharts/modules/heatmap');

  dd(hc);
  a(hc)
  b(hc)
  c(hc)
  d(hc)
  e(hc)
  f(hc)
  h(hc)
  g(hc)
  i(hc)

  return hc;
}

@NgModule({
  declarations: [
    AppComponent,
    MatSnackBarComponent,
    ProjectMainComponent,
    // InputModalComponent,
    ProjectAdminComponent,
    UserComponent,
    ViewProjectComponent,
    EditProjectComponent,
    ViewUserComponent,
    RolesComponent,
    EditUserComponent,
    SidenavComponent,
    LoginComponent,
    // MainDashComponent,
    // CompletionTileComponent,
    // BusinessCriticalityComponent,
    // CountryBubbleComponent,
    // UiBarChartComponent,
    // ScoreGaugeComponent,
    // ScoreCompletionComponent,
    MainReportComponent,
    TreemapComponent,
    ProgressBarComponent,
    TrialRatingComponent,
    // ScoreSpeedometerComponent,
    UsersTableComponent,

    DynamicFormQuestionComponent,
    // MatSnackBarComponent 
    Exel4Component,
    AddAttributeComponent,
    ExporterComponent,
    ImporterComponent,
    ProjectFrontComponent,
    AllApplicationsComponent,
    BusinessCriticalityComponent,
    CountryUsageComponent,
    UiTypeComponent,
    ProjectFiltersComponent,
    SystemInterfaceComponent,
    NumberTilesComponent,
    ApplicationAgeComponent,
    StorageProductComponent,
    LtiOwnerComponent,
    StorageTypeComponent,
    ProjectDetailsComponent,
    ApplicationDashboardComponent,
    ApplicationDetailsComponent,
    AllProjectsComponent,
    CategoryCompletionComponent,
    SpecificCategoryComponent,
    OverallScoresComponent,
    FileioComponent,
    AppByProjectComponent,
    SearchPipe,
    GeomapComponent,
    FunnelComponent,
    ExcelNewComponent,
    ProjectScoresComponent,
    ScoresComponent,
    ViewProjectVersionComponent,
    ExcelIncComponent,
    ApplicationScoresComponent,
    NewLoginComponent,
    UiDemoComponent,
    TabsComponent,
    Wizard2Component,
    WizardComponent,
    Wizard3Component,
    Wizard4Component,
    Addatt4Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ng2Charts,
    ChartModule,
    HttpModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot(),
    Ng2SmartTableModule,
    MaterializeModule,
    // .forRoot(require('highcharts'),
    // require('highcharts/highcharts-3d'),
    // require('highcharts/highcharts-more'),
    // require('highcharts/modules/wordcloud'),
    // require('highcharts/modules/data'),
    // require('highcharts/modules/drilldown'),
    // require('highcharts/modules/funnel'),
    // require('highcharts/modules/solid-gauge'),
    // require('highcharts/modules/treemap'),
    // require('highcharts/modules/heatmap'))
    AngularMultiSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    BusyModule,
    NgProgressModule,
    AngularEchartsModule,
    NgxChartsModule,
    DashboardRouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatChipsModule,
    MatCardModule,
    Ng2PaginationModule,
    MultiSelectModule,
    DropdownModule,
    ButtonModule,
    RadioButtonModule,
    MatSelectModule,
    //CovalentStepsModule
  ],
  providers: [
    BiDataService,
    FilterResolverService,
    ApplicationResolverService,
    QuestionService,
    QuestionControlService,
    UserService,
    LocalStorageService,
    DataService,
    ProjectService,
    UserResolverService,
    ProjectResolverService,
    AppService,
    MappingService,
    AuthGuardService,
    ProjectnameService,
    AggregateResolverService,
    ScoresDataService,
    AppResolverService,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
