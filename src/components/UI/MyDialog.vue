<template lang="">
    <div class="dialog" v-if="show" @click="hideDialog">
        <div  @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import toogleMixin from '@/mixins/toogleMixin';

export default {
  name: 'my-dialog',
  mixins: [toogleMixin],

}
</script>
<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  margin: auto;
  background-color: #fff;
  border-radius: 12px;
  min-width: 300px;
  min-height: 50px;
  padding-top: 20px;
}
</style>