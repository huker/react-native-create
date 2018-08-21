export PATH := $(realpath .)/node_modules/.bin:$(PATH)

reset-cache:
	@npm start -- --reset-cache

run-ios:
	@cross-env react-native run-ios;

run-android:
	@react-native run-android;

run-android-release:
	@react-native run-android --variant=release;

release-android:
	cd android && ./gradlew assembleRelease

release-ios:
	@react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ./ios/bundle/main.jsbundle --assets-dest ./ios/bundle

build-ios-dev:
	@sh ./config/build-ios.sh
