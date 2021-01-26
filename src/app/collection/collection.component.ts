import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

import { CollectionDataSource, CollectionItem } from './collection-datasource';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})

export class CollectionComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CollectionItem>;

  dataSource: CollectionDataSource;
  displayedColumns = ['year', 'set', 'manufacturer', 'player', 'number', 'action'];

  constructor(public dialog: MatDialog) {}

  openDialog(action, obj) {
    obj.action = action;

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result.event == 'Add') {
        this.addRowData(result.data);
      } else if(result.event == 'Update') {
        this.updateRowData(result.data);
      } else if(result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj){
    console.log(row_obj)
    this.dataSource.add(row_obj)
    this.table.renderRows();
  }

  updateRowData(row_obj){

  }

  deleteRowData(row_obj) {

  }

  ngOnInit() {
    this.dataSource = new CollectionDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
