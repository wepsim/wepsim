
# Developers: Getting Started

## Table of contents

- [WepSIM engine API](#wepsim-engine)
- [WepSIM control API](#wepsim-control-api)
- [WepSIM for Apache Cordova](#wepsim-for-apache-cordova)


## WepSIM engine API

+ If you want to use the WepSIM engine within your App, there is a WepSIM API in JavaScript available too. 
  You will need to include the WepSIM engine in your proyect:

```javascript
 <script src="min.sim_all.js"   ></script><noscript>Your browser does not support JavaScript!</noscript>
 <script src="min.wepsim_web.js"></script><noscript>Your browser does not support JavaScript!</noscript>
```

+ And then, one simple example of using this WepSIM API is the following:

```javascript
  /*
   * Input: minimal firmware and minimal assembly code
   */

      str_firmware = 'begin {\n' +
                     '  fetch:  (T2, C0),\n' +
                     '          (TA, R, BW=11, M1=1, C1=1),\n' +
                     '          (M2, C2, T1, C3),\n' +
                     '          (A0, B=0, C=0)\n' +
                     '}\n' +
                     'nop {\n' +
                     '        co=010110,\n' +
                     '        nwords=1,\n' +
                     '        {\n' +
                     '                (A0=1, B=1, C=0)\n' +
                     '        }\n' +
                     '}\n' +
                     'registers {\n' +
                     '        0=$zero,\n' +
                     '        29=$sp (stack_pointer)\n' +
                     '}\n' ;

      str_assembly = '.text\n' +
                     'main: nop\n' ;


  /*
   * Code: Initialize WepSIM + reset + compile firmware + compile assembly + execute + get final state
   */

      // 1) initialize WepSIM engine
      var ret = simcore_init(false) ;

      if (false != ret.ok) {
          ret = simcore_init_hw('ep') ;
      }

      if (false != ret.ok) {
          var ui_cb = {} ;
          simcore_init_ui(ui_cb) ;
      }

      // 2) reset hardware
      if (false != ret.ok) {
          simcore_reset() ;
      }

      // 3) load firmware
      if (false != ret.ok) {
          ret = simcore_compile_firmware(str_firmware) ;
      }

      // 4) load assembly
      if (false != ret.ok) {
          ret = simcore_compile_assembly(str_assembly) ;
      }

      // 5) execute firmware-assembly
      if (false != ret.ok) {
          var options = {
                           instruction_limit:  1024, 
                           cycles_limit:      10240
                        } ;
          ret = simcore_execute_program(options) ;
      }

      // 6) show a final report
      if (false != ret.ok) {
          var state_obj = simcore_simstate_current2state() ;
          ret.msg = simcore_simstate_state2checklist(state_obj, '') ;
      }


  /*
   * Output: the final state (or error found)
   */

      console.log(ret.msg) ;
```


## WepSIM control API

+ If you want to control an WepSIM instance, there is a WepSIM API in JavaScript available (WepSIM 2.0.6+).
  For example, It might be used for building a tutorial.

  The following fragment uses the WepSIM control API (wsweb_*):

```html
    <div class="container">

        <nav class="nav nav-pills nav-justified">
              <a href="#"
                 class="nav-item nav-link border border-secondary"
                 onclick="var context1 = document.getElementById('iframe1');
                          context1.src = 'https://acaldero.github.io/wepsim/ws_dist/wepsim-classic.html?' +
                                         'notify=false&' +
                                         'example=13&' +
                                         'simulator=assembly:screen';
                          return false;">Step 1.- Load Example</a>

              <a href="#"
                 class="nav-item nav-link border border-secondary"
                 onclick="var context1 = document.getElementById('iframe1').contentWindow;
                          context1.wsweb_execution_run();
                          return false;">Step 2.- Run</a>
        </nav>

        <div class="row">
            <div class="col-12">
                    <div class="embed-responsive embed-responsive-4by3">
                    <iframe class="w-100 border border-secondary embed-responsive-item"
                            id="iframe1" src=""></iframe>
                    </div>
            </div>
        </div>

    </div>
```


## WepSIM for Apache Cordova

### 1) Prepare the Apache Cordova Project: 

+ 1.1) Follow Apache Cordova tutorial in order to create a new project:
```bash
npm install -g cordova
cordova create wepsim es.uc3m.inf.arcos.wepsim WepSIM
cd wepsim
cordova platform add android
cordova platform add ios
```

+ 1.2) Install at least the following plugins:
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

### 2) Update WepSIM files:

+ 2.1) Copy WepSIM files into the www directory:
```bash
wget https://github.com/acaldero/wepsim/releases/download/v2.0.11/wepsim-2.0.11.zip
unzip wepsim-2.0.11.zip
mv www www.initial.$$
cp -a wepsim-2.0.11/ws_dist www
```

+ 2.2) Adapt path in "www/repo/hardware/ep/images/processor.svg" for Apache Cordova:
```bash
sed -i .bak 's/wepsim/android_asset\/www/g' ./www/repo/hardware/ep/images/processor.svg
```

+ 2.3) Adapt path in files "./www/wepsim-classic.html" and "./www/wepsim-compact.html":
```bash
sed -i .bak 's/external\/cordova/cordova/g' ./www/wepsim-classic.html
sed -i .bak 's/external\/cordova/cordova/g' ./www/wepsim-compact.html
```

+ 2.4) [Android Only] Add to file "platforms/android/app/src/main/java/es/uc3m/inf/arcos/wepsim/MainActivity.java" the code:
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

### 3) Build Android .apk:

+ 3.1) Build .apk:
```bash
cordova build android --debug
```

+ 3.2.a) Run WepSIM's App on Emulator:
```bash
cordova run android
```

+ 3.2.b) Run WepSIM's App on Device:
```bash
adb -d install -r ./platforms/android/app/build/outputs/apk/debug/app-debug.apk
```

