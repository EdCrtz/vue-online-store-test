



<template>

<div class="inner-block2 articlespage">
      <div class="product-list">
      <card-article-buy v-for="article in articles"  :key="article.id" :product="article"
      @buy-product="selectBuy"></card-article-buy>
    </div>
    <div class="modal" id="buy" ref="buy">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Confirmar Pedido de Articulo</h4>
            <button id="close" ref="CloseBuy" class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
          </div>
          <div class="modal-body">
            <div>
    <form name="myForm" @submit.prevent="comprar">
    <div>
      ¿Desea confirmar la orden del producto "{{ selectedArticle.name }}"?
    </div>
    <div class="form-group">
        <label for="description">Direccion</label>
        <input class="form-control" id="adress" v-model="order.address" required>
      </div>
      <div class="form-group">
        <label for="price">Ciudad</label>
        <input type="text" class="form-control" id="city" v-model="order.city" required>
      </div>
      <div class="form-group">
        <label for="state">Estado</label>
        <input type="text" class="form-control" id="state" v-model="order.state" required>
      </div>
      <div class="form-group">
        <label for="price">Codigo postal</label>
        <input type="number" class="form-control" id="city" v-model="order.postalCode" required>
      </div>
      <br>
    <GMapMap
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      style="width: 100%; height: 300px"
  >
  </GMapMap>
  <br>
    <div>
      <button class="btn btn-success" @click="buyProduct">Confirmar</button>
    </div>
    </form>
  </div>
          </div>
        </div>
      </div>
    </div>
</div>
        
</template>

 
  <script>
  import axios from 'axios';
  import CardArticleBuy from './CardArticleBuy.vue';
  //import { useLoading } from 'vue3-loading-overlay';
    // Import stylesheet
    import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  export default {
    components: {
        CardArticleBuy,
  },
    data() {
      return {
        articles: [],
        showModal:false,
        newModal : null,
      selectedArticle: {
        id:'',
        name: '',
        description: '',
        price: '',
        image: null,

      }, center: {lat: 51.093048, lng: 6.842120}
      ,order:{ 
        articleId: '',
        lat: 0,
        lon: 0,
        address: '',
        city: '',
        state: '',
        postalCode: '',}
      };
    },
    mounted() {
      this.getArticles();
      navigator.geolocation.getCurrentPosition((position) => {
          this.center = {lng:position.coords.longitude, lat:position.coords.latitude};
        });
    },
    methods: {
      selectBuy(product){
        this.selectedArticle=product;
      },
      async buyProduct(){
        try {
          const token = localStorage.getItem('access_token');
          this.order.articleId =this.selectedArticle.id;
          this.order.lat =this.center.lat;
          this.order.lon =this.center.lng;
          await axios.post('http://34.133.118.86:3002/api/v1/orders',this.order ,{headers: {'Authorization': 'Bearer '+ token}});
          this.$refs.CloseBuy.click();
          await this.$toast.success('Producto agregado correctamente al carrito')
          setTimeout(function(context) {
            context.$router.go()
        }, 450, this);
        } catch (error) {
          this.$toast.error('Ocurrio un error!');
        }
      },
      getArticles() {
        //let loader = useLoading();
          //loader.show();
          const token = localStorage.getItem('access_token');
          axios.get('http://34.66.40.38:3001/api/v1/articles/find/all', {headers: {'Authorization': 'Bearer '+ token}})
          .then(response => {
              this.articles = response.data;
              //loader.hide()
          })
          .catch(() => {
           // console.log(error)
            this.$toast.error("Ocurrio un error al cargar los articulos")
              //loader.hide()
          });
      },
      newArticle() {
      this.showModal = true;
    }
  }
};
</script>