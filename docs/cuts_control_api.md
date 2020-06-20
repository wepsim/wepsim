
### WepSIM control API

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

