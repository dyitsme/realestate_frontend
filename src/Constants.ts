const production = {
  url: 'https://standingtiger.eastasia.cloudapp.azure.com/predict_xgb'
}
const development = {
url: 'http://localhost:5000/predict_xgb'  
}
export const config = process.env.NODE_ENV === 'production' ? production : development