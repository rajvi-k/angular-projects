import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ExelSettingsModule { 
 
attribute_details:any={
  ['general_attributes']:[
    
       'name',
       'description',
       'lob' ,
       'business_function',
       'owner',
       'business_critically',
       'application_age',
       'planned_decommission_date',
       'functional_complexity',
       'functional_fitment' ,
       'operating_knowledge' ,
       'ui_type' ,
       'country_of_usage' ,
       'languages_supported' ,
       'user_type' ,
       'no_of_users' ,
       'expected_user_growth',
       'usability_index' ,
       'application_documentation',
       'os' ,
       'deployment_type' ,
       'production_release_frequency_per_year',
       'vendor_dependency',
          
]
}

         data= [
            {
              application_id:'12233001',
              name:null,
              description :undefined,
              // lob :"IT",
              // business_function :"xyz",
              // owner:"sahil",
              // business_critically :2,
              // application_age :2,
              // planned_decommission_date :new Date("8-08-2017"),
              // functional_complexity:3,
              // functional_fitment :2,
              // operating_knowledge :"no knowledge",
              // ui_type :"desktop",
              // country_of_usage :"GBR",
              // languages_supported :"java",
              // user_type :"Business User",
              // no_of_users :10000,
              // expected_user_growth:"yes",
              // usability_index :4,
              // application_documentation :"done",
              // os : "windows",
              // deployment_type :"private cloud",
              // production_release_frequency_per_year :1,
              // vendor_dependency: "Medium",
              // no_of_integrations:4,
              // no_of_point_to_point_Integrations:4 ,
              // no_of_middleware_based_Integartions:4,
              // no_of_api_per_services_exposed:40,
              // percent_of_functionality_avaiable_as_api:50,
              // affinity_score:40,
       
              // ticket_attributes:"ticket1",
              // total_no_of_tickets:4, 
              // no_of_crs:5, 
              // no_of_bug_fixes:6,
      
              // custom_selected:"true",
              // ui_dev_language:"javaScript", 
              // ui_library_framework_with_version:"angular js", 
              // application_layer_dev_language:"java",
              // application_layer_library_framework_with_version:"sprint 4.0",
              // application_layer_products_with_version:"Tomcat",
              // middleware_with_version:"Mule ESb 2.0",
              // storage_type:"Nosql" ,
              // storage_product_and_version:"Mongodb 3.4", 
              // persistence_database_framework_with_version:"Hibernate", 
              // scm_tool:"Git",
      
      
              // package_selected:"false",
              // package_name:"oracle",
              // package:"sql",
              // package_description:"database",
              // vendor:"oracle",
             
      
              // pace_layer_category:"SOR",
              // four_rs:"Replace",
              // completion_percentage:100,
      
      
              // stability:4,
              // maturity:4,
              // availibility_score:4 ,
              // scalability_score:4,
              // cloud_applicabilty_score:4,
              // current_cloud_score:4,
              // redundency_score:2, 
              // license_optimization_score:4,
              // consolidation_score:4, 
              // technical_debt_score:4,
        
      
              // straight_through_processing_adoption_score:"Medium" ,
              // api_applicability_score:4,
              // current_api_adoption_score:4, 
              // technology_obsolecence:4,
              // mobility_enablement_scope:4 ,
              // current_mobility_adoption_level:"Basic", 
              // self_service_adoption:"Basic",
          
      
              // testing_automation_adoption:"Basic", 
              // devops_applicability_score:"5",
              // current_dev_ops_adoption_score:"Vas",
      
              // unique_functionality:"yes", 
              // registered_as_ip:"yes",
              // current_roi_realization_model:"None" ,
              // market_potential:"Medium",
              // ease_of_monetization:"with minor changes", 
              // monetization_model:"Api",
      
              // ai_or_ml_applicability:1 , 
              // chat_bot_applicability:1  ,
              // rpa_applicability_score:4,
              // block_chain_applicability_score:4,
      
              // lti_owner:"ABC" ,
              // redundant_application_name:"ABC v.1.0", 
              // impact_of_downtime:"End user Impact",
              // tco_score:1 ,
              // devlopement_methodology:"Agile" 
      
            },
            {
              application_id:'2220001667',
              name:"Search engine" , 
              description :"Complex Searches and filtering",
              // lob :"IT",
              // business_function :"xyz",
              // owner:"sahil",
              // business_critically :2,
              // application_age :2,
              // planned_decommission_date :new Date("8-08-2017"),
              // functional_complexity:3,
              // functional_fitment :2,
              // operating_knowledge :"no knowledge",
              // ui_type :"desktop",
              // country_of_usage :"GBR",
              // languages_supported :"java",
              // user_type :"Business User",
              // no_of_users :10000,
              // expected_user_growth:"yes",
              // usability_index :4,
              // application_documentation :"done",
              // os : "windows",
              // deployment_type :"private cloud",
              // production_release_frequency_per_year :1,
              // vendor_dependency: "Medium",
              // no_of_integrations:4,
              // no_of_point_to_point_Integrations:4 ,
              // no_of_middleware_based_Integartions:4,
              // no_of_api_per_services_exposed:40,
              // percent_of_functionality_avaiable_as_api:50,
              // affinity_score:40,
       
              // ticket_attributes:"ticket1",
              // total_no_of_tickets:4, 
              // no_of_crs:5, 
              // no_of_bug_fixes:6,
      
              // custom_selected:"true",
              // ui_dev_language:"javaScript", 
              // ui_library_framework_with_version:"angular js", 
              // application_layer_dev_language:"java",
              // application_layer_library_framework_with_version:"sprint 4.0",
              // application_layer_products_with_version:"Tomcat",
              // middleware_with_version:"Mule ESb 2.0",
              // storage_type:"Nosql" ,
              // storage_product_and_version:"Mongodb 3.4", 
              // persistence_database_framework_with_version:"Hibernate", 
              // scm_tool:"Git",
      
      
              // package_selected:"false",
              // package_name:"oracle",
              // package:"sql",
              // package_description:"database",
              // vendor:"oracle",
             
      
              // pace_layer_category:"SOR",
              // four_rs:"Replace",
              // completion_percentage:100,
      
      
              // stability:4,
              // maturity:4,
              // availibility_score:4 ,
              // scalability_score:4,
              // cloud_applicabilty_score:4,
              // current_cloud_score:4,
              // redundency_score:2, 
              // license_optimization_score:4,
              // consolidation_score:4, 
              // technical_debt_score:4,
        
      
              // straight_through_processing_adoption_score:"Medium" ,
              // api_applicability_score:4,
              // current_api_adoption_score:4, 
              // technology_obsolecence:4,
              // mobility_enablement_scope:4 ,
              // current_mobility_adoption_level:"Basic", 
              // self_service_adoption:"Basic",
          
      
              // testing_automation_adoption:"Basic", 
              // devops_applicability_score:"5",
              // current_dev_ops_adoption_score:"Vas",
      
              // unique_functionality:"yes", 
              // registered_as_ip:"yes",
              // current_roi_realization_model:"None" ,
              // market_potential:"Medium",
              // ease_of_monetization:"with minor changes", 
              // monetization_model:"Api",
      
              // ai_or_ml_applicability:1 , 
              // chat_bot_applicability:1  ,
              // rpa_applicability_score:4,
              // block_chain_applicability_score:4,
      
              // lti_owner:"ABC" ,
              // redundant_application_name:"ABC v.1.0", 
              // impact_of_downtime:"End user Impact",
              // tco_score:1 ,
              // devlopement_methodology:"Agile" 
      
            },
      
            {
              application_id:'1220076',
              name:"Chat Bots" , 
              description :"Talkative bots",
              // lob :"IT",
              // business_function :"Bot",
              // owner:"Bhavik",
              // business_critically :2,
              // application_age :2,
              // planned_decommission_date :new Date("8-08-2017"),
              // functional_complexity:3,
              // functional_fitment :2,
              // operating_knowledge :"no knowledge",
              // ui_type :"desktop",
              // country_of_usage :"GBR",
              // languages_supported :"java",
              // user_type :"Business User",
              // no_of_users :10000,
              // expected_user_growth:"yes",
              // usability_index :4,
              // application_documentation :"done",
              // os : "windows",
              // deployment_type :"private cloud",
              // production_release_frequency_per_year :1,
              // vendor_dependency: "Medium",
              // no_of_integrations:4,
              // no_of_point_to_point_Integrations:4 ,
              // no_of_middleware_based_Integartions:4,
              // no_of_api_per_services_exposed:40,
              // percent_of_functionality_avaiable_as_api:50,
              // affinity_score:40,
       
              // ticket_attributes:"ticket1",
              // total_no_of_tickets:4, 
              // no_of_crs:5, 
              // no_of_bug_fixes:6,
      
              // custom_selected:"true",
              // ui_dev_language:"javaScript", 
              // ui_library_framework_with_version:"angular js", 
              // application_layer_dev_language:"java",
              // application_layer_library_framework_with_version:"sprint 4.0",
              // application_layer_products_with_version:"Tomcat",
              // middleware_with_version:"Mule ESb 2.0",
              // storage_type:"Nosql" ,
              // storage_product_and_version:"Mongodb 3.4", 
              // persistence_database_framework_with_version:"Hibernate", 
              // scm_tool:"Git",
      
      
              // package_selected:"false",
              // package_name:"oracle",
              // package:"sql",
              // package_description:"database",
              // vendor:"oracle",
             
      
              // pace_layer_category:"SOR",
              // four_rs:"Replace",
              // completion_percentage:100,
      
      
              // stability:4,
              // maturity:4,
              // availibility_score:4 ,
              // scalability_score:4,
              // cloud_applicabilty_score:4,
              // current_cloud_score:4,
              // redundency_score:2, 
              // license_optimization_score:4,
              // consolidation_score:4, 
              // technical_debt_score:4,
        
      
              // straight_through_processing_adoption_score:"Medium" ,
              // api_applicability_score:4,
              // current_api_adoption_score:4, 
              // technology_obsolecence:4,
              // mobility_enablement_scope:4 ,
              // current_mobility_adoption_level:"Basic", 
              // self_service_adoption:"Basic",
          
      
              // testing_automation_adoption:"Basic", 
              // devops_applicability_score:"5",
              // current_dev_ops_adoption_score:"Vas",
      
              // unique_functionality:"yes", 
              // registered_as_ip:"yes",
              // current_roi_realization_model:"None" ,
              // market_potential:"Medium",
              // ease_of_monetization:"with minor changes", 
              // monetization_model:"Api",
      
              // ai_or_ml_applicability:1 , 
              // chat_bot_applicability:1  ,
              // rpa_applicability_score:4,
              // block_chain_applicability_score:4,
      
              // lti_owner:"ABC" ,
              // redundant_application_name:"ABC v.1.0", 
              // impact_of_downtime:"End user Impact",
              // tco_score:1 ,
              // devlopement_methodology:"Agile" 
      
            },
            {
              application_id:'2234001',
              name:"Transition Portal" , 
              description :"Sector transition",
              // lob :"IT",
              // business_function :"xyz",
              // owner:"sahil",
              // business_critically :2,
              // application_age :2,
              // planned_decommission_date :new Date("8-08-2017"),
              // functional_complexity:3,
              // functional_fitment :2,
              // operating_knowledge :"no knowledge",
              // ui_type :"desktop",
              // country_of_usage :"GBR",
              // languages_supported :"java",
              // user_type :"Business User",
              // no_of_users :10000,
              // expected_user_growth:"yes",
              // usability_index :4,
              // application_documentation :"done",
              // os : "windows",
              // deployment_type :"private cloud",
              // production_release_frequency_per_year :1,
              // vendor_dependency: "Medium",
              // no_of_integrations:4,
              // no_of_point_to_point_Integrations:4 ,
              // no_of_middleware_based_Integartions:4,
              // no_of_api_per_services_exposed:40,
              // percent_of_functionality_avaiable_as_api:50,
              // affinity_score:40,
       
              // ticket_attributes:"ticket1",
              // total_no_of_tickets:4, 
              // no_of_crs:5, 
              // no_of_bug_fixes:6,
      
              // custom_selected:"true",
              // ui_dev_language:"javaScript", 
              // ui_library_framework_with_version:"angular js", 
              // application_layer_dev_language:"java",
              // application_layer_library_framework_with_version:"sprint 4.0",
              // application_layer_products_with_version:"Tomcat",
              // middleware_with_version:"Mule ESb 2.0",
              // storage_type:"Nosql" ,
              // storage_product_and_version:"Mongodb 3.4", 
              // persistence_database_framework_with_version:"Hibernate", 
              // scm_tool:"Git",
      
      
              // package_selected:"false",
              // package_name:"oracle",
              // package:"sql",
              // package_description:"database",
              // vendor:"oracle",
             
      
              // pace_layer_category:"SOR",
              // four_rs:"Replace",
              // completion_percentage:100,
      
      
              // stability:4,
              // maturity:4,
              // availibility_score:4 ,
              // scalability_score:4,
              // cloud_applicabilty_score:4,
              // current_cloud_score:4,
              // redundency_score:2, 
              // license_optimization_score:4,
              // consolidation_score:4, 
              // technical_debt_score:4,
        
      
              // straight_through_processing_adoption_score:"Medium" ,
              // api_applicability_score:4,
              // current_api_adoption_score:4, 
              // technology_obsolecence:4,
              // mobility_enablement_scope:4 ,
              // current_mobility_adoption_level:"Basic", 
              // self_service_adoption:"Basic",
          
      
              // testing_automation_adoption:"Basic", 
              // devops_applicability_score:"5",
              // current_dev_ops_adoption_score:"Vas",
      
              // unique_functionality:"yes", 
              // registered_as_ip:"yes",
              // current_roi_realization_model:"None" ,
              // market_potential:"Medium",
              // ease_of_monetization:"with minor changes", 
              // monetization_model:"Api",
      
              // ai_or_ml_applicability:1 , 
              // chat_bot_applicability:1  ,
              // rpa_applicability_score:4,
              // block_chain_applicability_score:4,
      
              // lti_owner:"ABC" ,
              // redundant_application_name:"ABC v.1.0", 
              // impact_of_downtime:"End user Impact",
              // tco_score:1 ,
              // devlopement_methodology:"Agile" 
      
            }
            
          ];
}
