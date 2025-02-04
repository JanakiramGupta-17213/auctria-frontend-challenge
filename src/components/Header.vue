<template>
  <header class="header">
    <button @click="toggleSidebar" class="menu-btn">☰</button>
    <h1>My Ticket App</h1>
  </header>

  <div v-if="isSidebarOpen" class="overlay" @click="toggleSidebar"></div>

  <div class="sidebar" :class="{ open: isSidebarOpen }" @click.stop>
    <button @click="toggleSidebar" class="close-btn">×</button>
    <nav>
      <a
        href="#"
        @click.prevent="navigateTo('/')"
        :class="{ active: route.path === '/' }"
      >
        Home
      </a>
      <a
        href="#"
        @click.prevent="navigateTo('/admin')"
        :class="{ active: route.path === '/admin' }"
      >
        Admin
      </a>
      <a
        href="#"
        @click.prevent="navigateTo('/cart')"
        :class="{ active: route.path === '/cart' }"
      >
        Cart
      </a>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";

const isSidebarOpen = ref(false);
const router = useRouter();
const route = useRoute(); // Get current route

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const navigateTo = (path) => {
  isSidebarOpen.value = false; // Close the sidebar
  router.push(path); // Navigate to the route
};
</script>

<style scoped>
/* Header Styles */
.header {
  background: #007bff;
  color: white;
  display: flex;
  align-items: center;
  padding: 15px;
  font-size: 1.2em;
}

.menu-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  margin-right: 15px;
}

/* Sidebar Styles */
.sidebar {
  position: fixed;
  left: -250px;
  top: 0;
  width: 250px;
  height: 100%;
  background: #333;
  color: white;
  padding-top: 60px;
  transition: left 0.3s ease;
}

.sidebar.open {
  left: 0;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
}

nav {
  display: flex;
  flex-direction: column;
  padding: 20px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
  display: block;
  cursor: pointer;
}

nav a:hover,
nav a.active {
  background: #555;
  font-weight: bold;
  border-left: 4px solid #00d1b2; /* Highlight effect */
  padding-left: 8px;
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
</style>
