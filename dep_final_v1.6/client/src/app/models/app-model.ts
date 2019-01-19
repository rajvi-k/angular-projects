
export type ProjectApp={

            application_id: string;
            average_application_percentage: string; //Number,

            general_attributes:General_attributes

            integration_attributes: {
                no_of_integrations: string //Number,
                no_of_point_to_point_Integrations: string //Number,
                no_of_middleware_based_Integartions: string //Number,
                no_of_api_per_services_exposed: string //Number,
                percent_of_functionality_avaiable_as_api: string //Number,
                affinity_score: string //Number,
               


            };

            ticket_attributes: {
                ticket_attributes: string,
                total_no_of_tickets: string //Number,
                no_of_crs: string //Number,
                no_of_bug_fixes: string //Number,
               

            };

            application_type:
            {
                custom_applications_attributes: {
                    custom_selected:boolean,
                    ui_dev_language: string,
                    ui_library_framework_with_version: string,
                    application_layer_dev_language: string,
                    application_layer_library_framework_with_version: string,
                    application_layer_products_with_version: string,
                    middleware_with_version: string,
                    storage_type: string,
                    storage_product_and_version: string,
                    persistence_database_framework_with_version: string,
                    scm_tool: string,
                    completion_percentage: string //Number

                };

            
            
                package_attributes: {
                    package_selected:boolean,
                    package_name: string,
                    package: string,
                    package_description: string,
                    vendor: string,
                    competion_percentage: string //Number
                }
            };
            

            classification_attributes: {
                pace_layer_category: string,
                four_rs: string,
                completion_percentage: string //Number

            };

            scores: {

                optimize_scores: {
                    os_stability: string //Number,
                    os_maturity: string //Number,
                    os_availibility_score: string //Number,
                    os_scalability_score: string //Number,
                    os_cloud_applicabilty_score: string //Number,
                    os_current_cloud_score: string //Number,
                    os_redundency_score: string //Number,
                    os_license_optimization_score: string //Number,
                    os_consolidation_score: string //Number,
                    os_technical_debt_score: string //Number,
                    os_competion_percentage: string //Number

                };
                digitalize_scores: {
                    ds_straight_through_processing_adoption_score: string //Number,
                    ds_api_applicability_score: string //Number,
                    ds_current_api_adoption_score: string //Number,
                    ds_technology_obsolecence: string //Number,
                    ds_mobility_enablement_scope: string //Number,
                    ds_current_mobility_adoption_level: string //Number,
                    ds_self_service_adoption: string //Number,
                    ds_competion_percentage: string //Number
                };
                expedite_scores: {
                    es_testing_automation_adoption: string //Number,
                    es_devops_applicability_score: string //Number,
                    es_current_dev_ops_adoption_score: string //Number,
                    es_competion_percentage: string //Number
                };
                monetize_scores: {
                    ms_unique_functionality: string //Number,
                    ms_registered_as_ip: string //Number,
                    ms_current_roi_realization_model: string,
                    ms_market_potential: string //Number,
                    ms_ease_of_monetization: string,
                    ms_monetization_model: string,
                    ms_competion_percentage: string //Number
                };
                innovation_scores: {
                    is_ai_or_ml_applicability: string,
                    is_chat_bot_applicability: string,
                    is_rpa_applicability_score: string,
                    is_block_chain_applicability_score: string,
                    is_competion_percentage: string
                };
                others: {
                    lti_owner: string,
                    redundant_application_name: string,
                    impact_of_downtime: string,
                    tco_score: string //Number,
                    devlopement_methodology: string
                }
            }
        


}
    
type General_attributes ={
    
                    name: string,
                    description: string,
                    lob: string,
                    business_function: string,
                    owner: string,
                    business_critically: string //Number,
                    application_age: string,
                    planned_decommission_date: Date,
                    functional_complexity: string //Number,
                    functional_fitment: string //Number,
                    operating_knowledge: string,
                    ui_type: string,
                    country_of_usage: string,
                    languages_supported: string,
                    user_type: string,
                    no_of_users: string //Number,
                    expected_user_growth: string,
                    usability_index: string //Number,
                    application_documentation: string,
                    os: string,
                    deployment_type: string,
                    production_release_frequency_per_year: string,
                    vendor_dependency: string,
                    completion_percentage: string //Number
    
                };