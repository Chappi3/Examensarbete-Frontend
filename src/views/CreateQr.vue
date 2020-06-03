<template>
  <div class="col-md-12">
    <div class="card card-container">
      <svg style="width: 250px; height: 125px;" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M2,6H4V18H2V6M5,6H6V18H5V6M7,6H10V18H7V6M11,6H12V18H11V6M14,6H16V18H14V6M17,6H20V18H17V6M21,6H22V18H21V6Z"
        />
      </svg>
      <form name="form" @submit.prevent="handleCreate">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="qr.name" v-validate="'required'" type="text" class="form-control" name="name" />
          <div v-if="errors.has('name')" class="alert alert-danger" role="alert">
            Name is required!
          </div>
        </div>
        <div class="form-group">
          <label for="text">Text</label>
          <input v-model="qr.text" v-validate="'required'" type="text" class="form-control" name="text" />
          <div v-if="errors.has('text')" class="alert alert-danger" role="alert">
            Text is required!
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>
            <span>Create</span>
          </button>
        </div>
        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Qr from '../models/qr'
import QrService from '../services/qr.service'

export default {
  name: 'Create',
  data() {
    return {
      qr: new Qr('', ''),
      loading: false,
      message: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    handleCreate() {
      this.loading = true
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false
          return
        }

        if (this.qr.name && this.qr.text) {
          QrService.createQrData(this.currentUser.id, this.qr).then(
            () => {
              this.$router.push('/qr')
            },
            error => {
              this.loading = false
              this.message = (error.response && error.response.data) || error.message || error.toString()
            }
          )
        }
      })
    }
  }
}
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
