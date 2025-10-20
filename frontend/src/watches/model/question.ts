export interface Question {
    id: number,
    question: string,
    answerType: string,
    allowedAnswers: string[]
}

export interface QuestionDto {
    question: string,
    answerType: string,
    allowedAnswers: string[]
}

export interface Answer {
    id: number,
    answer: string,
    answerType: string,
    allowedAnswers: string[]
}

export interface IconicWatchQuestion {
    id: number,
    question: string,
    positiveAnswer: string,
    pointBoost: number,
    watches: string[]
}

export interface IconicWatchQuestionDto {
    questionId: number,
    positiveAnswer: string,
    pointBoost: number,
    watchIds: number[]
}