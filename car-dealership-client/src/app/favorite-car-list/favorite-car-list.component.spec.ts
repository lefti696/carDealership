import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteCarListComponent } from './favorite-car-list.component';

describe('FavoriteCarListComponent', () => {
  let component: FavoriteCarListComponent;
  let fixture: ComponentFixture<FavoriteCarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteCarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
