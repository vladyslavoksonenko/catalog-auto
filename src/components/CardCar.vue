<template>
  <div class="card" style="width: 18rem;">
    <img :src="dataCar.image" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">{{ dataCar.name }}</h5>
      <p class="card-text">{{dataCar.price}}$</p>
      <router-link key="$route.fullPath" :to="`/cars/${dataCar.id}`" class="btn btn-primary">Подробнее</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardCar",
  props: {
    dataCar: Object
  },
  setup (props) {


    return { props }

  }
}
</script>

<style scoped>
.card-text {
  color: darkred;
}
</style>