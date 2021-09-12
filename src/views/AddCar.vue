<template>
  <div class="container">
  <div class="col-md-12">
    <h4 class="mb-3 title">Добавить автомобиль</h4>
    <form @submit.prevent="send" class="needs-validation" novalidate="">
      <div class="row g-3">
        <div class="col-12">
          <label class="form-label">Название автомобиля</label>
          <input type="text" class="form-control" v-model="state.nameCar" @blur="v$.nameCar.$touch">
          <div v-if="v$.nameCar.$error" class="invalid">
            Введите корректно имя автомобиля
          </div>
        </div>

        <div class="col-12">
          <label class="form-label">Описание</label>
          <textarea type="text" class="form-control" v-model="state.description" @blur="v$.description.$touch"/>
          <div v-if="v$.description.$error" class="invalid">
            Введите корректно описание
          </div>
        </div>

        <div class="col-6">
          <label class="form-label">Прикрепите фото</label>
          <input type="file" class="form-control" @change="onFileChange">
          <div v-if="v$.file.$error" class="invalid">
            Прикрипите фото
          </div>
        </div>

        <div class="col-6">
          <label class="form-label">Цена автомобиля</label>
          <input type="text" class="form-control" v-model.trim="state.price" @blur="v$.price.$touch"/>
          <div v-if="v$.price.$error" class="invalid">
            Введите корректно цену
          </div>
        </div>
        <div v-if="statusResult" class="alert alert-success" role="alert">
          Вы успешно добавили автомобиль.
                <router-link class="alert-link" :to='`/cars/${postID}`'>
                  Перейти к автомобилю
                </router-link>
        </div>
        <div v-else-if="!(statusResult) && statusResult !== null" class="alert alert-danger" role="alert">
          Загрузите корректно изображение (.jpg, .png, .jpeg)
        </div>

      <hr class="my-4">
      </div>
      <button class="w-100 btn btn-primary btn-lg" type="submit">Добавить</button>
    </form>
  </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, numeric } from '@vuelidate/validators'
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
    const statusResult = ref(null);
    const postID = ref('');

    const rules = computed(() => ({
      nameCar: { required, minLength: minLength(2) },
      description: { required, minLength: minLength(2) },
      file: { required },
      price: { required, numeric },
    }))

    const v$ = useVuelidate(rules, state, { $lazy: true })


    const onFileChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      state.file = files[0];

    }

    const send = async () => {
      v$.value.$touch()
      if (v$.value.$invalid) {
        return
      }
      const result = await addPost(state);

      if (result.status) {
        statusResult.value = result.status;
        postID.value = result['post_id'];
        state.nameCar = '',
            state.description = '',
            state.file = '',
            state.price = null
        v$.value.$reset()
      } else {
        statusResult.value = result.status;
        state.file = '';
        console.log(statusResult)

      }

    }


    return { state, v$, send, onFileChange, statusResult, postID }
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