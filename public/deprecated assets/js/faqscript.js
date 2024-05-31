var acc = document.getElementsByClassName("faq-list");
	var i;

	for (i = 0; i < acc.length; i++) {
	    acc[i].addEventListener("click", function() {
	        this.classList.toggle("faqs-active");
	        var panel = this.nextElementSibling;
	        if (panel.style.maxHeight) {
	            panel.style.maxHeight = null; 
	        } else {
	 
	            panel.style.maxHeight = panel.scrollHeight + "px";
	        }
	    });
	}