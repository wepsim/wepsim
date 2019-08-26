
# WepSIM: Wep Elemental Processor Simulator

## 1) Prepare the Apache Cordova Project: 

+ Follow Apache Cordova tutorial in order to create a new project:
```bash
npm install -g cordova
cordova create wepsim es.uc3m.inf.arcos.wepsim WepSIM
cd wepsim
cordova platform add android
cordova platform add ios
```

+ Install at least the following plugins:
```bash
cordova plugin add cordova-plugin-console
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-dialogs
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-web-share
cordova plugin add cordova-plugin-whitelist
```

## 2) Update WepSIM files:

+ Copy WepSIM files into the www directory:
```bash
wget https://github.com/acaldero/wepsim/releases/download/v2.0.10/wepsim-2.0.10.zip
unzip wepsim-2.0.10.zip
mv www www.initial.$$
cp -a wepsim-2.0.10/ws_dist www
```

+ To adapt some files for Apache Cordova:
   * To adapt path in "www/examples/hardware/ep/images/processor.svg":
```bash
sed -i .bak 's/wepsim/android_asset\/www/g' ./www/examples/hardware/ep/images/processor.svg
```

   * Edit file "platforms/android/app/src/main/java/es/uc3m/inf/arcos/wepsim/MainActivity.java"
     And add:
```java
         ...
	import android.webkit.WebView;
	import android.webkit.WebSettings;
	import android.webkit.WebSettings.ZoomDensity;
         ...
         WebView webView = (WebView) appView.getEngine().getView();
         WebSettings settings = webView.getSettings();
         settings.setUseWideViewPort(true);
         settings.setSupportZoom(true);
         settings.setBuiltInZoomControls(true);
         settings.setDisplayZoomControls(false);
         ...
```

## 3) Test the associated .apk:

+ Build .apk:
```bash
cordova build android --debug
```

+ Run WepSIM's App:
```bash
cordova run android
adb -d install -r ./platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

