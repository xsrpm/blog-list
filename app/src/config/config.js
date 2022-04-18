export const config = {
  ENV: process.env.NODE_ENV || 'development',
  REACT_APP_API: process.env.REACT_APP_API || (process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3003')
}
