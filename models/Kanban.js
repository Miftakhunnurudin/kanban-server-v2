const {ObjectId} = require('mongodb')
const {getDatabase} = require('../config/mongodb')

class Kanban {
    static db() {
        return getDatabase().collection('kanbans')
    }
    static find() {
        return this.db().find().toArray()
    }
    static findOne(id) {
        return this.db().findOne({_id:ObjectId(id)})
    }
    static insertOne(data) {
        return this.db().insertOne(data)
    }
    static update(id,data) {
        return this.db().updateOne({_id:ObjectId(id)}, {$set:data}, {new:true})
    }
    static deleteOne(id) {
        return this.db().deleteOne({_id:ObjectId(id)})
    }
}

module.exports = Kanban