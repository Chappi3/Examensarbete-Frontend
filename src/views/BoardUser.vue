<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.username }}</strong> Qr codes
        <router-link to="/create" class="nav-link">
          Create
        </router-link>
      </h3>
    </header>
    <p v-if="error">
      <strong>Qr codes:</strong>
      <br />
      {{ message }}
    </p>
    <p v-else>
      <strong>Qr codes:</strong>
      <ul>
        <li v-for="(qr, id) in qrCodes" :key="id" class="card card-container">
          <p>
            Name:
            {{ qr.name }}
            <br />
            Contains:
            {{ qr.text }}
            <qrcode-vue :value="qr.text"></qrcode-vue>
          </p>
          <div>
            <router-link :to="{ name: 'edit', params: { qr } }">
              <button class="btn btn-primary btn-block">
                <span>Edit</span>
              </button>
            </router-link>
            <button class="btn btn-primary btn-block" @click.prevent="handleDelete(qr.id)">
              <span>Delete</span>
            </button>
          </div>
        </li>
      </ul>
    </p>
  </div>
</template>

<script>
import QrService from '../services/qr.service'
import QrcodeVue from 'qrcode.vue'

export default {
  name: 'Qr',
  components:{
    QrcodeVue
  },
  data() {
    return {
      qrCodes: [],
      error: false,
      message: ''
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login')
    }

    QrService.fetchQrData(this.currentUser.id).then(
      response => {
        this.qrCodes = response
      },
      error => {
        this.error = true
        this.message = (error.response && error.response.data) || error.message || error.toString()
      }
    )
    
  },
  methods: {
    handleDelete(qrId) {
      QrService.deleteQrData(this.currentUser.id, qrId).then(
        () => {
          this.$router.go(0)
        },
        error => {
          this.message = (error.response && error.response.data) || error.message || error.toString()
        }
      )
    }
  }
}
</script>

<style scoped>
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
