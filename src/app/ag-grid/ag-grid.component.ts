import {
  ColDef,
  GridApi,
  GridOptions,
} from '@ag-grid-community/core';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { range } from '../helpers';

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html',
  styleUrls: [],
})
export class AgGridComponent {
  agForm = this.fb.group({ rows: [], columns: [] });
  agRowData: Observable<unknown[]> = of([]);
  agColumnDef: Observable<ColDef[]> = of([]);
  gridApi: GridApi | undefined;
  gridOptions: GridOptions = {
    onGridReady: (event) => {
      this.gridApi = event.api;
    },
  };
  constructor(private fb: FormBuilder) {
    this.agRowData = this.agForm.controls['rows'].valueChanges.pipe(
      map((value) => range(1, value, 1)),
      map((numberArr) =>
        numberArr.map((value) =>
          value % 4 ? { name: `row ${value}` } : { status: !!(value % 4) }
        )
      )
    );
    this.agColumnDef = this.agForm.controls['columns'].valueChanges.pipe(
      map((value) => range(1, value, 1)),
      map((numberArr) => {
        let newColDefs: ColDef[] = [];
        const oldColDefs = this.gridApi?.getColumnDefs() ?? [];
        if (oldColDefs.length < numberArr.length) {
          const newNumbers = numberArr.slice(oldColDefs.length);
          const mappedCol = newNumbers.map((value) => ({
            headerName: `${value}`,
            field: value % 4 ? 'name' : 'status',
            cellClassRules:
              {
                    red: String(!(value % 4)),
                    green: String(value % 4),
                  },
          }));
          newColDefs = [...oldColDefs, ...mappedCol];
        } else {
          oldColDefs.length = numberArr.length;
          newColDefs = oldColDefs;
        }
        return newColDefs;
      })
    );
  }
}
