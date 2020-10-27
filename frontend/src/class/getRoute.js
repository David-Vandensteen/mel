export default function getRoute() {
  return process.env.VUE_APP_ROUTE_BACKEND || window.location.origin;
}
