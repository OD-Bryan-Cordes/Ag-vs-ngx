import { NgModule } from '@angular/core';
import { AgGridModule } from '@ag-grid-community/angular';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AppComponent } from './app.component';
import { CompareComponent } from './compare/compare.component';
import { AgGridComponent } from './ag-grid/ag-grid.component';
import { NgxDataTablesComponent } from './ngx-tables/ngx-data-tables.component';
import { CustomGridComponent } from './custom-grid/custom-grid.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AgGridModule.withComponents([]),
    NgxDatatableModule.forRoot({
      messages: {
        emptyMessage: 'No data to display', // Message to show when array is presented, but contains no values
        totalMessage: 'total', // Footer total message
        selectedMessage: 'selected', // Footer selected message
      },
    }),
  ],
  declarations: [
    AppComponent,
    CompareComponent,
    AgGridComponent,
    NgxDataTablesComponent,
    CustomGridComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
