import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestFlatMapComponent } from './test-flat-map.component';

describe('TestFlatMapComponent', () => {
  let component: TestFlatMapComponent;
  let fixture: ComponentFixture<TestFlatMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFlatMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFlatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
