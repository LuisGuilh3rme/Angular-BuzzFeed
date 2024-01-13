import { Component, OnInit } from '@angular/core';
import { QuestionType } from 'src/app/types/QuestionType';
import quizzQuestions from 'src/assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  public title?: string;
  public questions?: QuestionType[];
  public selectedQuestion?: QuestionType;
  public selectedAswer?: string;
  public finished: boolean = false;

  private aswers?: string[];
  private questionIndex?: number;
  private questionMaxIndex?: number;

  constructor() { }

  ngOnInit(): void {
    if (quizzQuestions) {
      this.finished = false;
      this.title = quizzQuestions.title;
      this.questions = quizzQuestions.questions;
      this.aswers = [];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
      this.selectedQuestion = this.questions[this.questionIndex];
    }
  }

  public async optionChoiced(option: string) {
    this.aswers?.push(option);
    await this.nextQuestion();
  }

  private async nextQuestion() {
    this.questionIndex! += 1;

    if (this.questionMaxIndex! > this.questionIndex!)
      this.selectedQuestion = this.questions![this.questionIndex!];
    else {
      this.finished = true;
      this.selectedAswer = quizzQuestions.results[this.checkResults()]!;
    }
  }

  private checkResults(): keyof typeof quizzQuestions.results {
    return this.aswers?.filter(option => option == 'A').length! >= this.aswers?.filter(option => option == 'B').length!
    ? 'A' : 'B';
  }
}
