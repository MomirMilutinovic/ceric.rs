import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WatchService } from '../watch.service';
import { IconicWatchQuestionDto, Question } from '../model/question';
import { Watch } from '../model/watch';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
    selector: 'app-add-iconic-watch-question',
    templateUrl: './add-iconic-watch-question.component.html',
    styleUrl: './add-iconic-watch-question.component.css',
})
export class AddIconicWatchQuestionComponent
    extends ResponsiveComponent
    implements OnInit
{
    form: FormGroup = this.fb.group({
        questionId: [null, Validators.required],
        positiveAnswer: ['', Validators.required],
        pointBoost: [null, [Validators.required, Validators.min(0)]],
        watchIds: [[], Validators.required],
    });

    questions: Question[] = [];
    watches: Watch[] = [];

    constructor(
        private fb: FormBuilder,
        private watchService: WatchService,
        private res: BreakpointObserver
    ) {
        super(res);
    }

    override ngOnInit(): void {
      this.watchService.getCustomQuestions().subscribe(
        (questions) => { this.questions = questions; }
      )
      this.watchService.getWatches().subscribe(
        (watches) => { this.watches = watches; }
      )
    }

    onSubmit(): void {
        if (this.form.valid) {
            this.watchService
                .addIconicWatchQuestion(
                    this.form.value as IconicWatchQuestionDto
                )
                .subscribe((_) => {
                    this.form.reset();
                });
        } else {
            this.form.markAllAsTouched();
        }
    }
}
