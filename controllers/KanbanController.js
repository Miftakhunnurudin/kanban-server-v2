const Kanban = require('../models/Kanban')

class KanbanController {
    static async getAll () {
        try {
            const response = await Kanban.find()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    static async getOne (id) {
        try {
            const response = await Kanban.findOne(id)
            if (response) return response
            else return null
        } catch (error) {
            console.log(error)
        }
    }

    static async updateTitle (data) {
        try {
            const {id, title} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const response = await Kanban.update(id, {title} )
                if (response.result.ok) return title
            } else return null
        } catch (error) {
            console.log(error)
        }
    }

    static async updateContributors (data) {
        try {
            const {id, contributorIds} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                const response = await Kanban.update(id, {contributorIds} )
                if (response.result.ok) return contributorIds
            } else return null
        } catch (error) {
            console.log(error)
        }
    }

    static async updateMessages (data) {
        try {
            const {id, message} = data
            const isKanbanExist = await Kanban.findOne(id)
            if (isKanbanExist) {
                let {messages} = isKanbanExist.data
                messages = messages.push(message)
                const response = await Kanban.update(id, {messages} )
                if (response.result.ok) return message
            } else return null
        } catch (error) {
            console.log(error)
        }
    }


}