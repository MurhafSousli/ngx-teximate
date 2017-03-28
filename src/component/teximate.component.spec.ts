import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeximateComponent } from './teximate.component';

describe('TeximateComponent', () => {
  let component: TeximateComponent;
  let fixture: ComponentFixture<TeximateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeximateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeximateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
