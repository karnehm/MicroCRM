<template>
  <div id="app">
    <ContactView v-on:contact="onContact"/>
    <button v-on:click="update">Update Now</button>
  </div>
</template>

<script>
import ContactView from './components/Contact-View.vue'
  import {Subject} from 'rxjs'
export default {
  name: 'app',
  components: {
    ContactView
  },
    methods: {
        onContact: function (x) {
            alert(JSON.stringify(x))
        },
        update: function () {
          const event = new CustomEvent("contactUpdate", {
              detail: {customname: 'Hansi'},
              bubbles: true,
              cancelable: false
          });
          document.dispatchEvent(event);
        }
    },
    data() {
        return {
            updater: Subject
        };
    },
    created() {
        this.updater = new Subject();

    }
}
</script>

<style>

</style>
