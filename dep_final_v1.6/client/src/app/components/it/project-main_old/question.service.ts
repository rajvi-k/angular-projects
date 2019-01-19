import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';

@Injectable()
export class QuestionService {

 // Todo: get from a remote source of question metadata
 // Todo: make asynchronous
 getGeneralQuestions() {
  
   let data= [{
    key: 'application',
    label: 'Application',
    controlType:'textbox',
    value:"Bloom",
    category_type:" ",
    options: [],
    order:""
    },
    {
      key: 'firstName',
      controlType:'textbox',
      label: 'First name',
      options:[],
      value: 'Bombasto',
      required: true,
      order: 1,
      type: 'email'
    },
    {
      key: 'emailAddress',
      controlType:'textbox',
      options:[],
      label: 'Email',
      type: 'email',
      order: 3
    },
    {
      key: 'client',
      label: 'Client',
      controlType:'dropdown',
      options: [
        {key: 'Tech Mahindra',  value: 'Tech Mahindra'},
        {key: 'Johnson',  value: 'Johnson'},
        {key: 'Loreal',   value: 'Loreal'},
        {key: 'Clemsons', value: 'Clemsons'}
      ],
      order: 4
    },
    {
      key: 'start_date',
      label: 'Starting Date',
      controlType:'textbox',
      required: false,
      options:[],
      type: 'email',
      order: 5
    }

  ]
   let questions: QuestionBase<any>[] = [];

   for(let x of data){
    if(x.controlType=='dropdown'){
      questions.push(new DropdownQuestion(x));
      
    }
    if(x.controlType=='textbox'){
      questions.push( new TextboxQuestion(x))
    }
  }


   return questions.sort((a, b) => a.order - b.order);
 }
}