<template>
  <div id="app">
    <PaymentView v-on:bill="onBill"  />
    <button v-on:click="update">Update now</button>
  </div>
</template>

<script>
    import PaymentView from './components/Payment-View'

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
                const event = new CustomEvent("paymentUpdate", { detail: { customname: 'Hansi' }, bubbles: true, cancelable: false});
                document.dispatchEvent(event);
            }
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
