import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ColDef, GridOptions, Module } from '@ag-grid-community/core';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormArrayName } from '@angular/forms';
import { Observable } from 'rxjs';
import { distinctUntilKeyChanged, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-custom-grid',
  templateUrl: './custom-grid.component.html',
  styleUrls: ['./custom-grid.component.scss'],
})
export class CustomGridComponent implements OnInit {
  private _gridOptions: GridOptions = {};
  formValue: Observable<unknown[]> | undefined;
  private readonly defaultGridOptions: GridOptions = {
    pagination: true,
    paginationPageSize: 20, // how many rows to view on grid
    cacheBlockSize: 20, // how big each block it caches.
    domLayout: 'autoHeight',
    overlayLoadingTemplate:
      '<span class="ag-overlay-loading-center"><span class="loader"></span>Loading...</span>',
    defaultColDef: {
      width: 100,
      maxWidth: 100,
      minWidth: 100,
      flex: 1,
      sortable: true,
      resizable: true,
      filter: true,
    },
  };

  @Input() rowData: unknown[] | null | undefined;
  @Input() columnDefs: ColDef[] | null | undefined;

  @Input() set gridOptions(gridOptions: GridOptions) {
    // This allows default grid options and then custom grid options from individual usage
    this._gridOptions = { ...this.defaultGridOptions, ...gridOptions };

    // Set server-side params.
    if (gridOptions.serverSideDatasource) {
      this._gridOptions.rowModelType = 'serverSide';
      this._gridOptions.serverSideStoreType = 'partial';
    }
  }

  get gridOptions() {
    return this._gridOptions;
  }

  modules: Module[] = [ClientSideRowModelModule];

  constructor(@Optional() public formArray: FormArrayName) {}

  ngOnInit() {
    if (this.formArray) {
      this.formValue = this.formArray.control.valueChanges.pipe(
        startWith(this.formArray.value),
        distinctUntilKeyChanged('length')
      );
    }
  }
}
