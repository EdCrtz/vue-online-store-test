<template>
    <div class="product-card" v-if="order.article">
      <img :src="order.image" class="order-image">
      <h2 class="order-name">{{ order.article.name }}</h2>
      <p class="product-description">Descripcion: {{ order.article.description }}</p>
      <p class="product-price">${{ order.article.price }}</p>
      <img :src="order.article.image" class="product-image">
      <p class="product-name">Comprado al usuario:</p>
      <p class="usuario">{{ order.article.user.name }}</p>
      <p class="product-name">Correo de contacto:</p>
      <p class="correo">
        {{ order.article.user.email }}
      </p>
      <p class="product-name"> {{ order.address }} {{ order.city }} {{ order.state }} {{ order.postalCode }}</p>
      <div class="order-actions">
        <button @click="editOrder"  class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#EditOrder">
            <i class="fa fa-edit"></i>
          </button>
          <button @click="deleteOrder" class="btn btn-danger">
            <i class="fa fa-trash"></i>
          </button>
    </div>
    </div>
    

  </template>
  <script>
  export default {
    components:{
    },
    props: {
      order: {
        type: Object,
        required: true
      }
    }
    ,methods: {
    editOrder() {
      this.$emit('edit-order', this.order);
    },
    deleteOrder() {
      this.$emit('delete-order', this.order);

    },
  },
  computed(){
  }
  }
  </script>