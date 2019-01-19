import { Component, OnInit, Input, OnChanges, AfterViewInit, DoCheck, ChangeDetectionStrategy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as _ from "lodash";
import { Observable } from 'rxjs/Observable';
import { BiDataService } from '../../../../../../services/bi-data.service';
@Component({
  selector: 'geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css']
})
export class GeomapComponent implements OnInit {

  chartOption: any;
  counterCountry:number;
  oldselectedEvent
  DocheckCount = 0; countrCount = 0;
  oldSelectedNames = []
  oldDataMap: any[] = [
    { name: 'Afghanistan', value: 0 },
    { name: 'Angola', value: 0 },
    { name: 'Albania', value: 0 },
    { name: 'United Arab Emirates', value: 0 },
    { name: 'Argentina', value: 0 },
    { name: 'Armenia', value: 0 },
    { name: 'French Southern and Antarctic Lands', value: 0 },
    { name: 'Australia', value: 0 },
    { name: 'Austria', value: 0 },
    { name: 'Azerbaijan', value: 0 },
    { name: 'Burundi', value: 0 },
    { name: 'Belgium', value: 0 },
    { name: 'Benin', value: 0 },
    { name: 'Burkina Faso', value: 0 },
    { name: 'Bangladesh', value: 0 },
    { name: 'Bulgaria', value: 0 },
    { name: 'The Bahamas', value: 0 },
    { name: 'Bosnia and Herzegovina', value: 0 },
    { name: 'Belarus', value: 0 },
    { name: 'Belize', value: 0 },
    { name: 'Bermuda', value: 0 },
    { name: 'Bolivia', value: 0 },
    { name: 'Brazil', value: 0 },
    { name: 'Brunei', value: 0 },
    { name: 'Bhutan', value: 0 },
    { name: 'Botswana', value: 0 },
    { name: 'Central African Rep.', value: 0 },
    { name: 'Canada', value: 0 },
    { name:'Congo', value:0},
    { name: 'Switzerland', value: 0 },
    { name: 'Chile', value: 0 },
    { name: 'China', value: 0 },
    { name: 'Ivory Coast', value: 0 },
    { name: 'Cameroon', value: 0 },
    { name: 'Dem. Rep. Congo', value: 0 },
    { name: 'Republic of the Congo', value: 0 },
    { name: 'Colombia', value: 0 },
    { name: 'Costa Rica', value: 0 },
    { name: 'Cuba', value: 0 },
    { name: 'Northern Cyprus', value: 0 },
    { name: 'Cyprus', value: 0 },
    { name: 'Czech Republic', value: 0 },
    { name: 'Germany', value: 0 },
    { name: 'Djibouti', value: 0 },
    { name: 'Denmark', value: 0 },
    { name: 'Dominican Republic', value: 0 },
    { name: 'Algeria', value: 0 },
    { name: 'Ecuador', value: 0 },
    { name: 'Egypt', value: 0 },
    { name: 'Eritrea', value: 0 },
    { name: 'Spain', value: 0 },
    { name: 'Estonia', value: 0 },
    { name: 'Ethiopia', value: 0 },
    { name: 'Finland', value: 0 },
    { name: 'Fiji', value: 0 },
    { name: 'Falkland Islands', value: 0 },
    { name: 'France', value: 0 },
    { name: 'Gabon', value: 0 },
    { name: 'United Kingdom', value:0 },
    { name: 'Georgia', value: 0 },
    { name: 'Ghana', value: 0 },
    { name: 'Guinea', value: 0 },
    { name: 'Gambia', value: 0 },
    { name: 'Guinea Bissau', value: 0 },
    { name: 'Equatorial Guinea', value: 0 },
    { name: 'Greece', value: 0 },
    { name: 'Greenland', value: 0 },
    { name: 'Guatemala', value: 0 },
    { name: 'French Guiana', value: 0 },
    { name: 'Guyana', value: 0 },
    { name: 'Honduras', value: 0 },
    { name: 'Croatia', value: 0 },
    { name: 'Côte d Ivoire', value: 0 },
    { name: 'Haiti', value: 0 },
    { name: 'Hungary', value: 0 },
    { name: 'Indonesia', value: 0 },
    { name: 'India', value: 0 },
    { name: 'Ireland', value: 0 },
    { name: 'Iran', value: 0 },
    { name: 'Iraq', value: 0 },
    { name: 'Iceland', value: 0 },
    { name: 'Israel', value: 0 },
    { name: 'Italy', value: 0 },
    { name: 'Jamaica', value: 350 },
    { name: 'Jordan', value: 0 },
    { name: 'Japan', value: 0 },
    { name: 'Kazakhstan', value: 0 },
    { name: 'Kenya', value: 0 },
    { name: 'Kyrgyzstan', value: 0 },
    { name: 'Cambodia', value: 0 },
    { name: 'South Korea', value: 0 },
    { name: 'Kosovo', value: 0 },
    { name: 'Kuwait', value: 0 },
    { name: 'Laos', value: 0 },
    { name: 'Lebanon', value: 0 },
    { name: 'Liberia', value: 0 },
    { name: 'Libya', value: 0 },
    { name: 'Sri Lanka', value: 0 },
    { name: 'Lesotho', value: 0 },
    { name: 'Lithuania', value: 0 },
    { name: 'Luxembourg', value: 0 },
    { name: 'Latvia', value: 0 },
    { name: 'Morocco', value: 0 },
    { name: 'Moldova', value: 0 },
    { name: 'Madagascar', value: 0 },
    { name: 'Mexico', value: 0 },
    { name: 'Macedonia', value: 0 },
    { name: 'Mali', value: 0 },
    { name: 'Myanmar', value: 0 },
    { name: 'Montenegro', value: 0 },
    { name: 'Mongolia', value: 0 },
    { name: 'Mozambique', value: 0 },
    { name: 'Mauritania', value: 0 },
    { name: 'Malawi', value: 0 },
    { name: 'Malaysia', value: 0 },
    { name: 'Namibia', value: 0 },
    { name: 'New Caledonia', value: 0 },
    { name: 'Niger', value: 0 },
    { name: 'Nigeria', value: 0 },
    { name: 'Nicaragua', value: 0 },
    { name: 'Netherlands', value: 0 },
    { name: 'Norway', value: 0 },
    { name: 'Nepal', value: 0 },
    { name: 'New Zealand', value: 0 },
    { name: 'Oman', value: 0 },
    { name: 'Pakistan', value: 0 },
    { name: 'Panama', value: 0 },
    { name: 'Peru', value: 0 },
    { name: 'Philippines', value: 0 },
    { name: 'Papua New Guinea', value: 0 },
    { name: 'Poland', value: 0 },
    { name: 'Puerto Rico', value: 0 },
    { name: 'North Korea', value: 0 },
    { name: 'Portugal', value: 0 },
    { name: 'Paraguay', value: 0 },
    { name: 'Qatar', value: 0 },
    { name: 'Romania', value: 0 },
    { name: 'Russia', value: 0 },
    { name: 'Rwanda', value: 0 },
    { name: 'Western Sahara', value: 0 },
    { name: 'Saudi Arabia', value: 0 },
    { name: 'Sudan', value: 0 },
    { name: 'S. Sudan', value: 0 },
    { name: 'Senegal', value: 0 },
    { name: 'Solomon Islands', value: 0 },
    { name: 'Sierra Leone', value: 0 },
    { name: 'El Salvador', value: 0 },
    { name: 'Somaliland', value: 0 },
    { name: 'Somalia', value: 0 },
    { name: 'Republic of Serbia', value: 0 },
    { name: 'Suriname', value: 0 },
    { name: 'Slovakia', value: 0 },
    { name: 'Slovenia', value: 0 },
    { name: 'Sweden', value: 0 },
    { name: 'Swaziland', value: 0 },
    { name: 'Syria', value: 0 },
    { name: 'Chad', value: 0 },
    { name: 'Togo', value: 0 },
    { name: 'Thailand', value: 0 },
    { name: 'Tajikistan', value: 0 },
    { name: 'Tanzania', value: 0 },
    { name: 'Turkmenistan', value: 0 },
    { name: 'East Timor', value: 0 },
    { name: 'Trinidad and Tobago', value: 0 },
    { name: 'Tunisia', value: 0 },
    { name: 'Turkey', value: 0 },
    { name: 'United States', value: 0 },
    { name: 'United Republic of Tanzania', value: 0 },
    { name: 'Uganda', value: 0 },
    { name: 'Ukraine', value: 0 },
    { name: 'Uruguay', value: 0 },

    { name: 'Uzbekistan', value: 0 },
    { name: 'Venezuela', value: 0 },
    { name: 'Vietnam', value: 0 },
    { name: 'Vanuatu', value: 0 },
    { name: 'West Bank', value: 0 },
    { name: 'W. Sahara', value: 0},
    { name: 'Yemen', value: 0 },
    { name: 'South Africa', value: 0 },
    { name: 'Zambia', value: 0 },
    { name: 'Zimbabwe', value: 0 }
  ]
  seriesdata2: any[] = []
  labels2: any[] = []
  @Input() projectId
  @Input() selectedAppNames
  @Input() selectedEvent
  status: boolean;
  changelog: any = []
  appData
  dataObj = []
  key = "storage_type"
  key2 = "storage_product_and_version"
  values: any[];
  count: number;
  group: any
  labels = []; valueObj: any[] = []
  seriesdata = []
  constructor(private biSvc: BiDataService) { }


  ngDoCheck() {
  
    // console.log("checking for changes")
    this.DocheckCount++;


    if (this.selectedEvent != this.oldselectedEvent) {
      {
        this.seriesdata = []
        this.labels = []
        this.labels2 = []
        this.seriesdata2 = []
      
        // console.log("detected", this.oldSelectedNames, this.selectedAppNames)
        const changeLog = `Do Check from ${this.oldSelectedNames.length} to ${this.selectedAppNames.length}`
        // console.log("detected",this.oldSelectedNames,this.selectedAppNames)
        this.changelog.push(changeLog);
        this.status = true
        console.log("calling")
        const that = this
        that.valueObj=[]
        this.count = 0
        this.values = [];
        this.oldDataMap = [
          { name: 'Afghanistan', value: 0 },
          { name: 'Angola', value: 0 },
          { name: 'Albania', value: 0 },
          { name: 'United Arab Emirates', value: 0 },
          { name: 'Argentina', value: 0 },
          { name: 'Armenia', value: 0 },
          { name: 'French Southern and Antarctic Lands', value: 0 },
          { name: 'Australia', value: 0 },
          { name: 'Austria', value: 0 },
          { name: 'Azerbaijan', value: 0 },
          { name: 'Burundi', value: 0 },
          { name: 'Belgium', value: 0 },
          { name: 'Benin', value: 0 },
          { name: 'Burkina Faso', value: 0 },
          { name: 'Bangladesh', value: 0 },
          { name: 'Bulgaria', value: 0 },
          { name: 'The Bahamas', value: 0 },
          { name: 'Bosnia and Herzegovina', value: 0 },
          { name: 'Belarus', value: 0 },
          { name: 'Belize', value: 0 },
          { name: 'Bermuda', value: 0 },
          { name: 'Bolivia', value: 0 },
          { name: 'Brazil', value: 0 },
          { name: 'Brunei', value: 0 },
          { name: 'Bhutan', value: 0 },
          { name: 'Botswana', value: 0 },
          { name: 'Central African Rep.', value: 0 },
          { name: 'Canada', value: 0 },
          { name:'Congo', value:0},
          { name: 'Switzerland', value: 0 },
          { name: 'Chile', value: 0 },
          { name: 'China', value: 0 },
          { name: 'Ivory Coast', value: 0 },
          { name: 'Cameroon', value: 0 },
          { name: 'Dem. Rep. Congo', value: 0 },
          { name: 'Republic of the Congo', value: 0 },
          { name: 'Colombia', value: 0 },
          { name: 'Costa Rica', value: 0 },
          { name: 'Cuba', value: 0 },
          { name: 'Northern Cyprus', value: 0 },
          { name: 'Cyprus', value: 0 },
          { name: 'Czech Republic', value: 0 },
          { name: 'Germany', value: 0 },
          { name: 'Djibouti', value: 0 },
          { name: 'Denmark', value: 0 },
          { name: 'Dominican Republic', value: 0 },
          { name: 'Algeria', value: 0 },
          { name: 'Ecuador', value: 0 },
          { name: 'Egypt', value: 0 },
          { name: 'Eritrea', value: 0 },
          { name: 'Spain', value: 0 },
          { name: 'Estonia', value: 0 },
          { name: 'Ethiopia', value: 0 },
          { name: 'Finland', value: 0 },
          { name: 'Fiji', value: 0 },
          { name: 'Falkland Islands', value: 0 },
          { name: 'France', value: 0 },
          { name: 'Gabon', value: 0 },
          { name: 'United Kingdom', value:0 },
          { name: 'Georgia', value: 0 },
          { name: 'Ghana', value: 0 },
          { name: 'Guinea', value: 0 },
          { name: 'Gambia', value: 0 },
          { name: 'Guinea Bissau', value: 0 },
          { name: 'Equatorial Guinea', value: 0 },
          { name: 'Greece', value: 0 },
          { name: 'Greenland', value: 0 },
          { name: 'Guatemala', value: 0 },
          { name: 'French Guiana', value: 0 },
          { name: 'Guyana', value: 0 },
          { name: 'Honduras', value: 0 },
          { name: 'Croatia', value: 0 },
          { name: 'Côte d Ivoire', value: 0 },
          { name: 'Haiti', value: 0 },
          { name: 'Hungary', value: 0 },
          { name: 'Indonesia', value: 0 },
          { name: 'India', value: 0 },
          { name: 'Ireland', value: 0 },
          { name: 'Iran', value: 0 },
          { name: 'Iraq', value: 0 },
          { name: 'Iceland', value: 0 },
          { name: 'Israel', value: 0 },
          { name: 'Italy', value: 0 },
          { name: 'Jamaica', value: 350 },
          { name: 'Jordan', value: 0 },
          { name: 'Japan', value: 0 },
          { name: 'Kazakhstan', value: 0 },
          { name: 'Kenya', value: 0 },
          { name: 'Kyrgyzstan', value: 0 },
          { name: 'Cambodia', value: 0 },
          { name: 'South Korea', value: 0 },
          { name: 'Kosovo', value: 0 },
          { name: 'Kuwait', value: 0 },
          { name: 'Laos', value: 0 },
          { name: 'Lebanon', value: 0 },
          { name: 'Liberia', value: 0 },
          { name: 'Libya', value: 0 },
          { name: 'Sri Lanka', value: 0 },
          { name: 'Lesotho', value: 0 },
          { name: 'Lithuania', value: 0 },
          { name: 'Luxembourg', value: 0 },
          { name: 'Latvia', value: 0 },
          { name: 'Morocco', value: 0 },
          { name: 'Moldova', value: 0 },
          { name: 'Madagascar', value: 0 },
          { name: 'Mexico', value: 0 },
          { name: 'Macedonia', value: 0 },
          { name: 'Mali', value: 0 },
          { name: 'Myanmar', value: 0 },
          { name: 'Montenegro', value: 0 },
          { name: 'Mongolia', value: 0 },
          { name: 'Mozambique', value: 0 },
          { name: 'Mauritania', value: 0 },
          { name: 'Malawi', value: 0 },
          { name: 'Malaysia', value: 0 },
          { name: 'Namibia', value: 0 },
          { name: 'New Caledonia', value: 0 },
          { name: 'Niger', value: 0 },
          { name: 'Nigeria', value: 0 },
          { name: 'Nicaragua', value: 0 },
          { name: 'Netherlands', value: 0 },
          { name: 'Norway', value: 0 },
          { name: 'Nepal', value: 0 },
          { name: 'New Zealand', value: 0 },
          { name: 'Oman', value: 0 },
          { name: 'Pakistan', value: 0 },
          { name: 'Panama', value: 0 },
          { name: 'Peru', value: 0 },
          { name: 'Philippines', value: 0 },
          { name: 'Papua New Guinea', value: 0 },
          { name: 'Poland', value: 0 },
          { name: 'Puerto Rico', value: 0 },
          { name: 'North Korea', value: 0 },
          { name: 'Portugal', value: 0 },
          { name: 'Paraguay', value: 0 },
          { name: 'Qatar', value: 0 },
          { name: 'Romania', value: 0 },
          { name: 'Russia', value: 0 },
          { name: 'Rwanda', value: 0 },
          { name: 'Western Sahara', value: 0 },
          { name: 'Saudi Arabia', value: 0 },
          { name: 'Sudan', value: 0 },
          { name: 'S. Sudan', value: 0 },
          { name: 'Senegal', value: 0 },
          { name: 'Solomon Islands', value: 0 },
          { name: 'Sierra Leone', value: 0 },
          { name: 'El Salvador', value: 0 },
          { name: 'Somaliland', value: 0 },
          { name: 'Somalia', value: 0 },
          { name: 'Republic of Serbia', value: 0 },
          { name: 'Suriname', value: 0 },
          { name: 'Slovakia', value: 0 },
          { name: 'Slovenia', value: 0 },
          { name: 'Sweden', value: 0 },
          { name: 'Swaziland', value: 0 },
          { name: 'Syria', value: 0 },
          { name: 'Chad', value: 0 },
          { name: 'Togo', value: 0 },
          { name: 'Thailand', value: 0 },
          { name: 'Tajikistan', value: 0 },
          { name: 'Tanzania', value: 0 },
          { name: 'Turkmenistan', value: 0 },
          { name: 'East Timor', value: 0 },
          { name: 'Trinidad and Tobago', value: 0 },
          { name: 'Tunisia', value: 0 },
          { name: 'Turkey', value: 0 },
          { name: 'United States', value: 0 },
          { name: 'United Republic of Tanzania', value: 0 },
          { name: 'Uganda', value: 0 },
          { name: 'Ukraine', value: 0 },
          { name: 'Uruguay', value: 0 },
      
          { name: 'Uzbekistan', value: 0 },
          { name: 'Venezuela', value: 0 },
          { name: 'Vietnam', value: 0 },
          { name: 'Vanuatu', value: 0 },
          { name: 'West Bank', value: 0 },
          { name: 'W. Sahara', value: 0},
          { name: 'Yemen', value: 0 },
          { name: 'South Africa', value: 0 },
          { name: 'Zambia', value: 0 },
          { name: 'Zimbabwe', value: 0 }]
        this.biSvc.getSingleApp(this.selectedAppNames, this.projectId).subscribe(apps => {
          that.appData = apps; 
          that.countrCount = 0
          setTimeout(function () {
           
            that.appData.forEach((data, count = 0) => {
              count++
              var index = -1;
          
              data.attribute_details.forEach(attr => {
    
                if (attr.key == 'country_of_usage') {
                 
                  if (attr.value == "") {
                    //console.log(JSON.stringify(attr.value))
                  }
    
                  else if (attr.value != "") {
                    that.countrCount += 1;
                    //  console.log("right",attr.value)
                    if (that.valueObj.length != 0) {
                      for (let x in that.valueObj) {
                       
                        if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
                          console.log("objjjuk", attr.value.trim(), that.valueObj[x])
                          if (that.valueObj[x].country == "United Kingdom") {
    
                            that.valueObj[x].count += 1
                           
                            break;
                          }
                        }
    
                        if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America" || attr.value.trim() == "United States") {
                         
                          if (that.valueObj[x].country == "United States") {
                            that.valueObj[x].count += 1
                            
                            break;
                          }
                        }
                        if (that.valueObj[x].country == attr.value.trim()) {
                          that.valueObj[x].count += 1
                         
                          break;
                        }
    
                        if (+x == that.valueObj.length - 1) {
    
                          if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
    
                            that.valueObj.push({
                              ['country']: "United Kingdom",
                              ['count']: 1
                            })
                            break;
                          }
                          if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America" || attr.value.trim() == "United States") {
                            that.valueObj.push({
                              ['country']: "United States",
                              ['count']: 1
                            })
                            break;
                          }
                          
                         
                          that.valueObj.push({
                            ['country']: attr.value.trim(),
                            ['count']: 1
                          })
                        
                        }
                      }
                    }
                    else if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
    
                      that.valueObj.push({
                        ['country']: "United Kingdom",
                        ['count']: 1
                      })
                     
                    }
                    else if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America" || attr.value.trim() == "United States") {
                      that.valueObj.push({
                        ['country']: "United States",
                        ['count']: 1
                      })
                      
                    }
                    else {
                      console.log("uh?????", attr.value.trim())
                      that.valueObj.push({
                        ['country']: attr.value.trim(),
                        ['count']: 1
                      })
                     
                    }
    
                    
                  }
    
                } //console.log("country", that.valueObj, that.countrCount)
              })
    
            })
            console.log("objjjus1111111111", that.valueObj,that.oldDataMap,that.countrCount)
            for (let x of that.oldDataMap) {
              for (let y of that.valueObj) {
                if (x.name == y.country) {
                  x.value = Math.ceil(10 * y.count / that.countrCount);
                  break;
                }
    
              }
            }
              console.log("aaonchanges",that.oldDataMap)
          }, 1500)
          setTimeout(function () {
            
            console.log(JSON.stringify("enter"))
            that.appData.forEach((data, count = 0) => {
              count++
              var index = -1;
    
              data.attribute_details.forEach(attr => {
    
                if (attr.key == 'country_of_usage') {
    
                  if (attr.value == "") {
                    //console.log(JSON.stringify(attr.value))
                  }
    
                  else if (attr.value != "") {
                    that.countrCount += 1;
                    //  console.log("right",attr.value)
                    if (that.valueObj.length != 0) {
                      for (let x in that.valueObj) {
                        console.log("====", attr.value.trim())
                        if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
                          console.log("objjjuk", attr.value.trim(), that.valueObj[x])
                          if (that.valueObj[x].country == "United Kingdom") {
    
                            that.valueObj[x].count += 1
    
                            break;
                          }
                        }
    
                        if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America") {
                          console.log("objjjus", attr.value.trim(), that.valueObj[x])
                          if (that.valueObj[x].country == "United States") {
                            that.valueObj[x].count += 1
    
                            break;
                          }
                        }
                        if (that.valueObj[x].country == attr.value.trim()) {
                          that.valueObj[x].count += 1
    
                          break;
                        }
    
                        if (+x == that.valueObj.length - 1) {
                          console.log("pp", +x)
                          that.valueObj.push({
                            ['country']: attr.value.trim(),
                            ['count']: 1
                          })
    
                        }
                      }
                    }
                    else if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
                     
                      that.valueObj.push({
                        ['country']: "United Kingdom",
                        ['count']: 1
                      })
    
                    }
                    else if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America") {
                      that.valueObj.push({
                        ['country']: "United States",
                        ['count']: 1
                      })
    
                    }
                    else {
                      console.log("uk?????", attr.value)
                      that.valueObj.push({
                        ['country']: attr.value.trim(),
                        ['count']: 1
                      })
    
                    }
    
    
                  }
    
                } //console.log("country", that.valueObj, that.countrCount)
              })
    
            })
    
            for (let x of that.oldDataMap) {
              for (let y of that.valueObj) {
                
                if (x.name == y.country) {
                  x.value = Math.ceil(10 * y.count / that.countrCount);
                  break;
                }
    
              }
            }
            console.log("aaon changes2", that.oldDataMap)
             
    
    
              //console.log("fFfffffff", that.valueObj)
    
              // console.log("countryafter", that.countrCount, that.oldDataMap, that.valueObj)
              // for (let x of that.oldDataMap) {
              //   for (let y of that.valueObj) {
              //     if (x.name == y.country) {
              //       x.value = Math.ceil(1000 * y.count );
              //       console.log("count",x.name)
              //       break;
              //     }
    
              //   }
              // }
    
              that.ngAfterViewInit()
    
            }, 2000)
          })
    
     
      }
      this.oldSelectedNames = this.selectedAppNames
      this.oldselectedEvent = this.selectedEvent

    }

  }
  ngOnInit() {
    this.seriesdata = []
    this.labels = []
    this.labels2 = []
    this.seriesdata2 = []
    const that = this

    this.biSvc.getSingleApp(this.selectedAppNames, this.projectId).subscribe(apps => {
      that.appData = apps
      that.countrCount = 0
      setTimeout(function () {
        console.log(JSON.stringify("enter"))
        that.appData.forEach((data, count = 0) => {
          count++
          var index = -1;
      
          data.attribute_details.forEach(attr => {

            if (attr.key == 'country_of_usage') {

              if (attr.value == "") {
                //console.log(JSON.stringify(attr.value))
              }

              else if (attr.value != "") {
                that.countrCount += 1;
                //  console.log("right",attr.value)
                if (that.valueObj.length != 0) {
                  for (let x in that.valueObj) {
                   console.log("====", attr.value.trim())
                    if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
                      console.log("objjjuk", attr.value.trim(), that.valueObj[x])
                      if (that.valueObj[x].country == "United Kingdom") {

                        that.valueObj[x].count += 1
                       
                        break;
                      }
                    }

                    if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America" || attr.value.trim() == "United States") {
                      console.log("objjjus", attr.value.trim(), that.valueObj[x])
                      if (that.valueObj[x].country == "United States") {
                        that.valueObj[x].count += 1
                        
                        break;
                      }
                    }
                    if (that.valueObj[x].country == attr.value.trim()) {
                      that.valueObj[x].count += 1
                     
                      break;
                    }

                    if (+x == that.valueObj.length - 1) {

                      if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {

                        that.valueObj.push({
                          ['country']: "United Kingdom",
                          ['count']: 1
                        })
                        break;
                      }
                      if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America" || attr.value.trim() == "United States") {
                        that.valueObj.push({
                          ['country']: "United States",
                          ['count']: 1
                        })
                        break;
                      }
                      
                     
                      that.valueObj.push({
                        ['country']: attr.value.trim(),
                        ['count']: 1
                      })
                    
                    }
                  }
                }
                else if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {

                  that.valueObj.push({
                    ['country']: "United Kingdom",
                    ['count']: 1
                  })
                 
                }
                else if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America" || attr.value.trim() == "United States") {
                  that.valueObj.push({
                    ['country']: "United States",
                    ['count']: 1
                  })
                  
                }
                else {
                  console.log("uh?????", attr.value.trim())
                  that.valueObj.push({
                    ['country']: attr.value.trim(),
                    ['count']: 1
                  })
                 
                }

                
              }

            } //console.log("country", that.valueObj, that.countrCount)
          })

        })
       
        for (let x of that.oldDataMap) {
          for (let y of that.valueObj) {
            if (x.name == y.country) {
              x.value = Math.ceil(1000 * y.count / that.countrCount);
              break;
            }

          }
        }
          console.log("aa",that.oldDataMap)
      }, 1500)
      setTimeout(function () {
        console.log(JSON.stringify("enter"))
        that.appData.forEach((data, count = 0) => {
          count++
          var index = -1;

          data.attribute_details.forEach(attr => {

            if (attr.key == 'country_of_usage') {

              if (attr.value == "") {
                //console.log(JSON.stringify(attr.value))
              }

              else if (attr.value != "") {
                that.countrCount += 1;
                //  console.log("right",attr.value)
                if (that.valueObj.length != 0) {
                  for (let x in that.valueObj) {
                    console.log("====", attr.value.trim())
                    if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
                      console.log("objjjuk", attr.value.trim(), that.valueObj[x])
                      if (that.valueObj[x].country == "United Kingdom") {

                        that.valueObj[x].count += 1

                        break;
                      }
                    }

                    if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America") {
                      console.log("objjjus", attr.value.trim(), that.valueObj[x])
                      if (that.valueObj[x].country == "United States") {
                        that.valueObj[x].count += 1

                        break;
                      }
                    }
                    if (that.valueObj[x].country == attr.value.trim()) {
                      that.valueObj[x].count += 1

                      break;
                    }

                    if (+x == that.valueObj.length - 1) {
                      console.log("pp", +x)
                      that.valueObj.push({
                        ['country']: attr.value.trim(),
                        ['count']: 1
                      })

                    }
                  }
                }
                else if (attr.value.trim() == "UK" || attr.value.trim() == "United Kingdom") {
                 
                  that.valueObj.push({
                    ['country']: "United Kingdom",
                    ['count']: 1
                  })

                }
                else if (attr.value.trim() == "US" || attr.value.trim() == "USA" || attr.value.trim() == "United States of America" || attr.value.trim() == "America") {
                  that.valueObj.push({
                    ['country']: "United States",
                    ['count']: 1
                  })

                }
                else {
                  console.log("uk?????", attr.value)
                  that.valueObj.push({
                    ['country']: attr.value.trim(),
                    ['count']: 1
                  })

                }


              }

            } //console.log("country", that.valueObj, that.countrCount)
          })

        })

        for (let x of that.oldDataMap) {
          for (let y of that.valueObj) {
            
            if (x.name == y.country) {
              x.value = Math.ceil(100 * y.count / that.countrCount);
              break;
            }

          }
        }
        console.log("aa", that.oldDataMap)
         


          //console.log("fFfffffff", that.valueObj)

          // console.log("countryafter", that.countrCount, that.oldDataMap, that.valueObj)
          // for (let x of that.oldDataMap) {
          //   for (let y of that.valueObj) {
          //     if (x.name == y.country) {
          //       x.value = Math.ceil(1000 * y.count );
          //       console.log("count",x.name)
          //       break;
          //     }

          //   }
          // }

          that.ngAfterViewInit()

        }, 2000)
      })


    
  }





  //==============================================
  ngAfterViewInit() {
    // this.dataObj = []
    // this.dataObj2 = []
    // this.labels.forEach((label, index) => {
    //   this.dataObj.push({ value: this.seriesdata[index], name: label })
    // })
    // this.labels2.forEach((label, index) => {
    //   this.dataObj2.push({ value: this.seriesdata2[index], name: label })
    // })

    console.log("ass", this.oldDataMap)
    var xx=this.countrCount
    this.chartOption = {

      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          var value = (params.value + '').split('.');
          var value2 =(value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,')
            ) 
         
          return params.seriesName + '<br/>' + params.name + ' : ' + value2+'%';
        }
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        x: 'right',
        y: 'center',
        feature: {
          mark: { show: false },
          dataView: { title: "View",show: true, readOnly: true ,lang: ['Countries', 'Close']},
          saveAsImage: { title: "Save", type: "jpeg", show: true }
        }
      },
      dataRange: {
        min: 0,
        max: 100,
        text: ['High', 'Low'],
        realtime: false,
        calculable: true,
        color: ['maroon', 'red','orangered', '#e1f5fe']
      },
  
      series: [
        {
          name: 'Country',
          type: 'map',
          mapType: 'world',
          roam: false,
          label: {
            normal: {
              position: 'inner'
            }
          }, labelLine: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            emphasis: { label: { show: false } }
          },
          data:this.oldDataMap
        }
      ]
    };
  }

  onChartClick(e) {
    console.log("event",e)
  }


}
