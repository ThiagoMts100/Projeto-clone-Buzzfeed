import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css'],

})
export class QuizzComponent implements OnInit {
  title:string = ""

  questions:any
  quiestionSelected:any

  answers:string[] = []
  answersSelected:string=""

  questionIndex: number = 0
  questionMaxIndex:number = 0

  finished:boolean = false

  photo:string = ""

  bgc:string = ""
  constructor() { }

  ngOnInit(): void {
    if(quizz_questions)
    this.finished = false
  this.title = quizz_questions.title

  this.questions = quizz_questions.questions
  this.quiestionSelected = this.questions[this.questionIndex]

  this.questionIndex = 0
  this.questionMaxIndex = this.questions.length

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nexStep()

  }

   async nexStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex){
      this.quiestionSelected = this.questions[this.questionIndex]

    } else {
      const finalAnswer:string = await this.checkResult(this.answers)
        this.finished = true
        this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]


      if(finalAnswer === "A"){

        this.photo = "assets/imgs/forte e corajoso.jpg"
        this.bgc = "A"
        document.body.classList.toggle('cor')

      }else if(finalAnswer === "B"){

        this.photo = "assets/imgs/medo.jpg"
        this.bgc = "B"
        document.body.classList.toggle('med')
      }
  }
}

    async checkResult(answers:string[]){
      const result = answers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === previous).length
        ){
          return previous
        }else{
          return current
        }
      })

      return result
    }

    restartQuizz() {
      this.finished = false;
      this.answers = [];
      this.questionIndex = 0;
      this.quiestionSelected = this.questions[this.questionIndex];
      this.photo = "";
      this.bgc = "";
      document.body.classList.remove('med', 'cor');
    }
}
