import { AsyncPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EntityCollectionService, EntityServices } from '@ngrx/data';
import { provideMockStore } from '@ngrx/store/testing';

import { RegisterFormComponent } from '@registration/components';
import { RegisterPageComponent } from '@registration/containers';
import { User } from '@shared/models/user.model';
import { SharedModule } from '@shared/shared.module';

import { of } from 'rxjs';

import * as fromRegistration from '@registration/reducers';

describe('RegisterPageComponent', () => {
  let fixture: ComponentFixture<RegisterPageComponent>;
  let component: RegisterPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterPageComponent, RegisterFormComponent],
      imports: [RouterTestingModule, SharedModule],
      providers: [
        {
          provide: EntityServices,
          useValue: {
            getEntityCollectionService: jest.fn(() => ({
              loading$: of(false),
              add: jest.fn(),
            })),
          },
        },
        provideMockStore({
          initialState: fromRegistration.initialState,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPageComponent);
    component = fixture.componentInstance;
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toBeTruthy();
  });

  it('should call the user service when a user is submitted ', () => {
    const spy = spyOn(component.userService, 'add');

    component.saveRegistration({
      newUser: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        secretAnswer: '',
        secretQuestion: '',
      },
    });

    expect(spy).toHaveBeenCalled();
  });
});
