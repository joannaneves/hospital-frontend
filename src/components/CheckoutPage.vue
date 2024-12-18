<template>
  <div class="checkout">
    <h2>Resumo do Pedido</h2>
    <div v-if="cart.length > 0">
      <div class="cart-item" v-for="(item, index) in cart" :key="index">
        <img
          :src="item.image"
          alt="Imagem do medicamento"
          class="cart-item-img"
        />
        <div class="cart-item-details">
          <p>{{ item.name }} - R$ {{ item.price.toFixed(2) }}</p>

          <div class="quantity-control">
            <label for="quantity">Quantidade:</label>
            <input
              type="number"
              id="quantity"
              v-model.number="item.quantity"
              min="1"
              :max="item.maxQuantity"
              @change="updateCart"
            />
          </div>

          <button class="btn-remove" @click="removeItem(index)">Excluir</button>
        </div>
      </div>

      <div class="total">
        <h3>Total: R$ {{ total.toFixed(2) }}</h3>
      </div>

      <button class="checkout-btn" @click="completeCheckout">
        Finalizar Compra
      </button>
    </div>
    <div v-else>
      <p>O carrinho está vazio.</p>
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
    total() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
    },
  },
  methods: {
    // Remove o item do carrinho e atualiza o localStorage
    removeItem(index) {
      this.cart.splice(index, 1)
      this.updateLocalStorage()
    },

    // Atualiza o localStorage após a alteração da quantidade
    updateCart() {
      this.updateLocalStorage()
    },

    // Atualiza o localStorage com o carrinho atual
    updateLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart))
    },

    // Finaliza a compra, removendo o carrinho e indo para a página inicial
    completeCheckout() {
      alert("Compra finalizada! Total: R$ " + this.total.toFixed(2))
      localStorage.removeItem("cart")
      this.cart = []
      this.$router.push("/")
    },
  },

  // Define a quantidade inicial para 1
  mounted() {
    this.cart.forEach((item) => {
      if (!item.quantity) {
        item.quantity = 1
      }
    })
    this.updateLocalStorage()
  },
}
</script>

<style scoped>
h2 {
  color: #4caf50;
  text-align: center;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item-img {
  max-width: 100px;
  height: auto;
  margin-right: 20px;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-control input {
  width: 60px;
  padding: 5px;
  margin-left: 10px;
}

.btn-remove {
  background-color: #e74c3c;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  align-self: flex-start;
  width: auto;
}

.btn-remove:hover {
  background-color: #c0392b;
}

.total {
  font-size: 1.2rem;
  margin-top: 20px;
  text-align: right;
}

.checkout-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.checkout-btn:hover {
  opacity: 0.8;
}
</style>
