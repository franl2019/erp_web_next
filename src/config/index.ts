export const config = {
    isDev :String(import.meta.env.VITE_IS_DEV),
    mode:String(import.meta.env.VITE_MODE),
    serviceUrl : String(import.meta.env.VITE_SERVICE_URL)
}