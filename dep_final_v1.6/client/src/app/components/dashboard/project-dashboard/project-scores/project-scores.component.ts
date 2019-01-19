import { Component, OnInit } from '@angular/core';
import { ScoresDataService } from '../../../../services/scores-data.service';

@Component({
  selector: 'project-scores',
  templateUrl: './project-scores.component.html',
  styleUrls: ['./project-scores.component.css']
})
export class ProjectScoresComponent implements OnInit {

  selected: string;
  index: number=2;
  projects: any = [];
  constructor(private scDataSvc: ScoresDataService) { }

  ngOnInit() {
    this.scDataSvc.getProjectName().subscribe(data => {
      for (let project of data) {
        this.projects.push(project.project_name)
      }
      // console.log(this.projects)
    }, err => console.log(err));
  }

}
