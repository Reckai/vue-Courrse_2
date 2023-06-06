<template lang="">

<div v-if="posts.length > 0">
  <h3 class="h3S">Список постов</h3>
 <transition-group name="post__list">
  <PostItem
  
  v-for="post in posts"
  :key="post.id"
  :post= "post"
  @remove="$emit('remove', post)"
  />

 </transition-group>
</div>
<h2 v-else class="h3S">
  Список постов пуст
</h2>
</template>

<script>

import PostItem from '@/components/PostItem.vue';
export default {
 components: {
   PostItem
  }, 
  props: {
    posts: {
        type: Array,
        required: true
    }
}
}
</script>
<style scoped>
    
  .h3S {
    text-align: center;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
  
  } 
  .post__list-enter-active,
.post__list-leave-active {
  transition: all 0.4s ease;
}
.post__list-enter-from,
.post__list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}
.post__list-move{
  transition: all 0.5s ease;
}
</style>