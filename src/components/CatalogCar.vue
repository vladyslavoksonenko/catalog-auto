<template>
  <Loader v-if="loading" />
  <div v-else class="catalog-cars">
    <div class="row">
      <div :key="car.id" v-for="car in paginatedData" class="col-4 car">
        <CardCar :dataCar="car" />
      </div>
    </div>
    <div class="row">
      <div class="dropdown col-6">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Сортировать
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <a @click="sortSale('down')" class="dropdown-item" href="#">По цене (по убыванию)</a>
          </li>
          <li><a @click="sortSale('up')" class="dropdown-item" href="#">По цене (по возростанию)</a></li>
        </ul>
      </div>
      <nav class="nav-pagination col-6" aria-label="Page navigation example">
        <ul class="pagination">
          <li :class="pageNumber === 0 ? 'disabled' : ''" class="page-item">
            <button :disabled="pageNumber === 0"
               class="page-link"
               @click="prevPage"
            >
              Previous
            </button>
          </li>
          <li
              v-for="item in pageAmount"
              :class="item === pageNumber ? 'active' : ''"
              class="page-item"
              :key="item"
              @click="pageNumber = item"
          >
            <a class="page-link" href="#">{{ item + 1 }}</a>
          </li>
          <li :class="pageNumber === pageAmount.length - 1 ? 'disabled' : ''" class="page-item">
            <button
                :disabled="pageNumber === pageAmount.length - 1"
               class="page-link"
               @click="nextPage"
            >
              Next
            </button>
          </li>
        </ul>
    </nav>
    </div>
  </div>
</template>

<script>
import CardCar from '../components/CardCar.vue';
import { getPosts } from "../database";
import { ref, onMounted, watch } from "vue";
import Loader from "./Loader";

export default {
  name: "CatalogCar",
  components: {
    Loader,
    CardCar
  },
  setup () {
    const loading = ref(true);
    const cars = ref();

    // Paginated

    const pageNumber = ref(0);
    const pageSize = ref(6);
    const paginatedData = ref([]);
    const pageCount = ref();
    const pageAmount = ref();

    onMounted(async () => {
      cars.value = await getPosts()
      loading.value = false;
      initPaginated();

    })

    const nextPage = () => {
      pageNumber.value++;
    }
    const prevPage = () => {
      pageNumber.value--;
    }
    const getPageAmount = () => {
      pageAmount.value = [];
      const result = cars.value.length / pageSize.value
      console.log(cars.value.length)
      for (let i = 0; i < result; i++) {
        pageAmount.value.push(i);
      }
    }
    const initPaginated = () => {
      let start = pageNumber.value * pageSize.value
      let end = start + pageSize.value
      paginatedData.value = cars.value.slice(start, end);
      getPageCount();
      getPageAmount();
    }
    const getPageCount = () => {
      let l = paginatedData.value.length;
      let s = pageSize.value;
      const result = l / Number(s);
      pageCount.value = result;
      return result;
    }
    watch(pageNumber, initPaginated);
    watch(pageSize, initPaginated);
    watch(pageSize, getPageAmount)

    // Sort

    const sortSale = (type) => {
      if (type === 'down') {
        cars.value.sort((a, b) => {
          const dateA = parseInt(a.price)
          const dateB = parseInt(b.price)
          if (dateA < dateB) {
            return 1
          }
          if (dateA > dateB) {
            return -1
          }
          return 0
        })
      } else if(type === 'up') {
        cars.value.sort((a, b) => {
          const dateA = parseInt(a.price)
          const dateB = parseInt(b.price)
          if (dateA < dateB) {
            return -1
          }
          if (dateA > dateB) {
            return 1
          }
          return 0
        })
      }

      initPaginated();

    }




    return { cars, loading, nextPage, prevPage, pageAmount, pageNumber, paginatedData, sortSale }
  }
}
</script>

<style scoped>
  .nav-pagination {
    margin-top: 2rem;
    text-align: center;
  }
  .page-link {
    cursor: pointer;
  }
  .car {
    margin-top: 2em;
  }
  .dropdown {
    margin-top: 2em;
  }
  .dropdown-item {
    cursor: pointer;
  }
</style>