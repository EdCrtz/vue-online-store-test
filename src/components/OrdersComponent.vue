<template>
       <div class="inner-block2 articlespage">
      <h1>Pedidos</h1>
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Mis Pedidos</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Explorar</button>
  </li>
</ul>
<div class="tab-content" id="pills-tabContent">
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
    <my-orders-component></my-orders-component>
  </div>
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
    <explore-products></explore-products>
  </div>
</div>
    </div>
</template>
<script>
import ExploreProducts from './ExploreProducts.vue';
  // Import stylesheet
  import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
import MyOrdersComponent from './MyOrdersComponent.vue';
export default {
  components: {
    ExploreProducts,
    MyOrdersComponent
},
  data() {
  }
}
</script>
