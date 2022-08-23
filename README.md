React Native Mobile Application

## Get Started

### 1. Prerequisites

- [NodeJs](https://nodejs.org/en/) -JavaScript runtime built on Chrome's V8 JavaScript engine.
- [NPM](https://npmjs.org/) - Node Package Manager
- [OpenJDK](http://openjdk.java.net/) - Java Development Kit
- [Android Studio](https://developer.android.com/studio) - Android Developer Tools

### 2. Installation

On the command prompt run the following commands:

```
 $ git clone https://github.com/odeumtech/growth-council-mobile-app.git
 $ cd growth-council-mobile-app
 $ npm install
```

Finally, start and build the application:

```
$ npx react-native start
$ npx react-native run-android

$ npx react-native start --reset-cache
$ npm install --legacy-peer-deps
$ npm audit fix --force
```

### 3. To generate APK

```
$ npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
$ cd android
$ ./gradlew assembleDebug
```

### 4. Useful Link

- A JavaScript Library For Building UI - [React](https://reactjs.org/)
- A framework For Building Native Apps - [React Native](https://reactnative.dev/)
- Developer Tool For Debugging React Native - [React Native Flipper](https://fbflipper.com/)
- UI Components - [NativeBase](https://nativebase.io/)
- Routing and Navigation - [React Navigation](https://reactnavigation.org/)
- Predictable State Container - [Redux](http://redux.js.org/)
- React Bindings For Redux - [React Redux](https://react-redux.js.org/)
- Redux Toolkit - [Redux Toolkit](https://redux-toolkit.js.org/)
- Persist And Rehydrate Redux Store - [Redux Persist](https://github.com/rt2zz/redux-persist)
- Redux Middleware For Debugging Redux [Flipper](https://fbflipper.com/) - [Redux Flipper](https://github.com/jk-gan/redux-flipper)
- Form Library - [Formik](https://formik.org/)
- Promise based HTTP client - [Axios](https://github.com/mzabriskie/axios)
- Object Schema Validation - [Joi](https://www.npmjs.com/package/joi)
- Code Linting Tool - [ESLint](http://eslint.org/)
- Code Formatter - [Prettier](https://www.npmjs.com/package/prettier)
