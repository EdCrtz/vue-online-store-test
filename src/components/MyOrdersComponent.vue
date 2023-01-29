<!-- eslint-disable no-unused-vars -->
<template>
  
  <div class="inner-block2 articlespage">
    <div class="product-list">
      <card-orders v-for="order in orders"  :key="order.id" :order="order"
      @delete-order="deleteOrder" @edit-order="editOrder">
      
    </card-orders >
  </div>
</div>
<div class="modal" id="EditOrder" ref="EditOrder">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Confirmar Pedido de Articulo</h4>
        <button id="close" ref="CloseEdit" class="close" type="button" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div>
          <form name="myForm" @submit.prevent="edit">
            <div>
              ¿Editar la orden del producto "{{ selectedOrder.article.name }}"?
            </div>
            <div class="form-group">
              <label for="description">Direccion</label>
              <input class="form-control" id="adress" v-model="selectedOrder.address" required>
            </div>
            <div class="form-group">
              <label for="price">Ciudad</label>
              <input type="text" class="form-control" id="city" v-model="selectedOrder.city" required>
            </div>
            <div class="form-group">
              <label for="state">Estado</label>
              <input type="text" class="form-control" id="state" v-model="selectedOrder.state" required>
            </div>
            <div class="form-group">
              <label for="price">Codigo postal</label>
              <input type="number" class="form-control" id="city" v-model="selectedOrder.postalCode" required>
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
            <button class="btn btn-success" @click="updateOrder">Actualizar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</div>        
</template>
<script>
import axios from 'axios';
import CardOrders from './CardOrders.vue';
//import { useLoading } from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
export default {
  components: {
    CardOrders,
  },
  data() {
    return {
      orders: [],
      showModal:false,
      newModal : null,
      selectedOrder: {
        "id": "",
        "createdAt": "",
        "updatedAt": "",
        "userId": "",
        "articleId": "",
        "lat": 0,
        "lon": 0,
        "address": "",
        "city": "",
        "state": "",
        "postalCode": 0,
        "article": {
          "id": "",
          "name": "",
          "description": "",
          "price": 0,
          "image": "",
          "createdAt": "",
          "updatedAt": "",
          "userId": "",
          "user": {
            "id": "",
            "name": "",
            "email": "",
            "password": "",
            "createdAt": "",
            "updatedAt": ""
          }
        }
      }, center: {lat: 51.093048, lng: 6.842120}
    };
  },
  mounted() {
    this.getOrders();
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {lng:position.coords.longitude, lat:position.coords.latitude};
    });
  },
  methods: {
    deleteOrder(order){
      const token = localStorage.getItem('access_token');
      this.$dialog({
        message: 'Esta seguro que quiere eliminar esta orden?',
        buttons: ['no', 'si'],
        callbacks: {
          si: () => {
            axios.delete('http://34.133.118.86:3002/api/v1/orders/'+order.id, {headers: {'Authorization': 'Bearer '+ token}})
            // eslint-disable-next-line no-unused-vars
            .then(_response => {
              this.$toast.success('Orden eliminada exitosamente');
              this.getOrders();
            })
            .catch(() => {
              this.$toast.error("Ocurrio un error al eliminar la orden")
            });
            //some function
          }
        }
        
      })
    },
    updateOrder(){
      //et loader = useLoading();
      //loader.show();
      const token = localStorage.getItem('access_token');
      const orderNotId = {"userId":this.selectedOrder.userId,
      "articleId": this.selectedOrder.articleId,
      "lat": this.selectedOrder.lat,
      "lon": this.selectedOrder.lot,
      "address":  this.selectedOrder.address,
      "city": this.selectedOrder.city,
      "state":  this.selectedOrder.state,
      "postalCode":this.selectedOrder.postalCode}
      axios.put('http://34.133.118.86:3002/api/v1/orders/'+this.selectedOrder.id,orderNotId,{headers: {'Authorization': 'Bearer '+ token}})
      .then(() => {
        this.$refs.CloseEdit.click();
        this.getOrders()
        //loader.hide()
      })
      .catch(() => {
        this.$toast.error("Ocurrio un error al actualizar la orden")
        //loader.hide()
      });
    },
    editOrder(order){
      this.selectedOrder = JSON.parse(JSON.stringify(order));
      
    },
    getOrders() {
      //let loader = useLoading();
      //loader.show();
      const token = localStorage.getItem('access_token');
      axios.get('http://34.133.118.86:3002/api/v1/orders', {headers: {'Authorization': 'Bearer '+ token}})
      .then(response => {
        this.orders = response.data;
        //loader.hide()
      })
      .catch(() => {
        this.$toast.error("Ocurrio un error al cargar las ordenes")
        //loader.hide()
      });
    },
  }
};
</script>