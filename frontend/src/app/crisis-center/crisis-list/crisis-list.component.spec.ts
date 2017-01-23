/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CrisisListComponent } from './crisis-list.component';

describe('CrisisListComponent', () => {
  let component: CrisisListComponent;
  let fixture: ComponentFixture<CrisisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrisisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrisisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
