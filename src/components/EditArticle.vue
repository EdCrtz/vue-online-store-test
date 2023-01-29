<template>
  <div>
    <form name="myForm" @submit.prevent="updateArticle">
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
        <input type="file" class="form-control-file" id="image" @change="convertImage" ref="fileInput" >
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
</template>



<script>

export default {
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  mounted() {
      this.fetchArticle();
      
    },
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
    
},
}
</script>