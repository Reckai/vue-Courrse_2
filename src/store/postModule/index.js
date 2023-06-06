import axios from 'axios';
export const postModule = {
  state: () => ({
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
  }),
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostLoading = bool;
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort;
    },
    setPostsGotten(state, bool) {
      state.PostsGotten = bool;
    },
    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
    setPage(state, page) {
      state.page = page;
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages;
    },
  },

  getters: {
    sortedPosts(state) {
      return [...state.posts].sort((post1, post2) =>
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]),
      );
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase()),
      );
    },
  },
  actions: {
    async fetchPosts(context) {
      try {
        context.commit('setLoading', true);
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: context.state.page,
            _limit: context.state.limit,
          },
        });
        context.commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / context.state.limit),
        );
        context.commit('setPosts', response.data);
      } catch (e) {
        alert('Ошибка');
      } finally {
        context.commit('setLoading', false);
        context.commit('setPostsGotten', true);
      }
    },
    async loadMorePages(context) {
      if (context.state.PostsGotten) {
        try {
          context.commit('setPage', context.state.page + 1);
          const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
            params: {
              _page: context.state.page,
              _limit: context.state.limit,
            },
          });
          context.commit(
            'setTotalPages',
            Math.ceil(response.headers['x-total-count'] / context.state.limit),
          );
          context.commit('setPosts', [...context.state.posts, ...response.data]);
        } catch (e) {
          alert('Ошибка');
          console.log(e);
        } finally {
        }
      }
    },
  },
  namespaced: true,
};
