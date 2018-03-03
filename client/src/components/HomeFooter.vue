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
  text-align: center;
  width: 100%;
  background-color: white;
  position:fixed;
  bottom:0;
  padding-top: 12px;
  font-size: 18px;
}
a {
  margin: 12px;
  color: rgba( 13,71,161, 1);
}
</style>