<template lang="">
  <div>
    <div>
      <h1>Страница с постами</h1>
      <my-input  class="search__input" type="text" placeholder="название" v-model="searchQuery" />

    </div>

    <div class="app_btns">
      <Button class="dialog__btn" @click="showDialog"> Создать пост </Button>
      <my-select :value="selectedSort" :options="sortOptions" v-model="selectedSort"></my-select>
    </div>

    <div>
      <my-dialog v-model:show="dialogVisible">
        <PostForm @create="createPost" />
      </my-dialog>
    </div>
   
  <div>
    <post-list v-show="!isPostLoading" :posts="sortedAndSearchedPosts" @remove="removePost" />

    <div>
      <p>Загрузка...</p>
    </div>
  </div> 

  <div v-intersection="loadMorePages" class="observer">

  </div>


 </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { usePosts } from "@/hooks/usePosts";
import useSortedPosts from "@/hooks/useSortedPosts.js";
import useSortedAndSearchedPosts from "@/hooks/useSortedAndSearchedPosts.js";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
      ],
      PostsGotten: false,
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } = UseSortedAndSearchedPosts(sortedPosts)
    return {
      posts,
      totalPages,
      isPostsLoading,
      searchQuery,
      sortedAndSearchedPosts,
      selectedSort,
      sortedPosts,
      PostsGotten,
    }
  }
}

</script>

<style scoped>
.app_btns {
  margin: 20px 0 10px;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0 10px;

}

.search__input {
  margin: 20px 0 10px;
  height: 40px;
  width: 100%;
}

.page {
  margin: 0 5px;
  padding: 5px 10px;
  min-height: 25px;
  border: 1px solid #ccc;

  cursor: pointer;
}

.active {
  background-color: rgba(0, 128, 128, 0.8);

  color: white;
}

.observer {
  height: 30px;
  background-color: gray;
}
</style>
