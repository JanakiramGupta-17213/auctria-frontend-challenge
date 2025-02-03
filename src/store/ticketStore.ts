import { defineStore } from "pinia";

export interface Ticket {
  id: number;
  name: string;
  description: string;
  isVIP: boolean;
  count: number;
  price: number;
}

export const useTicketStore = defineStore("ticketStore", {
  state: () => ({
    tickets: [] as Ticket[],
    nextId: 10001,
  }),

  actions: {
    addTicket(ticket: Omit<Ticket, "id">) {
      this.tickets.push({ id: this.nextId++, ...ticket });
    },

    deleteTicket(id: number) {
      this.tickets = this.tickets.filter((ticket) => ticket.id !== id);
    },
  },

  getters: {
    totalTickets: (state) => state.tickets.length,
  },
});
