<template>
  <router-view :key="$route.fullPath">
  <div class="container">
  <Loader v-if="loading" />
  <div v-else class="p-5 mb-4 bg-light rounded-3 page-car">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">{{car.name}}</h1>
      <img :src="car.image" :alt="car.name">
      <p>{{car.description}}</p>
      <h3 class="price">{{car.price}}$</h3>
    </div>
  </div>
    <div class="row">
      <div :key="car.id" v-for="car in carsRandom" class="col-4 car">
        <CardCar :dataCar="car" />
      </div>
    </div>
  </div>
  </router-view>
</template>

<script>
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { getPost, getPosts } from "../database";
import Loader from "../components/Loader";
import CardCar from "../components/CardCar";


export default {
  name: "PageCar",
  components: {Loader, CardCar},
  setup () {
    const loading = ref(true);
    const route = useRoute();
    const car = ref();
    const cars = ref();
    const carsRandom = ref([]);


    onMounted(async () => {
      const id = await route.params.id;
      car.value = await getPost(id);
      cars.value = await getPosts();
      await getRandomCars(3);
      loading.value = false;
    })



    const getRandomCars = (maxcar) => {
      for (let i = 0; i < maxcar; i++) {
        const randomNum = Math.floor(Math.random() * cars.value.length);
        carsRandom.value.push(cars.value[randomNum]);
      }
    }

    return { car, loading, carsRandom }
  }
}
</script>

<style scoped>
.page-car {
  margin-top: 2em;
  text-align: center;
}
.price {
  color: red;
}
</style>