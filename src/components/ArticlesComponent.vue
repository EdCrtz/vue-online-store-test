<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<!-- eslint-disable no-unused-vars -->
<template>
    <div class="inner-block2 articlespage">
      <h1>Artículos</h1>
      <button @click="newArticle" class="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#newModal">Nuevo Artículo</button>
      <br>
      <br>
      <div class="modal" id="newModal" ref="newModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Nuevo Artículo</h4>
            <button id="close" ref="Close" class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
            <new-article @created-article="closeModal"></new-article>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="editModal" ref="editModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Editar Artículo</h4>
            <button id="close" ref="CloseEdit" class="close" type="button" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
            <div>
    <form name="myForm" @submit.prevent="updateArticle">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input type="text" class="form-control" id="name" v-model="editArticle.name" required>
      </div>
      <div class="form-group">
        <label for="description">Descripción</label>
        <textarea class="form-control" id="description" v-model="editArticle.description" required></textarea>
      </div>
      <div class="form-group">
        <label for="price">Precio</label>
        <input type="number" class="form-control" id="price" v-model="editArticle.price" required>
      </div>
      <div class="form-group">
        <label for="image">Imagen</label>
        <input type="file" class="form-control-file" id="image" @change="convertImage" ref="fileInput" >
      </div>
      <button type="submit" class="btn btn-primary">Actualizar</button>
    </form>
  </div>
          </div>
        </div>
      </div>
    </div>
      <div class="product-list">
      <card-article v-for="article in articles"  :key="article.id" :product="article"
      @close-modal="getArticles"
      @editProduct="fetchArticle"
      @delete-product="deleteProduct"></card-article>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CardArticle from './CardArticle.vue';
  import NewArticle from './NewArticle.vue';
  // no funciona
 // import { useLoading } from 'vue3-loading-overlay';
    // Import stylesheet
    import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  export default {
    components: {
    NewArticle,
    CardArticle,
  },
    data() {
      return {
        articles: [],
        showModal:false,
        newModal : null,
      editArticle: {
        name: '',
        description: '',
        price: '',
        image: null
      }
      };
    },
    mounted() {
      this.getArticles();
      
    },
    methods: {
      getArticles() {
        //let loader = useLoading();
        
          //loader.show();
          const token = localStorage.getItem('access_token');
          axios.get('http://34.66.40.38:3001/api/v1/articles', {headers: {'Authorization': 'Bearer '+ token}})
          .then(response => {
              this.articles = response.data;
              //loader.hide()
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_error => {
              //loader.hide()
          });
      },
      newArticle() {
      this.showModal = true;
    },
    closeModal() {
      this.$refs.Close.click();
      this.getArticles()
  
    },
    convertImage(e) {
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.editArticle.image = e.target.result;
        };
    },
    async fetchArticle(article) {
      try {
        this.editArticle = article
      // eslint-disable-next-line no-empty
      } catch (err) {
      }
    },
    async updateArticle() {
      try {
        const token = localStorage.getItem('access_token');
        let idUpdated = this.editArticle.id;
        this.editArticle =  {
        name: this.editArticle.name,
        description: this.editArticle.description,
        price: this.editArticle.price,
        image: this.editArticle.image
      }
        await axios.put(`http://34.66.40.38:3001/api/v1/articles/${idUpdated}`, this.editArticle,{headers: {'Authorization': 'Bearer '+ token}});
        this.$refs.CloseEdit.click();
        this.getArticles()
      } catch (err) {
        this.$toast.error("Ocurrio un error al actualizar el articulo")
      }
    },
    editProduct() {
      //console.log(id)
        //his.fetchArticle(id);
      },
      deleteProduct(id) {
        this.$dialog({
        message: 'Esta seguro que quiere eliminar este articulo?',
        buttons: ['no', 'si'],
        callbacks: {
          si: () => {
            const token = localStorage.getItem('access_token');
            axios.delete('http://34.66.40.38:3001/api/v1/articles/'+id, {headers: {'Authorization': 'Bearer '+ token}})
            // eslint-disable-next-line no-unused-vars
            .then(_response => {
              this.$toast.success('Articulo eliminada exitosamente');
              this.getArticles();
            })
            .catch(() => {
              this.$toast.error("Ocurrio un error al eliminar el articulo")
            });
            //some function
          }
        }
        
      })
    }
  }
};
</script>