<template lang="">
  <div>
    <div>
      <h1>Страница с постами и стором
      </h1>
      <my-input  class="search__input" type="text" placeholder="название" 
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
       />

    </div>

    <div class="app_btns">
      <Button class="dialog__btn" @click="showDialog"> Создать пост </Button>
      <my-select :value="selectedSort" :options="sortOptions" @update:modelValue="setSelectedSort"></my-select>
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

  <div v-intersection="this.loadMorePages" class="observer">

  </div>


  <!-- <div class="page__wrapper">
    <div
    @click.stop = "ChangePage(pageNumber)"
    class ="page"
    :class="{active: pageNumber === page}"
    v-for= "pageNumber in totalPages"
    :key="pageNumber"
    >
   {{pageNumber}}
    </div>
  </div> -->
``  </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { mapActions, mapGetters, mapState, mapMutations } from 'vuex';


export default {

  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  computed: {
    ...mapState({
      posts: state => state.post.posts,
      isPostLoading: state => state.post.isPostLoading,
      selectedSort: state => state.post.selectedSort,
      sortOptions: state => state.post.sortOptions,
      PostsGotten: state => state.post.PostGotten,
      searchQuery: state => state.post.searchQuery,

      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
    })
  },


  watch: {
    // page(value){
    //   this.fetchPosts()
    // }
  },


  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort',
    }),

    ...mapActions({
      loadMorePages: 'post/loadMorePages',
      fetchPosts: 'post/fetchPosts'
    }),
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // ChangePage(page){
    //   this.page = page

    // },





  },
  mounted() {
    this.fetchPosts();

  },
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
