var mongoose = require('mongoose')

var Schema = mongoose.Schema
var projectSchema = new Schema({
    project_id: { type: String, required: true, unique: true },
    project:{ type: String, required: false },
    project_name: { type: String, required: true },
    version:{ type: String, required: false },
    version_flag:{ type: Boolean, required: false },
    version_of:{ type: String, required: false },
    project_type: { type: String, required: false },
    project_status: { type: String, required: false },
    start_date: { type: String, required: false },
    delivery_date: { type: String, required: false },
    project_budget_hours: { type: Number, required: false },
    project_budget: { type: String, required: false },
    description: { type: String, required: false },
    project_users:[{
        project_name:{type:String,required:true},
        user_email:{type:String,required:true},
        username:{type:String,required:true},
        password:{type:String,required:true},
        role:{type:String,required:true},
        authkey:{type:String,required:true}
    } ],
    created_by: { type: String, required: false },
    created_at:{ type: String, required: false },
    modified_by: { type: String, required: false },
    modified_at:{ type: String, required: false },
    attribute_details: { type: Object, required: false },
    map_config:[],

    applications: [
        {
            application_id: { type: String, required: true,sparse:true,unique:true},
            application_name:{ type: String},
            average_application_percentage: { type: Number, required: false },
            attribute_category_completion:{ type: Array, required: false },
            attribute_details: [
                {
                    key: { type: String, required: false },
                    label: { type: String, required: false },
                    controlType: { type: String, required: false },
                    value: { type: String, required: false },
                    category_type: { type: String, required: false },
                    options: { type: Array, required: false },
                    order: { type: String, required: false },
                    type: { type: String, required: false },
                    required:  { type: String, require: false }
                }

            ],
            score_category_completion:[
                {
                    completed_fields: { type: Number, required: false },
                    total_fields: { type: Number, required: false },
                    category_type: { type: String, required: false }
                }
            ],
            scores: { type: Object, required: false },
            created_by: { type: String, required: false },
            created_at:{ type: String, required: false },
            modified_by: { type: String, required: false },
            modified_at:{ type: String, required: false }



        }
    ]


})
module.exports = mongoose.model('Project', projectSchema)