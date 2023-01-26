<template>
    <div>
      <form>
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
          <input type="file" class="form-control-file" id="image" @change="onFileSelected" ref="fileInput" required>
        </div>
        <button type="submit" class="btn btn-primary" @click="createArticle">Crear</button>
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
    onFileSelected(event) {
      this.newArticle.image = event.target.files[0];
    },
    createArticle() {
      const formData = new FormData();
      formData.append('name', this.newArticle.name);
      formData.append('description', this.newArticle.description);
      formData.append('price', this.newArticle.price);
      formData.append('image', this.newArticle.image);
      axios.post('http://localhost:4000/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log(response);
        // Limpiar el formulario y mostrar un mensaje de éxito
      })
      .catch(error => {
        console.log(error);
        // Mostrar un mensaje de error
      });
    }
  }
}
</script>