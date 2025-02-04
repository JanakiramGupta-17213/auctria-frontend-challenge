<template>
  <div class="landing-container">
    <h1>Available Tickets</h1>

    <div class="ticket-grid">
      <div
        v-for="ticket in ticketStore.tickets"
        :key="ticket.id"
        class="ticket-card"
        :class="{ vip: ticket.isVIP }"
      >
        <div class="ticket-header">
          <h2>{{ ticket.name }}</h2>
          <span v-if="ticket.isVIP" class="vip-badge">VIP</span>
        </div>

        <p class="ticket-description">{{ ticket.description }}</p>
        <p><strong>Available:</strong> {{ ticket.count }}</p>
        <p><strong>Price:</strong> ${{ ticket.price.toFixed(2) }}</p>

        <div
          v-if="cartStore.getItemQuantity(ticket.id) > 0"
          class="quantity-controls"
        >
          <button
            v-if="cartStore.getItemQuantity(ticket.id) > 0"
            @click="cartStore.decreaseQuantity(ticket.id)"
          >
            ➖
          </button>
          <span>{{ cartStore.getItemQuantity(ticket.id) }}</span>
          <button
            v-if="cartStore.getItemQuantity(ticket.id) < ticket.count"
            @click="cartStore.addToCart(ticket)"
          >
            ➕
          </button>
        </div>

        <button
          v-else
          @click="cartStore.addToCart(ticket)"
          class="add-to-cart-btn"
        >
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTicketStore } from "@/store/ticketStore";
import { useCartStore } from "@/store/cartStore";

const ticketStore = useTicketStore();
const cartStore = useCartStore();
</script>

<style scoped>
.landing-container {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.ticket-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.ticket-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
  position: relative;
}

.vip {
  border: 2px solid gold;
  background: rgba(255, 215, 0, 0.1);
}

.ticket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.vip-badge {
  background: gold;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.ticket-description {
  font-size: 0.9em;
  color: gray;
}

.add-to-cart-btn {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  cursor: pointer;
  background: #007bff;
  color: white;
  border-radius: 5px;
  font-size: 1em;
}

.add-to-cart-btn:hover {
  background: #0056b3;
}

.quantity-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.quantity-controls button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 1.2em;
}

.quantity-controls button:hover {
  background: #0056b3;
}
</style>
