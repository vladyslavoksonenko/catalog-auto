<template>
  <div class="container">
    <h2 class="title">Каталог автомобилей</h2>
    <div class="catalog">
      <CatalogCar />
    </div>
  </div>
</template>

<script>
import CatalogCar from "../components/CatalogCar";
export default {
  name: "Home",
  components: { CatalogCar }
}
</script>

<style scoped>
  .catalog {
    margin-top: 2rem;
  }
  .title {
    margin-top: 2rem;
  }
</style>