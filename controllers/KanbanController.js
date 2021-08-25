const Kanban = require('../models/Kanban')
const {v4:uuidv4} = require('uuid')

class KanbanController {
    static getAll () {
        const promise = async (resolve) => {
            const response = Kanban.find()
            resolve(response)
        }
        return new Promise(promise)
    }

    static async getOne (id) {
        const promise = async (resolve) => {
            const response = await Kanban.findOne(id)
            if (response) resolve(response)
            else resolve(null)
        }
        return new Promise(promise)
    }

    static async createKanban (data) {
        const promise = async (resolve) => {
            const {title, ownerId} = data
            const column = []
            const columnTitles = ['To Do','Doing','In Review','Done']
            for (let i = 0; i < 4; i++) {
                column.push({
                    id: 'c'+i,
                    title: columnTitles[i],
                    taskIds: []
                })
            }
            const kanban = {
                title,
                column,
                task: {},
                ownerId,
                contributorIds: [],
                messages: []
            }
            const response = await Kanban.insertOne(kanban)
            resolve({id: String(response.insertedId)})
        }
        return new Promise(promise)
    }

    static async createTask(data){
        const promise = async (resolve) => {
            const {id,task:newTask,columnId} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const { task,column } = isKanbanExist
                newTask.id = uuidv4().toString()
                task[newTask.id] = newTask
                const newColumn = []
                column.forEach(col => {
                    if (col.id === columnId) {
                        col.taskIds.push(newTask.id)
                    }
                    newColumn.push(col);
                })
                const response = await Kanban.update(id, {task, column:newColumn} )
                if (response.result.ok) resolve(task)
            } else resolve(null)
        }
        return new Promise(promise)
    }

    static async updateTitleKanban (data) {
        const promise = async (resolve) => {
            const {id, title} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const response = await Kanban.update(id, {title} )
                if (response.result.ok) resolve(title)
            } else resolve(null)
        }
        return new Promise(promise)
    }

    static async updateTask(data){
        const promise = async (resolve) => {
            const {id,task:newTask} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const { task } = isKanbanExist
                task[newTask.id] = newTask
                const response = await Kanban.update(id, {task} )
                if (response.result.ok) resolve(task)
            } else resolve(null)
        }
        return new Promise(promise)
    }

    static async updateTaskOrder(data){
        const promise = async (resolve) => {
            const {id,taskIds,columnId} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const { column } = isKanbanExist
                column = column.map(col=> {
                    if(col.id === columnId) {
                        col.taskIds = taskIds
                    }
                    return col
                })
                const response = await Kanban.update(id, {task, column} )
                if (response.result.ok) resolve(true)
            } else resolve(null)
        }
        return new Promise(promise)
    }

    static async updateContributors (data) {
        const promise = async (resolve) => {
            const {id, contributorIds} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const response = await Kanban.update(id, {contributorIds} )
                if (response.result.ok) resolve(contributorIds)
            } else resolve(null)
        }
        return new Promise(promise)
    }

    static async updateMessages (data) {
        const promise = async (resolve) => {
            const {id, message} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const {messages} = isKanbanExist
                messages.push(message)
                const response = await Kanban.update(id, {messages} )
                if (response.result.ok) resolve(true)
            } else resolve(false)
        }
        return new Promise(promise)
    }

    static async deleteMessages (id) {
        const promise = async (resolve) => {
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const response = await Kanban.update(id, {messages:[]} )
                if (response.result.ok) resolve(true)
            } else resolve(false)
        }
        return new Promise(promise)
    }

    static async deleteTask(data){
        const promise = async (resolve) => {
            const {id,taskId,columnId} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                let { task,column } = isKanbanExist
                delete task[taskId]
                const newColumn = []
                column.forEach(col => {
                    if (col.id === columnId) {
                        col = col.taskIds.filter(taskIdOld => taskIdOld !== taskId )
                    }
                    newColumn.push(col);
                })
                const response = await Kanban.update(id, {task, column:newColumn} )
                if (response.result.ok) resolve(task)
            } else resolve(null)
        }
        return new Promise(promise)
    }

    static async deleteKanban(id) {
        const promise = async (resolve) => {
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist){
                const response = await Kanban.deleteOne(id)
                if (response.result.ok) resolve(true)
            } else resolve(null)
        }
        return new Promise(promise)
    }
}

module.exports = KanbanController