const mongoose = require('mongoose');
const ticketModel = require('./models/ticket.model');

// Clase Ticket. Una vez confirmada la compra, se genera el ticket correspondiente. 
class Ticket {
    constructor(amount, purchaser) {
        this.amount = amount;
        this.purchaser = purchaser;
    }
}


// Clase TicketDao para el manejo de tickets
class TicketDao {

    // Agrega un nuevo Ticket a la DB
    static async addTicket(ticket) {
        try {
            const newTicket = await ticketModel.create(ticket);
            if (newTicket) {
                console.log(`✅ Ticket #'${newTicket._id}' agregado exitosamente a la BD`);
                return newTicket._id;
            }
            return false;
        } catch (error) {
            throw new Error(`⛔ Error: No se pudo crear el ticket en la BD => error: ${error.message}`);
        }
    }

}

module.exports = { Ticket, TicketDao };
