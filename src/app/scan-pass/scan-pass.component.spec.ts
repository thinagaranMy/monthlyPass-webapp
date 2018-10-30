import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanPassComponent } from './scan-pass.component';

describe('ScanPassComponent', () => {
  let component: ScanPassComponent;
  let fixture: ComponentFixture<ScanPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
