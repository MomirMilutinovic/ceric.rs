import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WatchService } from '../watch.service';
import { Watch } from '../model/watch';

@Component({
  selector: 'app-add-watch',
  templateUrl: './add-watch.component.html',
  styleUrl: './add-watch.component.css'
})
export class AddWatchComponent {

  movementOptions = ['Automatic', 'Quartz', 'Solar Quartz', 'Manual'];
  glassOptions = ['Mineral Glass', 'Sapphire Crystal', 'Hardlex Crystal'];
  displayOptions = ['Analog', 'Digital', 'Hybrid'];
  styleOptions = ['Dress', 'Casual', 'Sports', 'Racing', 'Fashion', 'Diver', 'Pilot', 'Luxury', 'Rugged'];

  form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    brand: ['', Validators.required],
    price: [null, [Validators.required, Validators.min(0)]],
    movement: ['', Validators.required],
    display: ['', Validators.required],
    caseMaterial: ['', Validators.required],
    glassMaterial: ['', Validators.required],
    style: ['', Validators.required],
    waterResistanceBar: [null, [Validators.required, Validators.min(0)]],
    features: this.fb.array<string[]>([], Validators.required),
    imageUrl: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private watchService: WatchService) {}

  get features(): FormArray {
    return this.form.get('features') as FormArray;
  }

  addFeature(): void {
    this.features.push(this.fb.control('', Validators.required));
  }

  removeFeature(i: number): void {
    this.features.removeAt(i);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.watchService.addWatch(this.form.value as Watch).subscribe(
      (_) => {
        this.form.reset();
        this.features.clear();
      }
    )
  }
}
