import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { PasswordConfirmationErrorStateMatcher } from '../../auth/forced-password-change/forced-password-change.component';
import { HttpClient } from '@angular/common/http';
import { ApiUrls } from '../../shared/api-urls.enum';
import { User } from '../user-management.service';


export interface ImageUploadResponse {
  url: string
}

// Image upload na osnovu ovog videa: https://www.youtube.com/watch?v=YkvqLNcJz3Y
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrl: './user-registration-form.component.css'
})
export class UserRegistrationFormComponent {

  signupForm!: FormGroup;
  matcher = new PasswordConfirmationErrorStateMatcher();

  @Output()
  change = new EventEmitter<string>();

  @Output()
  user = new EventEmitter<User>();

  @Output()
  isValid = new EventEmitter<boolean>();

  // TODO: When clerk administration is added, the role will be selectable.
  selectedRole = "ADMIN";

  selectedFile: File | null = null;

  isImageUploading = false;
  isImageUploaded = false;
  imageUrl = "";

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {
    this.signupForm = this.formBuilder.group(
      {
        username: new FormControl<string>('', [Validators.required]),
        email: new FormControl<string>('', [Validators.required]),
        password: new FormControl<string>('', [Validators.required]),
        passwordConfirmation: new FormControl<string>('', [
          Validators.required,
        ]),
        firstName: new FormControl<string>('', [Validators.required]),
        lastName: new FormControl<string>('', [Validators.required]),
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup): ValidationErrors | null {
    const password = form.get('password')?.value;
    const passwordConfirmation = form.get('passwordConfirmation')?.value;
    return password === passwordConfirmation
      ? null
      : { passwordMismatch: true };
  }

  onChange() {
    const changedUser: User = {
      username: this.signupForm.get('username')?.value,
      password: this.signupForm.get('password')?.value,
      email: this.signupForm.get('email')?.value,
      firstName: this.signupForm.get('firstName')?.value,
      lastName: this.signupForm.get('lastName')?.value,
      profileImageUrl: this.imageUrl,
      role: this.selectedRole
    }
    this.user.emit(changedUser);
    this.isValid.emit(this.isFormValid());
  }

  isFormValid(): boolean {
    return this.signupForm.valid;
  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
    this.uploadImage(this.selectedFile);
  }

  uploadImage(image: File) {
    const fd = new FormData();
    fd.append('image', image, image.name);
    this.http.post<ImageUploadResponse>(ApiUrls.UploadImage, fd).subscribe(
      res => {
        this.isImageUploaded = true;
        this.isImageUploading = false;
        this.imageUrl = res.url;
        const changedUser: User = {
          username: this.signupForm.get('username')?.value,
          password: this.signupForm.get('password')?.value,
          email: this.signupForm.get('email')?.value,
          firstName: this.signupForm.get('firstName')?.value,
          lastName: this.signupForm.get('lastName')?.value,
          profileImageUrl: this.imageUrl,
          role: "ADMIN"
        }
        this.user.emit(changedUser);
        this.isValid.emit(this.isFormValid());
      }
    )
  }


}
