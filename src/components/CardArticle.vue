<template>
    <div class="product-card">
      <img :src="product.image" class="product-image">
      <h2 class="product-name">{{ product.name }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">{{ product.price }}</p>
      <div class="product-actions">
        <button @click="editProduct"  class="btn btn-secondary">
            <i class="fa fa-edit"></i>
          </button>
          <button @click="deleteProduct" class="btn btn-danger">
            <i class="fa fa-trash"></i>
          </button>
    </div>
    </div>
 
  </template>
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    }
    ,methods: {
    editProduct() {
      this.$emit('edit-product', this.product.id);
      console.log('Entro')
    },
    deleteProduct() {
      this.$emit('delete-product', this.product.id);
      console.log('Entraao')
    }
  }
  }
  </script>