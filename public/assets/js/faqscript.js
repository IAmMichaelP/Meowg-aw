var acc = document.getElementsByClassName("faq-list");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("faqs-active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null; 
        } else {
            // Close all other panels
            var allPanels = document.querySelectorAll(".panel");
            for (var j = 0; j < allPanels.length; j++) {
                allPanels[j].style.maxHeight = null;
            }

            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}
