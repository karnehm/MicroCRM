<template>
  <div class="container">
    <h2>Kontakte Übersicht</h2>
    <div class="row justify-content-md-center">
      <div class="col col-md-auto">
        <b-alert :show="isError" variant="danger">{{errorMsg}}</b-alert>
        <div v-for="(contact, index) in data" :key="index" class="element">
          <div v-if="data[index].date !== (data[index - 1] ? data[index - 1].date : false)" class="date">
            <hr v-if="index > 0">
            <h4>{{contact.date}}</h4>
          </div>
          <div class="description ">
            <button  type="button" class="btn btn-light btn-sm" v-on:click="$emit('contact', contact)">🖊️</button>
            {{contact.description}}
          </div>
          <div class="type margin">
            {{contact.type}}
          </div>
          <div class="customer margin">
            {{contact.customer}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import bAlert from 'bootstrap-vue/es/components/alert/alert'
    import axios from 'axios'
    import { Subject }  from 'rxjs'

    export default {
        name: 'ContactView',
        model: {
            props: ['doUpdate', 'customername'],
            event: 'contact'
        },
        props: {
            doUpdate: Subject,
            customername: String
        },
        components: {
          'b-alert': bAlert
        },
        data() {
            return {
                errorMsg: 'There was an error. Sorry',
                isError: false,
                url: 'http://localhost:3000/contact?_sort=date&_order=desc',
                data: null
            }
        },
        methods: {
            updateValues: function (customerName) {
                const url = customerName ? this.url + '&customer=' + customerName : this.url
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
            if(this.doUpdate) {
                this.doUpdate.subscribe(() => this.updateValues(this.customername));
            }
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
  h2 {
    text-align: center;
  }
  .element {
    text-align: left;
    margin-top: 15px;
  }

  .col{
    margin-top: 25px;
  }
  .description {
    font-weight: bold;
  }
  .margin {
    margin-left: 45px;
  }
  .type {
    color: #a9a9a9;
  }

</style>
