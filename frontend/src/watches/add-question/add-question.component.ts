import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question, QuestionDto } from '../model/question';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WatchService } from '../watch.service';

@Component({
    selector: 'app-add-question',
    templateUrl: './add-question.component.html',
    styleUrl: './add-question.component.css',
})
export class AddQuestionComponent extends ResponsiveComponent {
    form: FormGroup = this.fb.group({
        id: [null],
        question: ['', Validators.required],
        answerType: ['', Validators.required],
        allowedAnswers: this.fb.array([], Validators.required),
    });

    constructor(
        private fb: FormBuilder,
        private res: BreakpointObserver,
        private watchService: WatchService
    ) {
      super(res);
    }

    get allowedAnswers(): FormArray {
        return this.form.get('allowedAnswers') as FormArray;
    }

    addAllowedAnswer(): void {
        this.allowedAnswers.push(this.fb.control('', Validators.required));
    }

    removeAllowedAnswer(index: number): void {
        this.allowedAnswers.removeAt(index);
    }

    onSubmit(): void {
        if (this.form.valid) {
            const value = this.form.value as QuestionDto;
            this.watchService.addQuestion(value).subscribe(
              (_) => {
                this.form.reset();
                this.allowedAnswers.clear();
              }
            );
        } else {
            this.form.markAllAsTouched();
        }
    }
}
