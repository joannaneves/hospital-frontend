<template>
  <div class="add-patient">
    <h2>Adicionar Paciente</h2>
    <form @submit.prevent="addPatient">
      <div class="form-group">
        <input v-model="newPatient.name" placeholder="Nome" required />
      </div>
      <div class="form-group">
        <input
          v-model="newPatient.age"
          type="number"
          placeholder="Idade"
          required
        />
      </div>
      <div class="form-group">
        <input v-model="newPatient.condition" placeholder="Condição" required />
      </div>
      <div class="form-group">
        <textarea
          v-model="newPatient.recipe"
          placeholder="Receita (opcional)"
          rows="4"
        ></textarea>
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
      newPatient: {
        name: "",
        age: "",
        condition: "",
        recipe: "", // Campo de receita adicionado
      },
    }
  },
  methods: {
    async addPatient() {
      try {
        await axios.post("http://localhost:3000/patients", {
          patient: this.newPatient, // Envia todos os dados, incluindo a receita
        })
        alert("Paciente adicionado com sucesso!")
        this.newPatient = { name: "", age: "", condition: "", recipe: "" } // Limpa o formulário
      } catch (error) {
        console.error("Erro ao adicionar paciente:", error)
      }
    },
  },
}
</script>

<style scoped>
h2 {
  color: #4caf50;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
