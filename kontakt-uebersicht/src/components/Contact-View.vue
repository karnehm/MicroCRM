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
            <button  type="button" class="btn btn-light btn-sm" @click="edit(contact)">🖊️</button>
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

    export default {
        name: 'ContactView',
        model: {
            props: ['customername'],
            event: 'contact'
        },
        props: {
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
            },
            edit: function (contact) {
                console.log('jo');
                const event = new CustomEvent('contactEdit',
                    {
                        detail: {
                            contactid : contact.id,
                            customername: contact.customer,
                            date: contact.date,
                            description: contact.description,
                            type: contact.type,
                            comment: contact.comment
                        },
                        bubbles: true
                    });
                document.dispatchEvent(event);
            }
        },
        mounted () {
            this.updateValues(this.customername)
            document.addEventListener('contactUpdate', (e) => this.updateValues(e.detail ? e.detail.customername : null));
        }
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
    color: #2c3e50;
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
