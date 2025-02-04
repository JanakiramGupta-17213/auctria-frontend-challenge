import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as any[],
  }),

  actions: {
    addToCart(ticket: any) {
      const existingItem = this.cart.find((item) => item.id === ticket.id);
      if (existingItem && existingItem.quantity + 1 <= existingItem.count) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...ticket, quantity: 1 });
      }
    },

    decreaseQuantity(ticketId: number) {
      const itemIndex = this.cart.findIndex((item) => item.id === ticketId);
      if (itemIndex !== -1) {
        if (this.cart[itemIndex].quantity > 1) {
          this.cart[itemIndex].quantity -= 1;
        } else {
          this.cart.splice(itemIndex, 1); // Remove from cart if quantity is 0
        }
      }
    },

    getItemQuantity(ticketId: number) {
      const item = this.cart.find((item) => item.id === ticketId);
      return item ? item.quantity : 0;
    },
  },
});
