#!/usr/bin/env sh

cd ios
mkdir -p build
rm -rf build/archive.xcarchive build/ipa-*

project_list=`ls | grep .xcodeproj`
project_name=${project_list%%.*}

xcodebuild clean
xcodebuild archive \
  -project ./${project_name}.xcodeproj \
  -scheme ${project_name} \
  -configuration Release \
  -archivePath ./build/archive.xcarchive

xcodebuild -exportArchive \
    -archivePath ./build/archive.xcarchive \
    -exportPath ./build/ipa-ad-hoc \
    -exportOptionsPlist ./exportOptions/ad-hoc.plist \
    -allowProvisioningUpdates