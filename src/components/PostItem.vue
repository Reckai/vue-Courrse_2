<template lang="">

<div
    class="post"
    @reset.prevent>
  <div>

    <div>
      <strong>Название: </strong>{{ post.title }}
    </div>

    <div>
      <strong>Описание: </strong>{{ post.body }}  
    </div> 

  </div> 
  <div   class="post__btns">
    <Button style="margin-right: 5px" @click="$router.push(`/posts/${post.id}`)">
      Подробнее
    </Button>
    <Button @click="$emit('remove', post)">
      Удалить
    </Button>
 </div> 
</div>


</template>


<script>

export default {

  props: {
    post: {
      type: Object,
      required: true
    }
  }
}

</script>



<style scoped>
.post {
  padding: 10px;
  border: 2px solid rgba(30, 153, 172, 0.349);
  border-radius: 8px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
  justify-content: space-around;
  width: 300px;
}
</style>