import { Component, Inject, Optional } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CollectionItem } from '../collection/collection-datasource'

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CollectionItem) {
      this.local_data = {...data};
      this.action = this.local_data.action;
  }

  doAction() {
    console.log(this.local_data)
    this.dialogRef.close({
      event: this.action,
      data: this.local_data,
    });
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }
}
