
# WepSIM: Wep Elemental Processor Simulator


## 1) Prepare the Apache Cordova Project: 

+ Follow Apache Cordova tutorial in order to create a new project:
       npm install -g cordova
       cordova create wepsim es.uc3m.inf.arcos.wepsim WepSIM
       cd wepsim
       cordova platform add browser
       cordova platform add android
       cordova platform add ios

+ Install at least the following plugins:
       cordova plugin add cordova-plugin-console
       cordova plugin add cordova-plugin-device
       cordova plugin add cordova-plugin-dialogs
       cordova plugin add cordova-plugin-file
       cordova plugin add cordova-plugin-file-transfer
       cordova plugin add cordova-plugin-splashscreen
       cordova plugin add cordova-plugin-web-share
       cordova plugin add cordova-plugin-whitelist

## 2) Update WepSIM files:

+ Copy WepSIM files into the www directory:
       wget https://github.com/acaldero/wepsim/releases/download/v2.0.10/wepsim-2.0.10.zip
       unzip wepsim-2.0.10.zip
       mv www www.initial.$$
       cp -a wepsim-2.0.10/ws_dist www

+ Adapt some files for Apache Cordova:
       * Edit file "www/examples/hardware/ep/images/processor.svg"
         And replace:
  	   xlink:href="/wepsim/images/fire.gif" 
         With:
	   xlink:href="/android_asset/www/images/fire.gif" 

## 3) Test the associated .apk:

+ Build .apk:
     cordova build android --debug

+ Run WepSIM's App:
     cordova run android
     adb -d install -r ./platforms/android/app/build/outputs/apk/debug/app-debug.apk

