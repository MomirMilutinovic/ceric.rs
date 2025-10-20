export interface Question {
    id: number,
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