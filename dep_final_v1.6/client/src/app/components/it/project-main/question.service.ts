import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { AppService } from '../../../services/app.service';

@Injectable()
export class QuestionService {

  apps:any[]=[]
  constructor(private appSvc: AppService){

  }
 // Todo: get from a remote source of question metadata
 // Todo: make asynchronous
 getGeneralQuestions() {
  
  //  let data= [{
  //   key: 'Hekko',
  //   label: 'Hekko',
  //   controlType:'textbox',
  //   type: 'email',
 
  //   options: [
  //     {key: 'san',  value: 'righ'},
  //     {key: 'tada',  value: 'df'},
  //     {key: 'hello',   value: 'Goofgd2'},
  //     {key: 'damn', value: 'dfdffg'}
  //   ],
  //   order: 1
  //   },
  //   {
  //     key: 'firstName',
  //     controlType:'textbox',
  //     label: 'First name',
  //     options:[],
  //     value: '',
  //     required: true,
  //     order: 2,
  //     type: 'email'
  //   },
  //   {
  //     key: 'emailAddress',
  //     controlType:'textbox',
  //     options:[],
  //     label: 'Email',
  //     type: 'email',
  //     order: 3
  //   },
  //   {
  //     key: 'client',
  //     label: 'Client',
  //     type: 'email',
  //     controlType:'textbox',
  //     options: [
  //       {key: 'Tech Mahindra',  value: 'Tech Mahindra'},
  //       {key: 'Johnson',  value: 'Johnson'},
  //       {key: 'Loreal',   value: 'Loreal'},
  //       {key: 'Clemsons', value: 'Clemsons'}
  //     ],
  //     order: 4
  //   },
  //   {
  //     key: 'start_date',
  //     label: 'Starting Date',
  //     controlType:'textbox',
  //     required: false,
  //     options:[],
  //     type: 'email',
  //     order: 5
  //   }

 //]
 
     
   
 let questions: QuestionBase<any>[] = [];

  //  for(let x of data){
  //   if(x.controlType=='dropdown'){
  //     questions.push(new DropdownQuestion(x));
      
  //   }
  //   if(x.controlType=='textbox'){
  //     questions.push( new TextboxQuestion(x))
  //   }
  // }


   return questions.sort((a, b) => a.order - b.order);
 }
}