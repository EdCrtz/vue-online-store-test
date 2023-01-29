<template>
    <div class="inner-block2">
    <h1>Perfil de Usuario</h1>
    <form>
      <div class="form-group">
        <label>Nombre:</label>
        <input v-model="name" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label>Email:</label>
        <input v-model="email" type="email" class="form-control" />
      </div>
      <div class="form-group">
        <label>Nueva Contraseña:</label>
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
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    updateUser() {
        const data = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        const token = localStorage.getItem('access_token');
        axios.put('http://localhost:3000/api/v1/users/user', data, {headers: {'Authorization': 'Bearer '+ token}})
        // eslint-disable-next-line no-unused-vars
        .then((_response) => {
            alert("Información actualizada exitosamente")
        })
        .catch(() => {
          this.$toast.error("Ocurrio un error al actualizar el usuario")
        });
    },
    logOut(){
        localStorage.removeItem('access_token');
        this.$router
          .push({ path: '/login' })
          .then(() => { this.$router.go() })
    },
    async deleteAccount() {
        const token = localStorage.getItem('access_token');
          this.$dialog({
            message: 'Esta seguro que quiere eliminar esta cuenta?',
            buttons: ['no', 'si'],
            callbacks: {
        si: () => {
          axios.delete('http://localhost:3000/api/v1/users/user', {headers: {'Authorization': 'Bearer '+ token}})
        // eslint-disable-next-line no-unused-vars
        .then(_response => {
            localStorage.removeItem('access_token')
            this.$router.push({ path: '/login' }).then(() => { this.$router.go() })
            this.$toast.success('Cuenta eliminada exitosamente');
        })
        .catch(() => {
          this.$toast.error("Ocurrio un error al eliminar el usuario")
        });
            //some function
        }
    }
      
          })
       
    }
  },
  mounted() {
    const token = localStorage.getItem('access_token');
    axios.get('http://localhost:3000/api/v1/users/user', {headers: {'Authorization': 'Bearer '+ token}})
        // eslint-disable-next-line no-unused-vars
        .then((_response) => {
            this.name=_response.data.name;
            this.email=_response.data.email;
      
        })
        .catch(() => {
          this.$toast.error("Ocurrio un error al cargar el usuario")
        });
  }
};
</script>