<template>
  <div class="cart-container">
    <h1>Your Cart</h1>

    <div v-if="cartStore.cart.length === 0" class="empty-cart">
      <p>No items in the cart.</p>
    </div>

    <div class="cart-grid" v-else>
      <div 
        v-for="item in cartStore.cart" 
        :key="item.id" 
        class="cart-card"
      >
        <h2>{{ item.name }}</h2>
        <p>{{ item.description }}</p>
        <p><strong>Price:</strong> ${{ item.price.toFixed(2) }}</p>
        <p><strong>Quantity:</strong> {{ item.quantity }}</p>
        <p><strong>Total:</strong> ${{ (item.price * item.quantity).toFixed(2) }}</p>
      </div>
    </div>

    <div v-if="cartStore.cart.length > 0" class="cart-summary">
      <h2>Total: ${{ totalPrice.toFixed(2) }}</h2>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/store/cartStore";

const cartStore = useCartStore();

const totalPrice = computed(() =>
  cartStore.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
</script>

<style scoped>
.cart-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  text-align: center;
}

.cart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.cart-card {
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: left;
}

.cart-summary {
  margin-top: 20px;
  padding: 15px;
  background: #f8f8f8;
  border-radius: 5px;
  font-size: 1.2em;
}

.empty-cart {
  font-size: 1.2em;
  color: gray;
  margin-top: 20px;
}
</style>
