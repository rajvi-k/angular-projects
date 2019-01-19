import { Injectable } from "@angular/core";
import { attributes } from "../models/attribute";
import { fields } from "../models/fields";

@Injectable()

export class DataService {

  
        createLabel(key){
              for(let x of this.fields){
                      if(x.key==key){
                              return x.label,
                              console.log('label',x.label)
                      }
                      else{
                              return null;
                      }
              }
              
              
                return null
                    
            }
            


        fields = [
                //GENERAL ATTRIBUTES
                new fields(1, 1, 'Name', '', 'name', 'textbox', 'general_attributes', [], '', 'email', true),
                new fields(2, 1, 'Description', '', 'description', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(3, 1, 'Lob', '', 'lob', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(4, 1, 'Business Function', '', 'business_function', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(5, 1, 'Owner', '', 'owner', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(6, 1, 'Business Critically', '', 'business_critically', 'textbox', 'general_attributes', ['Not Critical', 'Critical'], '', 'email', false),
                new fields(7, 1, 'Application Age', '', 'application_age', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(8, 1, 'Planned Decommission Date Month / Year', '', 'planned_decommission_date_month_Year', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(9, 1, 'Functional Complexity', '', 'functional_complexity', 'textbox', 'general_attributes', ['Not at all user friendly', 'less user friendly', 'extremly user friendly'], '', 'email', false),
                new fields(10, 1, 'Functional Fitment', '', 'functional_fitment', 'textbox', 'general_attributes', ['Well Aligned', 'Minor fuctional upgrdes', 'Misfit'], '', 'email', false),
                new fields(11, 1, 'Operating Knowledge', '', 'operating_knowledge', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(12, 1, 'UI Type', '', 'ui_type', 'textbox', 'general_attributes', ['BrowserBased(B)', 'Mobile App(M)', 'All(A)', 'B+M', 'B+D', 'M+D'], '', 'email', false),
                new fields(13, 1, 'Country Of Usage', '', 'country_of_usage', 'textbox', 'general_attributes', ['GBR', 'USA'], '', 'email', false),
                new fields(14, 1, 'Languages Supported', '', 'languages_supported', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(15, 1, 'User Type', '', 'user_type', 'textbox', 'general_attributes', ['Business User', 'End Customer'], '', 'email', false),
                new fields(16, 1, 'No Of Users', '', 'no_of_users', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(17, 1, 'Expected User Growth', '', 'expected_user_growth', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(18, 1, 'Usability Index', '', 'usability_index', 'textbox', 'general_attributes', ['Not at all user friendly', 'less user friendly', 'extremly user friendly'], '', 'email', false),
                new fields(19, 1, 'Application Documentation', '', 'application_documentation', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(20, 1, 'OS', '', 'os', 'textbox', 'general_attributes', ['Linux', 'Windows'], '', 'email', false),
                new fields(21, 1, 'Deployment Type', '', 'deployment_type', 'textbox', 'general_attributes', ['On-premise', 'Public cloud', 'PaaS', 'Client Server'], '', 'email', false),
                new fields(22, 1, 'Production Release Frequency Per Year', '', 'production_release_frequency_per_year', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(23, 1, 'Vendor Dependency', '', 'vendor_dependency', 'textbox', 'general_attributes', ['high', 'medium', 'low'], '', 'email', false),
                new fields(24, 1, 'Compliance Standard', '', 'compliance_standard', 'textbox', 'general_attributes', [], '', 'email', false),
                new fields(25, 1, 'Application Category', '', 'application_category', 'textbox', 'general_attributes', [], '', 'email', false),
                // new fields(24, 1, 'general_attributes_completion_percentage',['high','medium','low'] ),

                // INTEGRATION ATTRIBUTES

                new fields(25, 2, 'No of Integrations', '', 'no_of_integrations', 'textbox', 'integration_attributes', [], '', 'email', false),
                new fields(26, 2, 'No of Point to Point Integrations', '', 'no_of_point_to_point_Integrations', 'textbox', 'integration_attributes', [], '', 'email', false),
                new fields(27, 2, 'No of Middleware Based Integrations', '', 'no_of_middleware_based_Integrations', 'textbox', 'integration_attributes', [], '', 'email', false),
                new fields(28, 2, 'No of Api per services exposed', '', 'no_of_api_per_services_exposed', 'textbox', 'integration_attributes', [], '', 'email', false),
                new fields(29, 2, 'Percent of functionality available as Api', '', 'percent_of_functionality_avaiable_as_api', 'textbox', 'integration_attributes', [], '', 'email', false),
                new fields(30, 2, 'Affinity Score', '', 'affinity_score', 'textbox', 'integration_attributes', [], '', 'email', false),
                // new fields(31, 2, 'integration_attributes_completion_percentage','' ),

                //TICKET ATTRIBUTES

                new fields(32, 3, 'Total No of Tickets', [2], 'total_no_of_tickets', 'textbox', 'ticket_attributes', [], '', 'email', false),
                new fields(33, 3, 'No of CRs', [4], 'no_of_crs', 'textbox', 'ticket_attributes', [], '', 'email', false),
                new fields(34, 3, 'No of Bug Fixes', [5], 'no_of_bug_fixes', 'textbox', 'ticket_attributes', [], '', 'email', false),
                // new fields(35, 3, 'ticket_attributes_completion_percentage','' ),

                //CUSTOM BUILT
                new fields(36, 4, 'Custom Built', '', 'custom_built', 'textbox', 'application_type', [], '', 'email', false),
                new fields(37, 4, 'Packaged or COTS', '', 'packaged_or_cots', 'textbox', 'application_type', [], '', 'email', false),
                new fields(38, 4, 'UI Dev Language', '', 'ui_dev_language', 'textbox', 'application_type', ['Javascript', 'VBscript'], '', 'email', false),
                new fields(38, 4, 'Application Type', '', 'app_type', 'textbox', 'application_type', ['Javascript', 'VBscript'], '', 'email', false),
                new fields(39, 4, 'UI Library Framework with version', '', 'ui_library_framework_with_version', 'textbox', 'application_type', ['ExtJS', 'Angular JS', 'React'], '', 'email', false),
                new fields(40, 4, 'Application Layer Dev Language', '', 'application_layer_dev_language', 'textbox', 'application_type', ['Java', 'C#', 'VB.Net'], '', 'email', false),
                new fields(41, 4, 'Application Layer Library Framework with version', '', 'application_layer_library_framework_with_version', 'textbox', 'application_type', ['Spring 4.0', 'Net 3.0', 'J2ee 6', 'BPM'], '', 'email', false),
                new fields(42, 4, 'Application Layer Products with version', '', 'application_layer_products_with_version', 'textbox', 'application_type', ['Tomcat', 'WebLogic', 'Websphere', 'Glassfish', 'Jboss'], '', 'email', false),
                new fields(43, 4, 'Middleware with version', '', 'middleware_with_version', 'textbox', 'application_type', ['Mule ESB 2.0', 'Fusion Middleware 12c'], '', 'email', false),
                new fields(44, 4, 'Storage Type', '', 'storage_type', 'textbox', 'application_type', ['RDBMS', 'NoSQL', 'Filesystem'], '', 'email', false),
                new fields(45, 4, 'Storage Product and version', '', 'storage_product_and_version', 'textbox', 'application_type', ['Oracle 12c', 'MongoDB X.X', 'MySQL'], '', 'email', false),
                new fields(46, 4, 'Persistence Database framework with version', '', 'persistence_database_framework_with_version', 'textbox', 'application_type', ['Hibernate 3.0', 'Toplink X.x', 'JDBC', 'ODBC', 'ADO .NET'], '', 'email', false),
                new fields(47, 4, 'SCM Tool', '', 'scm_tool', 'textbox', 'application_type', ['GIT', 'SVN', 'VSS'], '', 'email', false),
                // new fields(48, 5, 'custom_built_completon_percentage',''),

                //
                new fields(49, 5, 'Pace Layer Category', '', 'pace_layer_category', 'textbox', "classification_attributes", [], '', 'email', false),
                new fields(50, 5, '4 Rs', '', 'four_r_s', 'textbox', "classification_attributes", [], '', 'email', false),
                //


            
              
              
              
              
              
              
              
              
              
              
                // //OPTIMIZE SCORES
                //         new fields(51, 7, 'os_stability',  '', 'name', 'textbox', 'custom_applications_attributes',['1-very unstable','2-unstable','3-Stable','4-very stable']),
                //         new fields(52, 7, 'os_maturity',['1-many Cr s','2-Moderate Cr s','3- Few Cr s','4- no Cr s']),
                //         new fields(53, 7, 'os_availability_score',['1-high no. of down time incidents,2-Not meeting expected Avaiability SLA','3-Moderate no of downtime incidents, not meeting the expected SLA','4-Few no of downtime incidents, not meeting the expected SLA']),
                //         new fields(54, 7, 'os_scalability_score',['1-If scalabilty SLA not met','2-High no of saclabilityy SLAs not met','3-Moderate no of saclabilityy SLAs not met','4-Few no of saclabilityy SLAs not met','5 - If scalabilty SLA met with future demands met']),
                //         new fields(55, 7, 'os_cloud_applicabilty_score',['1-No Scope for cloud Migration','2-less scope for cloud Migration','3- Moderate scope for cloud migration']),
                //         new fields(56, 7, 'os_current_cloud_score',['0-Move to Cloud (IaaS, SaaS)','1-No scope to move to cloud','2-Move to Cloud as IaaS']),
                //         new fields(57, 7, 'os_redundancy_score',['1 - No redundency','2- Atleast one other redundant Application present','3 - 2 other redundant Applications present']),
                //         new fields(58, 7, 'os_license_optimization_score',['1- Many unused licences','2- less unused licences','3-lesslicence usage','4- Moderate licence usage','5- optimum licence usage']),
                //         new fields(59, 7, 'os_consolidation_score',['1- Cannot propose Consolidation','2- can propose consolidation','3- less probability of consolidation','4- Moderate probability of consolidation','5-High probability of Consolidation (Due to redundency)']),
                //         new fields(60, 7, 'os_technical_debt_score',['1 - No technical debt','2- less technical debt','3- Moderate technical debt','4 - very high Technical debt']),
                // new fields(60, 7, 'os_completion_percentage',''),

                //DIZITALIZE SCORES
                // new fields(49, 8, 'ds_straight_through processing_adoption_score',['1-Low','2-Medium','3-High']),
                // new fields(50, 8, 'ds_api_applicability_score',['1 - No scope to create APIs in the application','2- Scope to create','3- Moderate scope of APIs','4 - Very High scope of APIs (May be Due to high no. of inbound integrations)']),
                // new fields(50, 8, 'ds_current_api_adoption_score',['1 - No APIs','2- Few APIs','3-many APIs','4 - Almost entire functionality avaiable as API']),
                // new fields(50, 8, 'ds_technology_obsolecence',['1-Latest technology','2- Current technology','3- near to obsoletion ','4-Obsolete and needs immediate replacement']),
                // new fields(50, 8, 'ds_mobility_enablement_scope',['1 - No scope or need for Mobile Enablement','2- Scope for mobile enablement','3- Moderate scope for mobile enablement','4-Very high scope for Mobile enablement']),
                // new fields(50, 8, 'ds_current_mobility_adoption_level ',['1-Basic','2-Moderate','3-Complete']),
                // new fields(50, 8, 'ds_self_service_adoption',['1-Basic','2-Moderate','3-Complete']),
                // new fields(50, 8, 'ds_completion_percentage',''),

                //EXPEDITE SCORES
                // new fields(50, 9, 'es_testing_automation_adoption',['1-Basic','2-Moderate','3-Complete']),
                // new fields(50, 9, 'es_devOps_applicability_score',['1- no scope for Devops initiative','2- scope for devops initiative','3- Moderate scope for devops initiative','4- high scope for devops initiative']),
                // new fields(50, 9, 'es_current_dev_ops_adoption_score',['1- No Devops adoption','2- less devops adoption','3- moderate devops adoption']),
                // // new fields(50, 9, 'es_completion_percentage',''),

                //MONETIZE SCORES
                // new fields(50, 10, 'ms_unique_functionality',['1-yes','2-no']),
                // new fields(50, 10, 'ms_registered_as_ip',['1-yes','2-no']),
                // new fields(50, 10, 'ms_current_roi_realization_model',['0-None','1-Diffrentiator','2-VaS','3-Independent Service']),
                // new fields(50, 10, 'ms_market_potential',['low','medium','high']),
                // new fields(50, 10, 'ms_ease_of_monetization',['With Minor Changes','With Refactoring','With Re-Engineering']),
                // new fields(50, 10, 'ms_monetization_model',['API','SaaS']),
                // new fields(50, 10, 'ms_completion_percentage',''),

                //INNOVATION SCORES
                // new fields(50, 11, 'is_ai_or_ml_applicability',''),
                // new fields(50, 11, 'is_chat_bot_applicability',''),
                // new fields(50, 11, 'is_rpa_applicability_score',''),
                // new fields(50, 11, 'is_block_chain_applicability_score',''),
                // new fields(50, 11, 'is_completion_percentage',''),

                //OTHERS
                // new fields(50, 12, 'ot_lti_owner',''),
                // new fields(50, 12, 'ot_redundant_application_name',''),
                // new fields(50, 12, 'ot_impact_of_downtime',''),
                // new fields(50, 12, 'ot_tco_score',''),
                // new fields(50, 12, 'ot_devlopement_methodology',''),
                // new fields(50, 12, 'ot_completion_percentage',''),

        ];
        getAttributes() {
                return [
                        new attributes(1, 'general_attributes'),
                        new attributes(2, 'integration_attributes'),
                        new attributes(3, 'ticket_attributes'),
                        new attributes(4, 'application_type'),
                        // new attributes(5, 'custom_applications_attributes'),
                        new attributes(5, 'classification_attributes'),
                        new attributes(6, 'compliance_standard_attributes'),
                        new attributes(7, 'application_category'),
                        //      new attributes(7, 'optimize_scores' ),
                        //      new attributes(8, 'digitalize_scores' ),
                        //      new attributes(9, 'expedite_scores' ),
                        //      new attributes(10, 'monetize_scores' ),
                        //      new attributes(11, 'innovation_scores' ),
                        new attributes(12, 'other'),
                ];
        }

        getFields() {
                return this.fields
        }


}
