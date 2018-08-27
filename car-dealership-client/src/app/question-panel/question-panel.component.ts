import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material';
import {SellerCarService} from '../seller-car.service';
import {QuestionDataSource} from '../questionDataSource';
import {tap} from 'rxjs/operators';
import {SelectionModel} from '@angular/cdk/collections';
import {Question} from '../../question';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question-panel',
  templateUrl: './question-panel.component.html',
  styleUrls: ['./question-panel.component.css']
})
export class QuestionPanelComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['select', 'nameAndSurname', 'contactNumber', 'bodyOfQuestion', 'carData'];
  dataSource: QuestionDataSource;
  numberOfQuestions = 0;
  selection = new SelectionModel<Question>(true, []);
  delErrMsg: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private sellerCarService: SellerCarService, private router: Router) {
  }

  ngOnInit() {
    this.dataSource = new QuestionDataSource(this.sellerCarService);
    this.dataSource.loadQuestions(0, 3);

    this.sellerCarService.howManyQuestions().subscribe(
      dataFromService => this.numberOfQuestions = dataFromService
    );

  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.loadQuestionsPage())
    ).subscribe();
  }

  loadQuestionsPage() {
    console.log('Paginator clicked: ');
    this.dataSource.loadQuestions(this.paginator.pageIndex, this.paginator.pageSize);
  }

  deleteQuestion(id: string) {
    console.log('Deleting question with id: ' + id);
    // this.questionList = this.questionList.filter(questionId => questionId.id !== id);
    this.sellerCarService.howManyQuestions().subscribe(
      number => {
        console.log('Questions before delete: ' + number);
      }
    );
    this.sellerCarService.deleteQuestion(id).subscribe(() => {
        console.log('Refreshing question list.');
        this.loadQuestionsPage();
        this.sellerCarService.howManyQuestions().subscribe(
          number => {
            console.log('Questions after delete: ' + number);
          }
        );
      }
    );

  }

  onRowClicked(row) {
    this.router.navigateByUrl('/seller/details/' + row.carData.id);
  }

  deleteSelected() {
    const selectedQuestions = this.selection.selected;
    console.log(selectedQuestions);
    if (null != selectedQuestions && selectedQuestions.length > 0) {
      console.log('deleting selected messages');
      for (const question of selectedQuestions) {
        this.deleteQuestion(question.id);
      }
    } else {
      this.delErrMsg = 'Check question to delete';
      setTimeout(() => {
        this.delErrMsg = '';
      }, 3000);  // 5s
    }
  }
}

