var mongoose = require('mongoose');
var assert = require('assert');
var Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
var SchemaTypes = mongoose.Schema.Types;
var BookingSchema = new Schema({
    bookingdate: {
        type: Date,
        require: true
    },
    custId: [{ type: mongoose.Schema.Types.ObjectId,  ref: 'Customer' }],
    projId: [{ type: mongoose.Schema.Types.ObjectId,  ref: 'Project' }],
    unitId: [{ type: mongoose.Schema.Types.ObjectId,  ref: 'ProjectsMeta' }],
    rate: {
        type: SchemaTypes.Double,
        require: true
    },
    area: {
        type: SchemaTypes.Double,
        require: true
    },
    basicprice: {
        type: SchemaTypes.Double,
    },
    tokan: {
        type: SchemaTypes.Double,
        required: true
    },
    rs: {
        type: SchemaTypes.Double,
    },
    pendingamount: {
        type: SchemaTypes.Double,
    },
    noinstallment: {
        type: SchemaTypes.Double,
        required: true
    },
    monthlyinstallment: {
        type: SchemaTypes.Double,
        
    },
}, {
    timestamps: true //Add two fields automatically createdAt and updatedAt
});
var Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;