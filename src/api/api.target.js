// const prodUrl = "https://tpc-inventory-backend-staging.herokuapp.com"
const localUrl = "http://localhost:8000"

let target = (process.env.REACT_APP_ENV === "production") ? process.env.REACT_APP_BACKEND_URL : localUrl

export default target