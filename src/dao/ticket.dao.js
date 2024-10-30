const ticketModel = require('../dao/models/ticket.model');

class TicketDao {

    static async create(ticket) {
        try {
            return await ticketModel.create(ticket);
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear un nuevo tiket => error: ${error.message}`)
        }
    }
}

module.exports = { TicketDao };