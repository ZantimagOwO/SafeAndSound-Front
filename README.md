# SafeAndSound Front

npx expo prebuild --clean

crear assets/index.android.bundle en android/app/src/main

react-native bundle --platform android --dev false --entry-file App.jsx --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

npx expo run:android

"prebuild-clean": "npx expo prebuild --clean",
"build-index": "mkdir android/app/src/main/assets"
    "bundle-android": "react-native bundle --platform android --dev false --entry-file App.jsx --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/",
    "run-android": "npx expo run:android",
    "build-android": "npm run prebuild-clean && npm run bundle-android && npm run run-android"