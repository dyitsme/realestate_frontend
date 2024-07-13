const production = {
  url: 'https://standingcat.azurewebsites.net/predict_xgb'
}
const development = {
url: 'http://localhost:5000/predict_xgb'  
}
export const config = process.env.NODE_ENV === 'production' ? production : development