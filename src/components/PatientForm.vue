<template>
  <div class="patient-form">
    <h2>Adicionar Paciente</h2>
    <form @submit.prevent="addPatient">
      <div class="form-group">
        <input v-model="name" placeholder="Nome" required />
      </div>
      <div class="form-group">
        <input v-model="age" type="number" placeholder="Idade" required />
      </div>
      <div class="form-group">
        <input v-model="condition" placeholder="Condição" required />
      </div>
      <div class="form-group">
        <input v-model="recipe" placeholder="Receita (opcional)" />
      </div>
      <button type="submit">Adicionar</button>
    </form>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      name: "",
      age: "",
      condition: "",
      recipe: "",
    }
  },
  methods: {
    async addPatient() {
      try {
        await axios.post("http://localhost:3000/patients", {
          name: this.name,
          age: this.age,
          condition: this.condition,
          recipe: this.recipe,
        })
        alert("Paciente adicionado!")
        this.name = ""
        this.age = ""
        this.condition = ""
        this.recipe = ""
        this.$emit("patientAdded")
      } catch (error) {
        console.error("Erro ao adicionar paciente:", error)
        alert("Não foi possível adicionar o paciente.")
      }
    },
  },
}
</script>

<style scoped>
.patient-form h2 {
  color: #4caf50;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 15px;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  box-sizing: border-box;
}

textarea {
  resize: none;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>
