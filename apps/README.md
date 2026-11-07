# Expensa AI mobile apps

The web dashboard remains at the repository root. Separate Expo React Native applications are provided for Android and iOS:

- Android: `cd apps/android && npm install && npm run android`
- iOS (requires macOS and Xcode for the simulator): `cd apps/ios && npm install && npm run ios`
- Start Expo for QR-device testing with `npm start` in either app directory.

These are standalone starting apps and currently keep transaction data in memory on the device; they do not yet synchronize with the web dashboard or persist data across restarts.
