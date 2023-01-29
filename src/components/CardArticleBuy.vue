<template>
    <div class="product-card" v-if="product.user">
      <img :src="product.image" class="product-image">
      <h2 class="product-name">{{ product.name }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">${{ product.price }}</p>
      <p class="product-name">Vendido por el usuario:</p>
      <p class="usuario">{{ product.user.name }}</p>
      <p class="product-name">Correo de contacto:</p>
      <p class="correo">
        {{ product.user.email }}
      </p>
      <div class="product-actions">
        <button @click="buy"  class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#buy">
            <i class="fa fa-shopping-cart"></i>
          </button>
    </div>
    </div>
    

  </template>
  <script>
  export default {
    components:{
    },
    props: {
      product: {
        type: Object,
        required: true
      }
    }
    ,methods: {
    buy(){
      this.$emit('buy-product', this.product);
    }
  },
  computed(){
  }
  }
  </script>