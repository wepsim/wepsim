

    /*
     * Initialize...
     */

    // i18n
    var i18n = {} ;
	i18n.gui = {} ;
	i18n.gui.es = {} ;
	i18n.gui.en = {} ;
	i18n.cfg = {} ;
	i18n.cfg.es = {} ;
	i18n.cfg.en = {} ;

    // tutorials
    var tutorials             = {} ;
        tutorials.welcome     = {} ;
        tutorials.simpleusage = {} ;

    // examples
    var examples    = {};
        examples.en = [];
        examples.es = [];

    // help
    var help    = {} ;
        help.en = [] ;
        help.es = [] ;

    // tour
    var tour_steps = {} ;


    /*
     * Initialize...
     */

    // i18n_update_tags('gui',...
    function i18n_update_tags ( component, lang )
    {
        if (typeof i18n[component] == "undefined") {
	    return ;
	}

	var tags = document.querySelectorAll('span') ;

	Array.from(tags).forEach(function(value, index) {
                         	     var key = value.dataset.langkey ;
                         	     if (i18n[component][lang][key]) {
                                         value.innerHTML = i18n[component][lang][key] ;
				     }
                         	 }) ;
    }

