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
import axios from 'axios';
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      posts: [],
      isPostLoading: false,
      selectedSort: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
      ],
      PostsGotten: false,
      searchQuery: '',

      page: 1,
      limit: 10,
      totalPages: 0,
    };
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]);
      });
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(
        post => post.title.toLowerCase()
          .includes(this.searchQuery.toLowerCase()))
    }
  },


  watch: {
    // page(value){
    //   this.fetchPosts()
    // }
  },


  methods: {
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




    async fetchPosts() {
      try {
        this.isPostLoading = true;
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit,
          }
        });
        this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
        this.posts = response.data;
      } catch (e) {
        alert('Ошибка');
      } finally {
        this.isPostLoading = false;
        this.PostsGotten = true;
      }
    },
    async loadMorePages() {
      if (this.PostsGotten) {
        try {
          this.page++
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
            params: {
              _page: this.page,
              _limit: this.limit,
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts.push(...response.data)
        } catch (e) {
          alert('Ошибка');
        } finally {

        }
      }

    }
  },
  mounted() {
    this.fetchPosts();
    //   this.$refs.observer
    //   let options = {

    //     rootMargin: "0px",
    //     threshold: 1.0,
    //   };
    //   const callback = (entries, observer) => {

    //     if (entries[0].isIntersecting && this.page < this.totalPages) {
    //       console.log('попал в зону видимости')
    //       this.page++
    //       this.loadMorePages()
    //     }
    //   }


    //   let observer = new IntersectionObserver(callback, options);
    //   observer.observe(this.$refs.observer);
    // },
  }
};
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
