<template>
  <div id="wrapper">
    <keep-alive>
      <router-view/>
    </keep-alive>
   <Footer/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
div{
    text-align: left;
}
</style>
