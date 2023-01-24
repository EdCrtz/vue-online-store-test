<template>
    <div class="vue-tempalte">
        <form @submit.prevent="registerUser">
            <h3>Registrarse</h3>
            <div class="form-group">
                <label>Usuario</label>
                <input type="text" v-model="name" class="form-control form-control-lg"/>
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="email" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Contraseña</label>
                <input type="password" v-model="password" class="form-control form-control-lg" />
            </div>
            <br>
            <button type="submit" class="btn btn-dark btn-lg btn-block">Registrar</button>
            <p class="forgot-password text-right">
                Ya tienes cuenta? 
                <router-link :to="{name: 'login'}">Ingresa?</router-link>
            </p>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        data() {
            return {
      name: '',
      email: '',
      password: ''
    };
        },
        methods: {
    async registerUser() {
      const user = { name: this.name, email: this.email, password: this.password };
      try {
        const response = await axios.post('/users', user);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
    }
</script>