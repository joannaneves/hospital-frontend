<template>
  <div id="app">
    <!-- Layout com Header e Sidebar -->
    <header class="app-header">
      <h1>HOSPITAL</h1>
      <div class="cart-icon" @click="goToCheckout">
        🛒 <span class="cart-count">{{ cartCount }}</span>
      </div>
    </header>
    <div class="layout">
      <!-- Navbar Lateral -->
      <nav class="sidebar">
        <ul>
          <li @click="navigateTo('home')">🏠 Home</li>
          <li @click="navigateTo('list')">📋 Lista de Pacientes</li>
          <li @click="navigateTo('medications')">💊 Medicamentos</li>
        </ul>
      </nav>

      <!-- Conteúdo Dinâmico -->
      <main class="content">
        <router-view @update-cart="updateCart"></router-view>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    }
  },
  computed: {
    cartCount() {
      return this.cart.reduce((total, item) => total + item.quantity, 0)
    },
  },
  methods: {
    navigateTo(route) {
      if (route === "home") {
        this.$router.push("/")
      } else if (route === "list") {
        this.$router.push("/patients")
      } else if (route === "medications") {
        this.$router.push("/medications")
      }
    },
    goToCheckout() {
      this.$router.push("/checkout")
    },
    updateCart(updatedCart) {
      this.cart = updatedCart
      localStorage.setItem("cart", JSON.stringify(this.cart))
    },
  },
}
</script>

<style scoped>
/* Layout Geral */
.layout {
  display: flex;
  height: 100vh;
}

/* Navbar Lateral */
.sidebar {
  background-color: #f0fdf4;
  padding: 20px;
  width: 220px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar h1 {
  color: #4caf50;
  font-size: 1.8rem;
  margin-bottom: 20px;
  text-align: center;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  cursor: pointer;
  padding: 10px;
  margin-bottom: 10px;
  color: #333;
  border-radius: 5px;
  text-align: center;
}

.sidebar li:hover {
  background-color: #4caf50;
  color: white;
  transition: 0.3s;
}

/* Conteúdo Principal */
.content {
  flex: 1;
  padding: 30px;
  background-color: white;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

body {
  background-color: #f4f7f6;
  color: #333;
  font-size: 16px;
  line-height: 1.6;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.75rem;
}

h3 {
  font-size: 1.5rem;
}

button,
.btn {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  transition: background-color 0.3s ease;
}

button:hover,
.btn:hover {
  background-color: #45a049;
}

.sidebar {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px;
  width: 250px;
  height: 100vh;
}

.sidebar h1 {
  font-size: 2rem;
  margin-bottom: 20px;
  font-weight: bold;
}

.sidebar ul {
  list-style-type: none;
  padding-left: 0;
}

.sidebar ul li {
  margin: 15px 0;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  transition: color 0.3s ease;
}

.sidebar ul li:hover {
  color: #1abc9c;
}

.sidebar ul li:active {
  color: #27ae60;
}

.content {
  padding: 20px;
  margin-left: 270px;
}

.cart-item {
  background-color: #fff;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item p {
  font-size: 1.1rem;
}

.total {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 20px;
}

.checkout button {
  background-color: #e67e22;
  font-size: 1.2rem;
  padding: 12px 25px;
  width: 100%;
  border-radius: 5px;
}

.checkout button:hover {
  background-color: #d35400;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
}

.app-header h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.cart-icon {
  position: relative;
  cursor: pointer;
  font-size: 1.5rem;
}

.cart-count {
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #e74c3c;
  color: white;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
}
</style>
