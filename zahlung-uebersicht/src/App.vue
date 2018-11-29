<template>
  <div id="app">
    <PaymentView v-on:bill="onBill" v-bind:do-update="updater" />
    <button v-on:click="update">Update now</button>
  </div>
</template>

<script>
    import PaymentView from './components/Payment-View'
    import { Subject } from "rxjs"

    export default {
        name: 'App',
        components: {
            PaymentView
        },
        methods: {
            onBill: function (x) {
                alert(x)
            },
            update: function () {
              this.updater.next();
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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
