<template>
    <div class="inner-block2">
      <h1>Artículos</h1>
      <button @click="newArticle" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#newModal">Nuevo Artículo</button>
      <br>
      <br>
      <div class="modal" id="newModal" ref="newModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Nuevo Artículo</h4>
            <button id="close" class="close" type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
            <new-article></new-article>
          </div>
        </div>
      </div>
    </div>
      <!-- <table class="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id">
            <td>{{ article.name }}</td>
            <td>{{ article.description }}</td>
            <td>{{ article.price }}</td>
            <td>
              <img :src="article.image" width="100px" height="100px" />
            </td>
            <td>
              <button @click="editArticle(article.id)" class="btn btn-secondary">Editar</button>
              <button @click="deleteArticle(article.id)" class="btn btn-danger">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table> -->
      <div class="product-list">
      <card-article v-for="article in articles" :key="article.id" :product="article"     @edit-product="editProduct"
      @delete-product="deleteProduct"></card-article>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CardArticle from './CardArticle.vue';
  import NewArticle from './NewArticle.vue';
  export default {
    components: {
    NewArticle,
    CardArticle
  },
    data() {
      return {
        articles: [],
        showModal:false
      };
    },
    mounted() {
      this.getArticles();
      
    },
    methods: {
      getArticles() {
          const token = localStorage.getItem('access_token');
          axios.get('http://localhost:3001/api/v1/articles', {headers: {'Authorization': 'Bearer '+ token}})
          .then(response => {
              this.articles = response.data;
          })
          .catch(error => {
              console.log(error);
          });
      },
      newArticle() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editProduct(id) {
          this.$router.push({ name: 'EditArticle', params: { id: id } });
      },
      deleteProduct(id) {
        console.log('Entro')
        const token = localStorage.getItem('access_token');
        axios.delete(`http://localhost:3001/api/v1/articles/${id}`, {headers: {'Authorization': 'Bearer '+ token}})
        // eslint-disable-next-line no-unused-vars
        .then(_response => {
            this.getArticles();
        })
        .catch(error => {
            console.log(error);
        });
    }
  }
};
</script>