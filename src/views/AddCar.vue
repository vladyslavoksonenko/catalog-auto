<template>
  <div class="container">
  <div class="col-md-12">
    <h4 class="mb-3 title">Добавить автомобиль</h4>
    <form @submit.prevent="send" class="needs-validation" novalidate="">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label">Название автомобиля</label>
          <input type="text" class="form-control" v-model="state.nameCar">
          <div v-if="v$.nameCar.$error" class="invalid">
            Введите коректно имя автомобиля
          </div>
        </div>

        <div class="col-12">
          <label class="form-label">Описание</label>
          <textarea type="text" class="form-control" v-model="state.description" />
          <div v-if="v$.description.$error" class="invalid">
            Введите коректно описание
          </div>
        </div>

        <div class="col-6">
          <label class="form-label">Прикрепите фото</label>
          <input type="file" class="form-control" @change="onFileChange">
<!--          <div class="invalid">-->
<!--            Прикрипите фото-->
<!--          </div>-->
        </div>

        <div class="col-6">
          <label class="form-label">Цена автомобиля</label>
          <input type="text" class="form-control" v-model="state.price"/>
          <div v-if="v$.price.$error" class="invalid">
            Введите коректно цену
          </div>
        </div>

      <hr class="my-4">
      </div>
      <button class="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
    </form>
  </div>
  </div>
</template>

<script>
import {reactive} from "vue";
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { addPost } from "../database";

export default {
  name: "AddCar",
  setup () {
    const state = reactive({
      nameCar: '',
      description: '',
      file: '',
      price: null,
    })

    const rules = {
      nameCar: { required },
      description: { required },
      price: { required }
    }

    const v$ = useVuelidate(rules, state)

    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      state.file = files[0];
      // const photo = files[0];
      // const reader = new FileReader();
      // reader.readAsDataURL(photo);
      // reader.onload = function() {
      //   state.file = reader.result;
      // }

      // console.log(state.file)

    }

    const send = () => {
      addPost(state);
      state.nameCar = '',
      state.description = '',
      state.file = '',
      state.price = null
    }

    return { state, v$, send, onFileChange }
  }
}
</script>

<style scoped>
.title {
  margin-top: 2em;
}
.invalid {
  color: red;
}

</style>