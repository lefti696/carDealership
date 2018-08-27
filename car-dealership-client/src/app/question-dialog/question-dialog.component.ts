import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Question} from '../../question';
import {Car} from '../../car';
import {CarOfferService} from '../car-offer.service';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.css']
})
export class QuestionDialogComponent implements OnInit {

  errMsg: string[] = [];
  buyerQuestion: Question = {
    id: '',
    contactNumber: 0,
    nameAndSurname: '',
    bodyOfQuestion: '',
    carData: null,
    carId: 0
  };

  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    private carOfferService: CarOfferService,
    @Inject(MAT_DIALOG_DATA) public data: Car
  ) {
  }

  ngOnInit(): void {
    console.log('questionToSubmit with carData: ');
    console.log(this.data);
    console.log(this.buyerQuestion);
  }

  onNoClick(): void {
    console.log('buyerQuestion canceled');
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.errMsg = [];
    console.log('buyerQuestion submitted');
    console.log(this.buyerQuestion);
    console.log('validation result: ' + this.validate());
    if (this.validate()) {
      console.log('validation ok. Setting carId: ' + this.data.id);
      // submitting to service
      this.buyerQuestion.carId = this.data.id;
      this.buyerQuestion.carData = this.data;
      this.carOfferService.addNewQuestion(this.buyerQuestion).subscribe(
        (dataFromServer) => console.log('Success - Id of submitted buyerQuestion: ' + dataFromServer.toString())
      );
      this.dialogRef.close();
    }
  }

  validate(): boolean {
    let result = true;
    if (null == this.buyerQuestion.bodyOfQuestion || this.buyerQuestion.bodyOfQuestion.length < 10) {
      this.errMsg.push('Question too short or empty');
      result = false;
    }
    if (null == this.buyerQuestion.nameAndSurname || this.buyerQuestion.nameAndSurname.length < 5) {
      this.errMsg.push('Name too short or empty');
      result = false;
    }
    if (null == this.buyerQuestion.contactNumber || this.buyerQuestion.contactNumber.toString().length !== 9) {
      this.errMsg.push('There is a problem with number');
      result = false;
    }
    return result;
  }

}
