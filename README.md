# RoomStage AR — Character Placement Website

A small static website prototype for selecting a 3D character and trying to place it in a real space on a supported Android phone.

## Requirements

- Windows 10/11
- VS Code
- Internet connection (the demo loads `model-viewer` and 3D models from public CDNs)
- Android phone with an updated browser for device testing
- For immersive AR, device/browser support and Google Play Services for AR may be required

## Run on your Windows laptop

1. Extract the project ZIP.
2. Open the `ar-character-website` folder in VS Code.
3. Open VS Code Terminal: **Terminal → New Terminal**.
4. Check Python:

   ```powershell
   python --version
   ```

   If that does not work, try:

   ```powershell
   py --version
   ```

5. Start a local server from the project folder:

   ```powershell
   python -m http.server 8000
   ```

   Or, if `python` is not recognized:

   ```powershell
   py -m http.server 8000
   ```

6. Open this URL on the laptop:

   `http://localhost:8000`

7. Stop the server by returning to the terminal and pressing **Ctrl+C**.

## Test on Android

Web-based immersive AR generally needs a secure context (HTTPS or localhost) and a supported AR device/browser. Opening `http://192.168.x.x:8000` from a phone is not a secure context for WebXR, so the laptop's local URL alone may show only the 3D preview.

For a straightforward phone test, publish the static files to a trusted HTTPS static host (for example, GitHub Pages) or use Chrome DevTools port forwarding over USB as described in Google's official WebXR codelab. Do not expose your development server to the public internet.

On Android:
1. Open the hosted HTTPS website in Chrome.
2. Tap a character card.
3. Tap **Place in my space**.
4. Grant camera/AR permissions if prompted.
5. Move the phone slowly to scan the floor, then tap to place the model.

## Change or add a character

Open `app.js`. The `characters` object maps each gallery card to a model URL and description. Use `.glb` or `.gltf` models you own or are licensed to use. Some model URLs may change; if a model fails to load, replace its `src` with a working HTTPS `.glb` URL.

## What this prototype does and does not do

- Includes a responsive gallery and 3D preview.
- Includes preview-size control.
- Requests AR through Google's `<model-viewer>` component.
- Does not save photos, track users, include accounts, or upload camera footage to a backend.
- AR capability varies by device/browser. The fallback may open Android's Scene Viewer rather than rendering the AR session directly inside the page.
- The emoji in gallery cards are visual placeholders; the actual model appears in the 3D viewer.

## Official references

- WebXR AR codelab: https://codelabs.developers.google.com/ar-with-webxr
- WebXR requirements: https://developers.google.com/ar/develop/webxr/requirements
- model-viewer: https://modelviewer.dev/
