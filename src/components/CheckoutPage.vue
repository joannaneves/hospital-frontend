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

      <!-- Formulário para pagamento com Stripe -->
      <form @submit.prevent="handlePayment">
        <div class="form-group">
          <input
            v-model="formData.name"
            type="text"
            placeholder="Nome no Cartão"
            required
          />
        </div>
        <div id="card-element"></div>
        <button type="submit" class="checkout-btn">Finalizar Compra</button>
      </form>
    </div>

    <div v-else>
      <p>O carrinho está vazio.</p>
    </div>

    <p v-if="paymentMessage">{{ paymentMessage }}</p>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js"

export default {
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      stripe: null,
      cardElement: null,
      formData: {
        name: "",
      },
      paymentMessage: "",
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

    // Finaliza a compra e realiza o pagamento com Stripe
    async handlePayment() {
      try {
        // Criação do PaymentIntent no backend
        const response = await fetch(
          "http://localhost:3000/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: this.total * 100, // Convertendo para centavos
              currency: "brl",
            }),
          }
        )

        const { clientSecret } = await response.json()

        // Confirmando o pagamento com o método do cartão
        const result = await this.stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: this.cardElement,
            billing_details: {
              name: this.formData.name,
            },
          },
        })

        if (result.error) {
          this.paymentMessage = `Erro: ${result.error.message}`
        } else if (result.paymentIntent.status === "succeeded") {
          this.paymentMessage = "Compra realizada com sucesso!"
          localStorage.removeItem("cart")
          this.cart = []
          this.$router.push("/")
        }
      } catch (error) {
        console.error(error)
        this.paymentMessage = "Erro ao processar o pagamento."
      }
    },
  },
  mounted() {
    this.cart.forEach((item) => {
      if (!item.quantity) {
        item.quantity = 1
      }
    })
    this.updateLocalStorage()

    // Carregar o Stripe e o elemento do cartão
    loadStripe(
      "pk_live_51N1GWMJ1FtsEHrbYUD2r0wgiANFfWpscSjv9QywsJ2hzdBBo0XxDReF6DPA3ta6vq4AIQoTLk0TkLNa2Hx17mGiM00XHUMfRrz"
    ).then((stripe) => {
      this.stripe = stripe
      const elements = stripe.elements()
      this.cardElement = elements.create("card")
      this.cardElement.mount("#card-element")
    })
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

/* Estilo para o formulário */
.form-input {
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  font-size: 1rem;
}

#card-element {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

.form-group {
  margin-bottom: 20px;
}
</style>
