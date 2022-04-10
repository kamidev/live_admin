import "phoenix_html"
import {Socket} from "phoenix"
import {LiveSocket} from "phoenix_live_view"
import ClipboardJS from 'clipboard'
import topbar from "topbar"

topbar.config({barColors: {0: "rgb(67, 56, 202)"}, shadowColor: "rgba(0, 0, 0, .3)"})
window.addEventListener("phx:page-loading-start", info => topbar.show())
window.addEventListener("phx:page-loading-stop", info => topbar.hide())

let Hooks = {}
Hooks.ResourceCell = {
  mounted() {
    new ClipboardJS(this.el.querySelector('.zoom_copy'));

    var zoomBox = this.el.getElementsByClassName("cell__zoom")[0]

    this.el.addEventListener('click', function() {
      zoomBox.classList.remove("hidden")
    });

    zoomBox.addEventListener('click', function(e) {
      zoomBox.classList.add("hidden")
      event.stopPropagation();
    });

    zoomBox.getElementsByClassName("zoom__container")[0].addEventListener('click', function(e) {
      event.stopPropagation();
    });
  }
}

let csrfToken = document.querySelector("meta[name='csrf-token']").getAttribute("content")
let liveSocket = new LiveSocket("/live", Socket, {hooks: Hooks, params: {_csrf_token: csrfToken}})

// Connect if there are any LiveViews on the page
liveSocket.connect()

// Expose liveSocket on window for web console debug logs and latency simulation:
// >> liveSocket.enableDebug()
// >> liveSocket.enableLatencySim(1000)
// The latency simulator is enabled for the duration of the browser session.
// Call disableLatencySim() to disable:
// >> liveSocket.disableLatencySim()
window.liveSocket = liveSocket
