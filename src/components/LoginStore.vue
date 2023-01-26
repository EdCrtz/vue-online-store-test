<template>
    <div class="flex">
    <div class="inner-block">
    <div class="vue-tempalte">
        <form @submit.prevent="login">
                <h3>Ingresar</h3>
                <div class="form-group">
                    <label>Usuario</label>
                    <input v-model="username" class="form-control form-control-lg" />
                </div>
                <div class="form-group">
                    <label>Contraseña</label>
                    <input v-model="password" type="password" class="form-control form-control-lg" />
                </div>
                <br>
                <button type="submit" class="btn btn-dark btn-lg btn-block">Iniciar</button>
            </form>
    </div>
</div>
</div>
</template>
<script>
import axios from 'axios';
    export default {
        data() {
            return {
              username: "",
              password: "",
            }
          },
methods: {
            login() {
                const data = {
                  username: this.username,
                  password: this.password
                }
                axios.post('http://localhost:4000/auth/login', data)
                .then((response) => {
                    localStorage.setItem("access_token", response.data.access_token)
                    this.$router
          .push({ name: 'dashboard' })
          .then(() => { this.$router.go() })
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>