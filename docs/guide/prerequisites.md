# Prerequisites
Because Tres XR utilises the WebXR specification under the hood extra steps need to be taken to ensure a fully functional local development environment (server) and a compliant WebXR enabled headset device

## Server considerations  🧑‍💻
Requirements for a web server hosting WebXR content

### Networking  🛜
For local developement you will need both a server and XR headset connected to the same network with your locally hosted site utilising Tres + Tres XR running with server options to listen for all IP addresses on your local network ([see here for vite powered servers](https://vitejs.dev/config/server-options))

### Security  🔒
WebXR also requires web servers to serve content over HTTPS which can be achieved by setting up a local provisioned SSL certificate for your server using a tool such as [mkcert](https://mkcert.org/)

## Headset considerations  🥽
Requirements for a headset to be able to connect to a web server hosting WebXR content

### Server connection  🔌
You will also need either the hostname or IP address of your host machine (server), as well as the port number of your web server (if using none standard port number) as you will need to use this instead of localhost when connecting to the server via the web browser on your XR headset

eg: https://xr.local:5173

### WebXR compatability  ✅

You will also need to make sure your XR headset has a web browser compatabile with WebXR and the feature enabled (see https://caniuse.com/webxr)

Note: If you have a Meta Quest 2/3 or Apple Vision Pro then the default pre-installed browser supports WebXR out of the box with no additional setup/configuration required