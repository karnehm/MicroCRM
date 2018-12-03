<template>
  <div>
    <h2>Zahlung Übersicht</h2>
    <b-alert :show="isError" variant="danger">{{errorMsg}}</b-alert>
    <b-table v-if="data" :items="data" :fields="fields" bordered>
      <template slot="table-caption">
        <div style="text-align: right; margin-right: 20px">
          Gesamt: {{totalAmount}} EUR
        </div>
      </template>
      <template slot="bill" slot-scope="data">
        <a href="#" v-on:click="$emit('bill', data.item)" >
          {{data.value}}
        </a>
      </template>
    </b-table>
  </div>
</template>

<script>
    import axios from 'axios'
    import bTable from 'bootstrap-vue/es/components/table/table'
    import bAlert from 'bootstrap-vue/es/components/alert/alert'

    export default {
        name: 'PaymentView',
        model: {
            props: ['customername'],
            event: 'bill'
        },
        props: {
            customername: String
        },
        components: {
            'b-table': bTable,
            'b-alert': bAlert
        },
        data () {
            return {
                data: null,
                totalAmount: 0,
                lastUpdate: 0,
                errorMsg: 'There was an error. Sorry',
                isError: false,
                url: 'http://localhost:3000/payment',
                fields: [
                    {
                        key: 'amountdate',
                        label: 'Rechnungsdatum',
                        sortable: true
                    }, {
                        key: 'bill',
                        label: 'Rechnungsnummer'
                    }, {
                        key: 'customer',
                        label: 'Kunde',
                        sortable: true
                    }, {
                        key: 'amount',
                        label: 'Betrag',
                        formatter: (x) => { return x + ' EUR' }
                    }
                ]
            }
        },
        methods: {
            updateValues: function (customerName) {
                const url = customerName ? this.url + '?customer=' + customerName : this.url
                axios
                    .get(url)
                    .then(response => {
                        this.data = response.data
                        this.isError = false
                        this.totalAmount = 0;
                        response.data.map((x) => { this.totalAmount += Number(x.amount) })
                    })
                    .catch(() => {
                        this.data = null
                        this.isError = true
                    })
            }
        },
        mounted () {
            this.updateValues(this.customername)
            document.addEventListener('paymentUpdate', (() => this.updateValues()).bind(this));
        },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import '../../node_modules/bootstrap/dist/css/bootstrap.css';
  @import '../../node_modules/bootstrap-vue/dist/bootstrap-vue.css';
  * {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  h1, h2 {
    text-align: left;
  }
</style>
