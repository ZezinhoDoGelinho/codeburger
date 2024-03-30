import axios from 'axios'

const apiCodeBurger = axios.create({
  baseURL: 'http://localhost:3001'
})

// Passando o token
apiCodeBurger.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('codeburger:userData')
  // "&&" ele só vai buscar o token SE encontrar alguma coisa no localStorage
  const token = userData && JSON.parse(userData).token

  config.headers.authorization = `Bearer ${token}`

  return config
})

export default apiCodeBurger
