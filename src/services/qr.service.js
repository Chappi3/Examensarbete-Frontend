import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8095/api/qr/'

class QrService {
  async fetchQrData(userId) {
    const response = await axios.get(API_URL + 'user/' + userId, { headers: authHeader() })
    return response.data
  }

  createQrData(userId, qrData) {
    return axios.post(
      API_URL + 'user/' + userId + '/create',
      {
        name: qrData.name,
        text: qrData.text
      },
      { headers: authHeader() }
    )
  }

  updateQrData(userId, qrData, newName) {
    return axios.put(API_URL + 'user/' + userId + '/edit/' + qrData.id, { name: newName }, { headers: authHeader() })
  }

  deleteQrData(userId, qrId) {
    return axios.delete(API_URL + 'user/' + userId + '/delete/' + qrId, { headers: authHeader() })
  }
}

export default new QrService()
