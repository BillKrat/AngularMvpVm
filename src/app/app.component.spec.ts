import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DynamicContainerComponent } from '../app/Poc/dynamic-container/dynamic-container.component';
import { DynamicComponent } from '../app/Poc/dynamic/dynamic.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DynamicComponent,
        DynamicContainerComponent,
      ],
      imports: [
        RouterTestingModule,
      ],
    }).overrideModule(RouterTestingModule, {
      set: {
        entryComponents: [DynamicComponent],
      }
    }).compileComponents();

  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'AngularMvpVm'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('AngularMvpVm');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').innerHTML).toContain('AngularMvpVm app is running!');
  });
});
