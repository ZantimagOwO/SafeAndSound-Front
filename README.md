# SafeAndSound Front

npx expo prebuild --clean

crear assets/index.android.bundle en android/app/src/main

-- compilar react native
react-native bundle --platform android --dev false --entry-file App.jsx --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

-- generar apk y ejecutarlo
npx expo run:android

compilar rn y ejecutarlo
npm run build-android
