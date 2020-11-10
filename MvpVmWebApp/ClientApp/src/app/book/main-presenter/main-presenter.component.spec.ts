import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPresenterComponent } from './main-presenter.component';

describe('MainPresenterComponent', () => {
  let component: MainPresenterComponent;
  let fixture: ComponentFixture<MainPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
