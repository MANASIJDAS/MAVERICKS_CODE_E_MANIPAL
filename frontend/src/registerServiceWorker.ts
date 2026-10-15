import { registerSW } from 'virtual:pwa-register'

export default function registerServiceWorker() {
  const updateSW = registerSW({
    onRegistered(r) {
      // r is the registration
    },
    onRegisterError(err) {
      // noop
    }
  })
  return updateSW
}
