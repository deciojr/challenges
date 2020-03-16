import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterFormComponent } from '@registration/components';
import { User } from '@shared/models/user.model';
import { SharedModule } from '@shared/shared.module';

describe('RegisterFormComponent', () => {
  let fixture: ComponentFixture<RegisterFormComponent>;
  let component: RegisterFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [RegisterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
  }));

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toBeTruthy();
  });

  it('should emit an event if the form is valid when submiited', () => {
    const newUser: User = {
      email: 'email@email',
      password: '123',
      confirmPassword: '123',
      firstName: 'firstname',
      lastName: 'lastname',
      secretQuestion: 'secretquestion',
      secretAnswer: 'secretanswer',
    };

    component.registerForm.setValue(newUser);

    spyOn(component.register, 'emit');
    component.submit();

    expect(component.register.emit).toHaveBeenCalledWith({ newUser });
  });
});
