import {DataSource} from '@angular/cdk/table';
import {Question} from '../question';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {SellerCarService} from './seller-car.service';
import {CollectionViewer} from '@angular/cdk/collections';
import {catchError, finalize} from 'rxjs/operators';

export class QuestionDataSource extends DataSource<Question> {
  private questionsSubject = new BehaviorSubject<Question[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private sellerCarService: SellerCarService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Question[]> {
    return this.questionsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.questionsSubject.complete();
    this.loadingSubject.complete();
  }

  loadQuestions(pageIndex: number, pageSize: number) {
    this.loadingSubject.next(true);

    this.sellerCarService.getAllQuestions(pageIndex, pageSize).pipe(
      catchError(() => of([])),
      finalize(() => this.loadingSubject.next(false))
    )
      .subscribe(questions => {
        console.log('Questions from server:');
        console.log(questions);
        this.questionsSubject.next(questions);
      });
  }
}
