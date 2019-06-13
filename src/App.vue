<template>
  <div id="app">
    <Navbar />
    <div class="row">
      <Leftside class="col l1 hide-on-med-and-down" />
      <router-view class="main-view col s12 l10"/>
      <Rightside class="col l1 hide-on-med-and-down" />
    </div>
  </div>
</template>

<script>
  import Leftside from '@/components/Leftside'
  import Rightside from '@/components/Rightside'
  import Navbar from '@/components/Navbar'
  import LoadingBar from '@/components/LoadingBar'

export default {
  name: 'App',
  components: {
    Navbar, Leftside, Rightside, LoadingBar
  },
  mounted() {
    M.AutoInit();
  }
}
</script>

<style>
html {
  font-family: SpaceGrotesk-Regular;
  font-size: 14px;
}

body {
 background-color: #3f4cec;
}

@font-face {
  font-family: SpaceGrotesk-Regular;
  src: url(./assets/fonts/SpaceGrotesk-Regular.woff2) format('woff2'),
       url(./assets/fonts/SpaceGrotesk-Regular.woff) format('woff');
}

@font-face {
  font-family: SpaceGrotesk-Bold;
  src: url(./assets/fonts/SpaceGrotesk-Bold.woff2) format('woff2'),
       url(./assets/fonts/SpaceGrotesk-Bold.woff) format('woff');
}

.bold {
  font-family: SpaceGrotesk-Bold;
}

.neblue {
  color: #3f4cec;
}

.descriptor {
  font-family: SpaceGrotesk-Bold;
  font-size: 12px;
  color: #3f4cec;
}
.sidebar {
  padding: 0 !important;
}

.btn {
  background-color: #3dc889;
  text-transform: none;
}
.btn:hover {
  background-color: #17AC67;
}

.btn-orange {
  background-color: #ea79ad;
  text-transform: none;
}
.btn-orange:hover {
  background-color: #cb3f7f;
}

.neg {
  background-color: #ea79ad;
  transition: .4s;
}
.neg:hover {
  background-color: #cb3f7f;
}
.neg-txt {
  color: #ea79ad;
  transition: .4s;
}
.neg-txt:hover {
  color: #cb3f7f;
}
.pos{
  background-color: #3dc889;
  transition: .4s;
}
.pos:hover {
  background-color: #17AC67;
}
.pos-txt{
  color: #3dc889;
  transition: .4s;
}
.pos-txt:hover {
  color: #17AC67;
}

.slightpurple {
  background-color: #e2e2e9
}

.middle {
  margin-left: auto;
  margin-right: auto;
}
.nopad {
  padding: 0;
}
</style>
