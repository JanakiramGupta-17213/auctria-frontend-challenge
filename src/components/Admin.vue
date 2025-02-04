<template>
  <div class="admin-container">
    <h1>Admin Panel</h1>

    <button @click="showModal = true" class="add-ticket-btn">Add Ticket</button>
    <div class="tickets-list-block">
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
              <button
                @click="ticketStore.deleteTicket(ticket.id)"
                class="delete-btn"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="!ticketStore.tickets.length">
            <td colspan="6" style="text-align: center">No data Available</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Create New Ticket</h2>

        <form @submit.prevent="addNewTicket">
          <label>Ticket Name:</label>
          <input v-model="newTicket.name" required />

          <label>Description:</label>
          <textarea v-model="newTicket.description"></textarea>

          <label style="cursor: pointer">
            <input
              class="isVIPSelection"
              type="checkbox"
              v-model="newTicket.isVIP"
            />
            VIP Ticket
          </label>

          <label>Count:</label>
          <input
            type="number"
            v-model.number="newTicket.count"
            required
            min="1"
          />

          <label>Price ($):</label>
          <input
            type="number"
            v-model.number="newTicket.price"
            required
            min="0"
          />

          <div class="modal-actions">
            <button type="submit" class="add-btn">Add Ticket</button>
            <button @click="showModal = false" type="button" class="cancel-btn">
              Cancel
            </button>
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
  if (
    newTicket.value.name.trim() &&
    newTicket.value.count > 0 &&
    newTicket.value.price >= 0
  ) {
    ticketStore.addTicket({ ...newTicket.value });
    newTicket.value = {
      name: "",
      description: "",
      isVIP: false,
      count: 1,
      price: 0,
    };
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

.tickets-list-block {
  overflow: auto;
  height: 60vh;
  float: left;
  width: 100%;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  position: relative;
}

th {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th::after {
  content: "";
  display: block;
  height: 1px;
  background-color: #ddd;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
}

td {
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

.isVIPSelection {
  width: 3% !important;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-content h2 {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.modal-content label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
}

.modal-content input,
.modal-content textarea {
  width: 60%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  color: #333;
}

.modal-content textarea {
  resize: vertical;
  min-height: 100px;
}

.modal-content label input[type="checkbox"] {
  margin-right: 8px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
}

.add-btn {
  background-color: #4caf50;
  color: white;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #45a049;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
  transition: background-color 0.3s;
}

.cancel-btn:hover {
  background-color: #e53935;
}

@media (max-width: 600px) {
  .modal-content {
    padding: 15px;
  }

  .modal-content h2 {
    font-size: 20px;
  }

  .modal-actions button {
    font-size: 14px;
  }
}
</style>
