<template>
  <div class="admin-container">
    <h1>Admin Panel</h1>

    <!-- Button to Open Modal -->
    <button @click="showModal = true" class="add-ticket-btn">Add Ticket</button>

    <!-- Ticket Table -->
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>VIP</th>
          <th>Count</th>
          <th>Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ticket in ticketStore.tickets" :key="ticket.id">
          <td>{{ ticket.name }}</td>
          <td>{{ ticket.description }}</td>
          <td>{{ ticket.isVIP ? "✅" : "❌" }}</td>
          <td>{{ ticket.count }}</td>
          <td>${{ ticket.price.toFixed(2) }}</td>
          <td>
            <button @click="ticketStore.deleteTicket(ticket.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
        <tr v-if= "!ticketStore.tickets.length">
          <td colspan="6">No data Available</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Create New Ticket</h2>
        
        <form @submit.prevent="addNewTicket">
          <label>Ticket Name:</label>
          <input v-model="newTicket.name" required />

          <label>Description:</label>
          <textarea v-model="newTicket.description"></textarea>

          <label>
            <input type="checkbox" v-model="newTicket.isVIP" />
            VIP Ticket
          </label>

          <label>Count:</label>
          <input type="number" v-model.number="newTicket.count" required min="1" />

          <label>Price ($):</label>
          <input type="number" v-model.number="newTicket.price" required min="0" />

          <div class="modal-actions">
            <button type="submit" class="add-btn">Add Ticket</button>
            <button @click="showModal = false" type="button" class="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTicketStore } from "@/store/ticketStore";

const ticketStore = useTicketStore();
const showModal = ref(false);

const newTicket = ref({
  name: "",
  description: "",
  isVIP: false,
  count: 1,
  price: 0,
});

const addNewTicket = () => {
  if (newTicket.value.name.trim() && newTicket.value.count > 0 && newTicket.value.price >= 0) {
    ticketStore.addTicket({ ...newTicket.value });
    newTicket.value = { name: "", description: "", isVIP: false, count: 1, price: 0 };
    showModal.value = false;
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

.add-ticket-btn {
  background: green;
  color: white;
  padding: 10px;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.delete-btn {
  background: red;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.add-btn {
  background: blue;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
}

.cancel-btn {
  background: gray;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
}
</style>
