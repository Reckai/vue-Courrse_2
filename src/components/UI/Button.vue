<template lang="">
    <button class ="btn">
        <slot></slot>
    </button>
</template>
<script>
export default {
    name: 'Button',
}
</script>
<style scoped>
    .btn{ 
        cursor: pointer;
        padding: 10px 15px;
        background: none;
        color: teal;
        border: 1px solid teal;
    }
</style>