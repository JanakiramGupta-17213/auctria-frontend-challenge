import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: [] as any[],
  }),

  actions: {
    addToCart(ticket: any) {
      const existingItem = this.cart.find((item) => item.id === ticket.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cart.push({ ...ticket, quantity: 1 });
      }
    },
  },
});
