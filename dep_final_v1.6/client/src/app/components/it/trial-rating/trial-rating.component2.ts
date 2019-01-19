import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'trial-rating',
  templateUrl: './trial-rating.component.html',
  styleUrls: ['./trial-rating.component.css']
})
export class TrialRatingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getStarRating(star){
    // console.log(rating);
    // document.getElementById("rating1").className = "star-rating-star";
    // document.getElementById("rating2").className = "star-rating-star";
    // document.getElementById("rating3").className = "star-rating-star";
    // document.getElementById("rating4").className = "star-rating-star";
    // document.getElementById("rating5").className = "star-rating-star";
    // document.getElementById(star.id).className ="star-rating-star star-rating-current-value";
    console.log(star.id.slice(-1));
  }
  

}
