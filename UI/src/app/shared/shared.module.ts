import { NgModule } from '@angular/core';
import { FooterComponent } from './layout-components/footer/footer.component';
import { HeaderComponent } from './layout-components/header/header.component';
import { LoaderComponent } from './layout-components/loader/loader.component';
import { PageHeaderComponent } from './layout-components/page-header/page-header.component';
import { SidebarComponent } from './layout-components/sidebar/sidebar.component';
import { TabToTopComponent } from './layout-components/tab-to-top/tab-to-top.component';
import { ContentLayoutComponent } from './layout-components/layout/content-layout/content-layout.component';
import { ErrorLayoutComponent } from './layout-components/layout/error-layout/error-layout.component';


import { SwitcherLayoutComponent } from './layout-components/layout/switcher-layout/switcher-layout.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { NgbDatepicker, NgbModule, NgbTimepicker } from '@ng-bootstrap/ng-bootstrap';

import { ColorPickerModule } from 'ngx-color-picker';
import { RightSidebarComponent } from './layout-components/right-sidebar/right-sidebar.component';
import { HoverEffectSidebarDirective } from './directives/hover-effect-sidebar.directive';
import { CommonModule } from '@angular/common';
import { FullscreenDirective } from './directives/fullscreen-toggle.directive';
import { ToggleThemeDirective } from './directives/toggle-theme.directive';
import { SidemenuToggleDirective } from './directives/sidemenuToggle';
import { SwitcherComponent } from './layout-components/switcher/switcher.component';
import { HeaderSwitcherComponent } from './layout-components/header-switcher/header-switcher.component';
import { MaterialModule } from './moduels/material/material.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { PrintErrorComponent } from './components/print-error/print-error.component';
import { ConfirmationModelComponent } from './components/confirmation-model/confirmation-model.component';
import { SafePipe } from './pipes/safe/safe.pipe';
import { LocaldatePipe } from './pipes/localdate/localdate.pipe';
import { AddCommonModalComponent } from './components/add-common-modal/add-common-modal.component';
import { CommonTableComponent } from './components/common-table/common-table.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LoaderComponent,
    CommonTableComponent,
    PageHeaderComponent,
    SidebarComponent,
    SwitcherLayoutComponent,
    TabToTopComponent,
    ContentLayoutComponent,
    ErrorLayoutComponent,
    SwitcherComponent,
    RightSidebarComponent,
    FullscreenDirective,
    ToggleThemeDirective,
    HoverEffectSidebarDirective,
    SidemenuToggleDirective,
    HeaderSwitcherComponent,
    PrintErrorComponent,
    ConfirmationModelComponent,
    SafePipe,
    LocaldatePipe,
    AddCommonModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ColorPickerModule,
    NgScrollbarModule,
    NgSelectModule,
    NgbDatepicker,
    NgbTimepicker,
    MaterialModule,
    NgxMaskModule.forRoot()
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    PageHeaderComponent,
    RightSidebarComponent,
    TabToTopComponent,
    ContentLayoutComponent,
    ErrorLayoutComponent,
    LoaderComponent,
    SidebarComponent,
    PrintErrorComponent,
    ConfirmationModelComponent,
    CommonTableComponent,
    ToggleThemeDirective,
    SidemenuToggleDirective,
    SwitcherComponent,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgScrollbarModule,
    NgbModule,
    ColorPickerModule,
    NgbDatepicker,
    NgbTimepicker,
    MaterialModule,
    NgxMaskModule
  ],
  providers:[
  ]


})
export class SharedModule { }
