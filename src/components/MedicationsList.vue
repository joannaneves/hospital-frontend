<template>
  <div class="medications">
    <h2>Selecione os Medicamentos</h2>
    <div class="medication-list">
      <div
        class="medication-item"
        v-for="medication in medications"
        :key="medication.id"
      >
        <img
          :src="medication.image"
          alt="medication.name"
          class="medication-image"
        />
        <h3>{{ medication.name }}</h3>
        <p>Preço: R$ {{ medication.price.toFixed(2) }}</p>
        <button @click="addToCart(medication)">Adicionar ao Carrinho</button>
      </div>
    </div>
    <button class="go-to-cart" @click="goToCart">Ir para o Carrinho</button>
  </div>
</template>

<script>
export default {
  name: "MedicationsList",
  data() {
    return {
      medications: [
        {
          id: 1,
          name: "Losartana 50mg",
          price: 20.0,
          image:
            "https://olifarma.com.br/gerenciador/uploads/1/produtos/med_produtos_10_big-produtos-83.jpg",
        },
        {
          id: 2,
          name: "Lacrifilm",
          price: 15.0,
          image:
            "https://www.drogarianovaesperanca.com.br/imagens/600x600/lacrifilm-5mg-ml-oftalmico-frasco-com-15ml-a3dbbec0f7.jpg",
        },
        {
          id: 3,
          name: "Enterogermina",
          price: 30.0,
          image:
            "https://www.farmadireta.com.br/imagens-complete/1000x1000/enterogermina-plus-5ml-com-5-flaconetes-958b2328c7.jpg",
        },
      ],
      cart: JSON.parse(localStorage.getItem("cart")) || [],
    }
  },
  methods: {
    addToCart(medication) {
      const existingItem = this.cart.find((item) => item.id === medication.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cart.push({ ...medication, quantity: 1 })
      }
      this.updateCart()
    },
    updateCart() {
      localStorage.setItem("cart", JSON.stringify(this.cart))
      this.$emit("update-cart", this.cart)
    },
    goToCart() {
      this.$router.push("/checkout")
    },
  },
}
</script>

<style scoped>
h2 {
  color: #4caf50;
  text-align: center;
  margin-bottom: 20px;
}

.medication-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.medication-item {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 150px;
  text-align: center;
  background-color: #f9f9f9;
}

.medication-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  opacity: 0.8;
}

.go-to-cart {
  background-color: #ffa500;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.go-to-cart:hover {
  opacity: 0.8;
}
</style>
