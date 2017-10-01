<template>
<div class="home-footer">
      
 
      <a href="/r/security">Security</a>
      <a href="/r/privacy-policy">Privacy policy</a>
      <a href="#">Contact</a>
      <a @click="formContact()" href="#">Submit ad</a>
      </p>
      </center>
</div>
</template>

<script>
export default {
  name: 'footer'
}
</script>
<style>
.home-footer {
  font-family: Roboto, sans-serif;
  vertical-align: middle;
  height: 24px;
  padding: 12px;
  text-align: center;
  width: 100%;
  background-color: white;
  position:fixed;
  bottom:0;
  font-size: 20px;
}
a {
  margin: 12px;
  color: rgba( 13,71,161, 1);
}
</style>