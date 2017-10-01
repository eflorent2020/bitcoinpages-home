<template>
      <aside class="mdc-dialog mdc-dialog--open">
          <div class="mdc-dialog__surface">
            <header class="mdc-dialog__header">
              <h2 id="mdc-dialog-default-label" class="mdc-dialog__header__title">
                Register or login
              </h2>
            </header>
            <section id="mdc-dialog-default-description" class="mdc-dialog__body">
               Please select one option
              <div class="mdc-grid-list">
                <ul class="mdc-grid-list__tiles">
                  <li class="mdc-grid-tile" style="padding-bottom: 0px;">
                    <div class="mdc-grid-tile__primary">
                      <a class="mdc-button mdc-button--raised" href="#/register">register</a>
                    </div>
                  </li>
                  <li class="mdc-grid-tile" style="padding-bottom: 0px;">
                    <div class="mdc-grid-tile__primary">
                      <a class="mdc-button mdc-button--raised" href="#/login">login</a>
                    </div>
                  </li>
                  </ul>
                </div>
            </section>
            <footer class="mdc-dialog__footer">
              <a href="javascript: window.history.back()" class="mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel">Cancel</a>
            </footer>
          </div>
        </aside>
</template>

<script>

export default {
  name: 'registerOrLogin'
}
</script>
<style scoped>

.mdc-grid-list {
  width: 100%;
}
.mdc-grid-tile {
  text-align: center;
}
.mdc-grid-list .mdc-grid-tile {
  width: 48%;
}
.mdc-grid-list .mdc-grid-tile__primary {
    padding: 48px;
}
</style>
<style lang="scss">
  @import '@material/button/mdc-button';
  @import '@material/dialog/mdc-dialog';
  @import '@material/grid-list/mdc-grid-list';
</style>
