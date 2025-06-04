import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCallComponent } from './single-call.component';

describe('SingleCallComponent', () => {
  let component: SingleCallComponent;
  let fixture: ComponentFixture<SingleCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleCallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
