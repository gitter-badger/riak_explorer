import DS from 'ember-data';

var RiakObject = DS.Model.extend({

    bucket: DS.belongsTo('bucket'),

    bucketType: DS.belongsTo('bucket-type'),

    cluster: DS.belongsTo('cluster'),

    contents: DS.attr(),

    isLoaded: DS.attr('boolean', {defaultValue: false}),

    key: DS.attr('string'),

    // This object was marked as deleted by Explorer UI,
    //  but may show up in key list cache.
    markedDeleted: DS.attr('boolean', {defaultValue: false}),

    // Headers
    metadata: DS.belongsTo('object-metadata'),

    rawUrl: DS.attr('string'),

    bucketId: function() {
        return this.get('bucket').get('bucketId');
    }.property('bucket'),

    bucketTypeId: function() {
        return this.get('bucketType').get('bucketTypeId');
    }.property('bucket'),

    clusterId: function() {
        return this.get('cluster').get('clusterId');
    }.property('bucket'),

    isDeleted: function() {
        var deletedOnRiak = false;
        if(this.get('metadata')) {
            deletedOnRiak = this.get('metadata').get('isDeleted');
        }
        return this.get('markedDeleted') || deletedOnRiak;
    }.property('markedDeleted', 'metadata')
});

export default RiakObject;
