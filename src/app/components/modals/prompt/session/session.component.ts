import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/DialogData';

@Component({
  selector: 'app-session', 
  templateUrl: './session.component.html',
})
export class SessionPromptComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) private data: DialogData<any>, private dialogRef: MatDialogRef<SessionPromptComponent>) { }

  ngOnInit(): void {
    console.log(this.data);

    // setTimeout(() => {this.closeDialog();}, 5000);
  }

  closeDialog(): void {
    this.data.isClosed = true;
    this.data.isCompleted = true;
    this.dialogRef.close(this.data);
  }

} 
