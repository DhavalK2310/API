var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
var ProjectMetaSchema = new Schema({
    Block: {
        type: String,
        require: true
    },
    Size: {
        type: String,
        required: true
    },
    Area: {
        type: String,
        required: true
    },
    AreaUnit: {
        type: String,
        required: true
    },
    ProjId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }]

}, {
    timestamps: true //Add two fields automatically createdAt and updatedAt
});
var ProjectsMeta = mongoose.model('ProjectMeta', ProjectMetaSchema);
module.exports = ProjectsMeta;