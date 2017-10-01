<template>
  <div class="hello"> 
    <toolbar></toolbar>
      <main>
        <div class="mdc-toolbar-fixed-adjust">
          <vue-location></vue-location>
          <vue-ads-grid></vue-ads-grid>
          <temporary-drawer></temporary-drawer>   
          <home-footer></home-footer>
        </div>
      </main>
  </div>
</template>

<script>
import Toolbar from '@/components/Toolbar'
import TemporaryDrawer from '@/components/TemporaryDrawer'
import HomeFooter from '@/components/HomeFooter'
import AdsGrid from '@/components/AdsGrid'
import VueLocation from '@/components/Location'

export default {
  name: 'hello',
  components: {
    'toolbar': Toolbar,
    'vue-location': VueLocation,
    'temporary-drawer': TemporaryDrawer,
    'home-footer': HomeFooter,
    'vue-ads-grid': AdsGrid
  }
}
</script>

<style>

main {
  padding: 0px;
  margin: 0px;
  height: 100%;

}

body {
    background-color: rgba( 13,71,161, .65);
    min-height: 100%;
    margin: 0px;
    font-family: 'Roboto', sans-serif;
}


:root {
  --mdc-theme-primary: rgb(16, 58, 106);
  --mdc-theme-accent:  rgb(255, 235, 59);
  --mdc-theme-background: rgb(25,118,210);
  --mdc-theme-background-lighter: rgba( 13,71,161, .75);
  --mdc-theme-background-lighter2: rgba( 13,71,161, .65);
  --mdc-text-primary-on-light: red;

}
 .footer {
   border-top: 1px solid rgba(0, 0, 0, 0.54);
   font-size: 20px;
   margin-top: 24px;
   padding-top: 12px;
 }
 .footer a {   
   color: rgba(0, 0, 0, 0.54);
   font-weight: bold;
   text-decoration: none;
   padding: 8px;
 }
 .footer a:hover {   
   color: #FFD600;
 }

</style>
<style lang="scss">

$mdc-theme-primary: rgb(16, 58, 106);
$mdc-theme-accent:  rgb(255, 235, 59);
$mdc-theme-background: rgb(25,118,210);
$mdc-theme-background-lighter: rgba( 13,71,161, .75);
$mdc-theme-background-lighter2: rgba( 13,71,161, .65);

@import '@material/typography/mdc-typography';
@import '@material/dialog/mdc-dialog';
@import '@material/textfield/mdc-textfield';


</style>
