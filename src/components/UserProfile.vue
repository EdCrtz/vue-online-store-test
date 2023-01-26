<template>
    <div class="inner-block2">
    <h1>Perfil de Usuario</h1>
    <form>
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="nombre" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" class="form-control" />
      </div>
      <div class="form-group">
        <label>Contraseña:</label>
        <input v-model="password" type="password" class="form-control" />
      </div>
      <div>
        <br>
      <button @click="updateUser" type="submit" class="btn btn-primary button-space">Actualizar Información</button>
      </div>
      
    </form>
    <br>
    <button @click="deleteAccount" type="submit" class="btn btn-danger button-space">Eliminar Cuenta</button>
    <button class="btn btn-primary button-space" @click="logOut">Cerrar Sesion</button>
   
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nombre: "",
      email: "",
      password: "",
    };
  },
  methods: {
    updateUser() {
        const data = {
          nombre: this.nombre,
          email: this.email,
          password: this.password
        };
        const token = localStorage.getItem('access_token');
        axios.patch('http://localhost:4000/auth/user', data, {headers: {'Authorization': 'Bearer '+ token}})
        // eslint-disable-next-line no-unused-vars
        .then((_response) => {
            alert("Información actualizada exitosamente")
        })
        .catch(error => {
            console.log(error);
        });
    },
    logOut(){
        localStorage.removeItem('access_token');
        this.$router
          .push({ path: '/login' })
          .then(() => { this.$router.go() })
    },
    deleteAccount() {
        const token = localStorage.getItem('access_token');
        axios.delete('http://localhost:4000/auth/user', {headers: {'Authorization': 'Bearer '+ token}})
        // eslint-disable-next-line no-unused-vars
        .then(_response => {
            localStorage.removeItem('access_token')
            this.$router.push({ path: '/login' });
            alert("Cuenta eliminada exitosamente")
        })
        .catch(error => {
            console.log(error);
        });
    }
  }
};
</script>