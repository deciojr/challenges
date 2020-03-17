import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHeroPageComponent } from './update-hero-page.component';

describe('UpdateHeroPageComponent', () => {
  let component: UpdateHeroPageComponent;
  let fixture: ComponentFixture<UpdateHeroPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateHeroPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHeroPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
