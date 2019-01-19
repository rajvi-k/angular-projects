import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";
import { Http } from "@angular/http";
import { LocalStorageService } from 'ng2-webstorage';

@Injectable()

export class BiDataService {
	bcItem: any = []
	readonly API_URL: string = "http://172.17.111.16:3500"

	constructor(private http: Http, private localStorageSvc: LocalStorageService) { }

	//Project by ID
	public getProjectById(pid): Observable<any[]> {
		var url = `${this.API_URL}/transform/projects/pname/${this.localStorageSvc.retrieve("project_name")}`
		return this.http.get(url)
			.map(res => res.json())
			.catch(err => Observable.throw(err));
	}
	//total projects
	public getTotalProjects(): Observable<any> {
		var url = `${this.API_URL}/api/apps/count`
		return this.http.get(url)
			.map(res => res.json())
			.catch(err => Observable.throw(err));
	}
	public getAllProjectsDescription(): Observable<any> {
		var url = `${this.API_URL}/api/apps/aggregate/totalapps`
		return this.http.get(url)
			.map(res => res.json())
			.catch(err => Observable.throw(err));
	}
	// project Desc by Id
	public getProjectDescription(pid) {
		var appData
		var project_details = { number_apps: '', description: "", project_budget: "", project_budget_hours: "", project_name: "", project_status: "", start_date: "", project_type: "" }
		this.getProjectById(pid).subscribe((data: any) => {
			appData = data

			project_details.description = appData[0].description
			project_details.project_budget = appData[0].project_budget
			project_details.project_name = appData[0].project_name
			project_details.start_date = appData[0].start_date
			project_details.project_type = appData[0].project_type
			project_details.project_budget_hours = appData[0].project_type
			project_details.project_status = appData[0].project_status
			project_details.number_apps = appData[0].applications.length


		})
		console.log(project_details)
		return project_details
	}

	//project_filters
	public getBCItem(data: any) {
		this.bcItem = data;
		console.log("In Service", this.bcItem);
	}

	//filtered appNames
	public getAllFilterAppName(pid) {
		if (!this.bcItem[0]) {
			appBcNames = this.getAllApplicationsName(pid)
			return appBcNames;
		}
		else {
			var appBcNames: any[] = []
			this.getAllApplications(pid).subscribe(apps => {
				// console.log(apps)
				_.map(apps, (app: any) => {
					// console.log(app.attribute_details)
					let flag1, flag2, flag3, flag4, flag5, flag6 = false;
					_.map(app.attribute_details, (attr: any) => {

						if (attr.key == 'business_critically') {
							for (let i of this.bcItem) {
								if (attr.value == i) {
									// alert(i);
									flag1 = true;
								}
							}
						}

						if (attr.key == 'country_of_usage') {
							for (let i of this.bcItem) {
								if (attr.value === i) {
									// alert(i);
									flag2 = true;
								}
							}
						}

						if (attr.key == 'storage_type') {
							for (let i of this.bcItem) {
								if (attr.value === i) {
									// alert(i);
									flag3 = true;
								}
							}
						}

						if (attr.key == 'os') {
							for (let i of this.bcItem) {
								if (attr.value === i) {
									// alert(i);
									flag4 = true;
								}
							}
						}

						if (attr.key == 'pace_layer_category') {
							for (let i of this.bcItem) {
								if (attr.value === i) {
									// alert(i);
									flag5 = true;
								}
							}
						}

						if (attr.key == 'user_type') {
							for (let i of this.bcItem) {
								if (attr.value === i) {
									// alert(i);
									flag6 = true;
								}
							}
						}
					})
					if (flag1 && flag2 && flag3 && flag4 && flag5 && flag6) {
						_.map(app.attribute_details, (attr: any) => {
							if (attr.key == "name") {
								// console.log(attr.value)
								appBcNames.push(attr.value)
								// console.log(appBcNames);
							}
						})
					}
					else if (flag1 || flag2 || flag3 || flag4 || flag5 || flag6) {
						_.map(app.attribute_details, (attr: any) => {
							if (attr.key == "name") {
								// console.log(attr.value)
								appBcNames.push(attr.value)
								// console.log(appBcNames);
							}
						})
					}



				})
			})
			return appBcNames
		}

	}

	//OLD 
	public getByAttributes(data, key) {
		var count = 0
		var groups = {}
		var appdata
		console.log("received", data, key)
		// this.getByAttributesMapper(data).subscribe(apps=>{
		// 	console.log(apps)
		// })
		// data.map(apps => {
		// 	appdata = apps
		// })




		// .map(apps=>{
		// 	apps=>appdata.json()
		// })

		// var groupStruct = { name: "", value: 0 }

		// .map(apps=>
		// 	appdata=apps,

		// )

		// console.log("hey",appdata)
		// data.subscribe(apps => {
		// 	console.log(apps)
		// })

		var source: any = Observable.from(data)
		_.map(data, (apps: any) => {
			console.log("inside", apps)
		})
		// _.map(apps, function (app: any) {
		// 	console.log("Hey")
		// 	if (attr.key === key) {
		// 		  console.log(attr.value)
		// 		if (!groups.hasOwnProperty(attr.value)) {
		// 			// console.log(attr.value)
		// 			if (attr.value == "") {
		// 				groups["N/A"] = 1
		// 			}
		// 			else {
		// 				groups[attr.value] = 1
		// 			}
		// 		}
		// 		else {
		// 			groups[attr.value] = groups[attr.value] + 1
		// 		}


		// 	}
		// })





	}

	//ONE APPLICATION IN A PROJECT
	public getSingleAppByName(name) {
		var url = `${this.API_URL}/transform/projects/pname/${this.localStorageSvc.retrieve("project_name")}`
		return this.http.get(url)
			.map(res => res.json())
			.catch(err => Observable.throw(err));
	}
	public getAppById(project_id, app_id) {
		var url = `http://172.17.111.16:3500/api/apps/${project_id}/application/${app_id}`
		return this.http.get(url)
			.map(res => res.json())
			.catch(err => Observable.throw(err));
	}


	//Get apps selected, by Names[]
	public getSingleApp(names: string[], pid) {
		var selectedApp: any[] = []
		// this.getAllApplications().subscribe(apps => {
		// 	// console.log("here",apps)
		// 	// console.log("here", app)
		// 	// console.log("hey there",app)


		// 	// console.log(app[0].attribute_details)
		// 	_.map(apps, (app: any) => {
		// 		if (name == "All Applications") {
		// 			// console.log("here", app)
		// 			selectedApp.push(apps)
		// 		}
		// 		else {
		// 			_.map(app.attribute_details, (attr: any) => {
		// 				if (attr.key == "name") {
		// 					// selectedApp=[]
		// 					if (attr.value == name) {
		// 						// console.log(app[0])
		// 						// console.log(app)
		// 						selectedApp.push(app)
		// 					}
		// 				}
		// 			})
		// 		}
		// 		//  console.log(app)

		// 	})

		// })
		// names.forEach(name => {
		// 	if (name == "All Applications") {
		// 		this.getAllApplications().subscribe(apps => {
		// 			_.map(apps, app => {
		// 				selectedApp.push(app)
		// 			})
		// 		})
		// 	}

		// 	else {
		// 		this.getByAttributesMapper(name).subscribe(app => {
		// 			selectedApp.push(app.applications)
		// 		})
		// 	}
		// })
		this.getAllApplications(pid).subscribe(apps => {

			names.forEach(name => {
				if (name == "All Applications") {

					_.map(apps, app => {
						selectedApp.push(app)
					})
				}
				else {
					_.map(apps, (app: any) => {
						_.map(app.attribute_details, (attr: any) => {
							if (attr.key == "name" && attr.value == name) {
								selectedApp.push(app)
							}
						})
					})
				}
			})

		})

		return Observable.of(selectedApp)

	}

	//Old
	public getAppByName(names: string[], pid) {
		var selectedApp: any[] = []
		// this.getAllApplications().subscribe(apps => {
		// 	// console.log("here",apps)
		// 	// console.log("here", app)
		// 	// console.log("hey there",app)


		// 	// console.log(app[0].attribute_details)
		// 	_.map(apps, (app: any) => {
		// 		if (name == "All Applications") {
		// 			// console.log("here", app)
		// 			selectedApp.push(apps)
		// 		}
		// 		else {
		// 			_.map(app.attribute_details, (attr: any) => {
		// 				if (attr.key == "name") {
		// 					// selectedApp=[]
		// 					if (attr.value == name) {
		// 						// console.log(app[0])
		// 						// console.log(app)
		// 						selectedApp.push(app)
		// 					}
		// 				}
		// 			})
		// 		}
		// 		//  console.log(app)

		// 	})

		// })
		names.forEach(name => {
			if (name == "All Applications") {
				this.getAllApplications(pid).subscribe(apps => {
					_.map(apps, app => {
						selectedApp.push(app)
					})
				})

			}

			else {
				this.getSingleAppByName(name).subscribe(app => {
					selectedApp.push(app.applications)
				})
			}
		})


		return selectedApp

	}

	//Get names of all All applications
	public getAllApplicationsName(pid) {
		var appNames: any[] = []
		this.getAllApplications(pid).subscribe(apps => {
			// console.log(apps)
			_.map(apps, (app: any) => {
				// console.log(app.attribute_details)
				_.map(app.attribute_details, (attr: any) => {

					if (attr.key == "name") {
						// console.log(attr.value)
						appNames.push(attr.value)
					}
				})


			})

		})
		return appNames
	}

	//get data for all applications
	public getAllApplications(pid) {
		var project: Observable<any>
		project = this.getProjectById(pid)
		return project.map(data =>
			data[0].applications
		)
		// return project[.applications
	}




}
