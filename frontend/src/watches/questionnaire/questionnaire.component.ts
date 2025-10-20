import { Component, OnInit } from '@angular/core';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { WatchService } from '../watch.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Question } from '../model/question';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EndOfQuestionnareDto } from '../model/responses';

@Component({
    selector: 'app-questionnaire',
    templateUrl: './questionnaire.component.html',
    styleUrl: './questionnaire.component.css',
})
export class QuestionnaireComponent
    extends ResponsiveComponent
    implements OnInit
{
    constructor(
        private watchService: WatchService,
        private res: BreakpointObserver,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        super(res);
        this.questionForm = formBuilder.group({
            answer: new FormControl<string>('', [Validators.required]),
        });
        this.router = router;
    }

    currentQuestion: Question | null = null;

    questionForm: FormGroup;

    override ngOnInit(): void {
        this.watchService.startQuestionaire().subscribe((firstQuestion) => {
            this.currentQuestion = firstQuestion;
            console.log(this.currentQuestion);
            console.log(!this.currentQuestion.allowedAnswers);
        });
    }

    answerQuestion(answer: string) {
        this.watchService
            .answer({ id: this.currentQuestion?.id || -1, answer: answer, answerType: this.currentQuestion?.answerType || "", allowedAnswers: this.currentQuestion?.allowedAnswers || []})
            .subscribe((response) => {
                if ((response as Question).question) {
                    this.currentQuestion = response as Question;
                } else {
                    console.log('End of questionnaire');
                    this.router.navigate(['results', (response as EndOfQuestionnareDto).eventId])
                }
            });
    }
}
