<template lang="">
  
        <div >
        <form
        class='form'
         @submit.prevent
         
        >
        
        <my-input 
         v-focus
         v-model="post.title"
         type="text"
         placeholder= 'название'
        />
        
         <my-input 
         v-model="post.body"
         type="text"
         placeholder = "описание "
         />

         <Button
         @click="createPost"
         type="submit"
         > 
         Создать
        </Button>
    
      </form>
   </div>
   
</template>


<script>

export default {

  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },


  methods: {
    createPost(post) {
      if (this.post.body === '' || this.post.title === '') {
        alert('Заполните поля')
        return
      }
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: '',
      }
    }
  }
}

</script>


<style scoped >  .form {
    display: flex;
    flex-direction: column;

    margin: 0 auto 10px;
    padding: 10px;
    align-items: center;
  }
</style>