<template lang="">
  <div class="navbar">
    <h3>
      Vue3
    </h3>
   <div
    class="navbar__btns"
   >
    <Button @click="$router.push('/')">
      Главная
    </Button>
    <Button @click="$router.push('/posts')">
      Посты
    </Button>
    <Button @click="$router.push('/about')">
      Про курс
    </Button>
    <Button @click="$router.push('/posts-with-store')">
     стором
    </Button>
    <Button @click="$router.push('/composition-api')">
     composition
    </Button>
   </div>
  </div>
</template>
<script>
export default {
  name: 'navbar'
}
</script>
<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFA24C;
  padding: 10px;
}

.link {
  text-decoration: none;
  color: #ffffffdf;
}

.navbar__btns {

  display: flex;
  margin-right: 5px;

}
</style>