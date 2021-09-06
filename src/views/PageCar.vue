<template>
  <div class="container">
  <Loader v-if="loading" />
  <div v-else class="p-5 mb-4 bg-light rounded-3 page-car">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">{{car.name}}</h1>
      <img :src="car.image" :alt="car.name">
      <p class="col-md-8 fs-4">{{car.description}}</p>
      <h3 class="price">{{car.price}}</h3>
    </div>
  </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getPost } from "../database";
import Loader from "../components/Loader";

export default {
  name: "PageCar",
  components: {Loader},
  setup () {
    const loading = ref(true);
    const route = useRoute();
    const car = ref();

    onMounted(async () => {
      const id = await route.params.id;
      car.value = await getPost(id);
      loading.value = false;
    })

    return { car, loading }
  }
}
</script>

<style scoped>
.page-car {
  margin-top: 2em;
}
.price {
  color: red;
}
</style>