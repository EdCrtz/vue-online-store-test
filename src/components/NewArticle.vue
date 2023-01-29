<template>
    <div>
      <form @submit.prevent="createArticle">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input type="text" class="form-control" id="name" v-model="newArticle.name" required>
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <textarea class="form-control" id="description" v-model="newArticle.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="price">Precio</label>
          <input type="number" class="form-control" id="price" v-model="newArticle.price" required>
        </div>
        <div class="form-group">
          <label for="image">Imagen</label>
          <input type="file" class="form-control-file" id="image" @change="convertImage" ref="fileInput" required>
        </div>
        <button type="submit" class="btn btn-primary">Crear</button>
      </form>
    </div>
  </template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      newArticle: {
        name: '',
        description: '',
        price: '',
        image: null
      }
    }
  },
  methods: {
    convertImage(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.newArticle.image = e.target.result;
        };
    },
    onFileSelected(event) {
      this.newArticle.image = event.target.files[0];
    },
    async createArticle() {
      try {
        const token = localStorage.getItem('access_token');
        await axios.post('http://34.66.40.38:3001/api/v1/articles',this.newArticle ,{headers: {'Authorization': 'Bearer '+ token}});
        this.newArticle= {
        name: '',
        description: '',
        price: '',
        image: null
      }
      this.$refs.fileInput=undefined;
        this.$emit('created-article');
      } catch (err) {
        console.error(err);
      }
    },
  },
}
</script>