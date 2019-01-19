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
    console.log(star.id);
    document.getElementById("star1").className = "star-rating-star";
    document.getElementById("star2").className = "star-rating-star";
    document.getElementById("star3").className = "star-rating-star";
    document.getElementById("star4").className = "star-rating-star";
    document.getElementById("star5").className = "star-rating-star";
    document.getElementById(star.id).className ="star-rating-star star-rating-current-value";
    console.log(star.id.slice(-1));
  }
  

}
