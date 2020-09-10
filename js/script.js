(function() {

    "use strict";

    // Preloader
    $(window).on("load", function() {
        $('.preloader-wrap').fadeOut();
    });

    // jQuery document ready fn
    $(function() {

        // Wow.js activation
        new WOW().init();

        // Colorbox activation
        $(".screen-links").colorbox({
            "rel" : "gallery",
            "maxWidth" : "80%",
            "maxHeight" : "90%",
            "transition" : "elastic",
            "speed" : 700
        });

        // Use smooth scrolling when clicking on cta

        var topoffset = 20; // Variable for menu height

        $(".hero-cta").click(function() {
            if (location.pathname.replace(/^\//,"") ===
                this.pathname.replace(/^\//,"") &&
                location.hostname === this.hostname) {

                    var target = $(this.hash);
                    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

                    if (target.length) {
                        $("html, body").animate({
                            scrollTop: target.offset().top + topoffset
                        }, 500);
                        return false;

                    } //target.length
            } 

        }); //smooth scrolling
 
        // Bootstrap form validation
        // Fetch the form to apply custom Bootstrap validation style to
        var forms = document.getElementsByClassName("notify-me-form");

        // Loop over it and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener("submit", function(event) {
                event.preventDefault();
                event.stopPropagation();

                if (form.checkValidity() === true) {
                    notifyMe();
                }

                form.classList.add("was-validated");
            }, false);

        }); // Bootstrap form validation

        // notifyMe function
        function notifyMe() {
            var $firstname = $("#firstname").val().trim();
            var $useremail = $("#useremail").val().trim();

            // Disable submit button until AJAX call is completed to prevent duplicate messages
            var $notifytBtn = $(".notify-btn");
            $notifytBtn.prop("disabled", true).val("Sending...");

            $.ajax({
                url: "mail/notify.php",
                type: "POST",
                data: {
                    firstname: $firstname,
                    useremail: $useremail
                },

                cache: false,

                success: function(response) {
                    console.log(response);
                    // Success feedbacks
                    switch (response) {

                        case "required":

                            // Required feedback
                            $("#feedback").html("<div class='alert alert-danger'></div>");
                            $("#feedback > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                            $("#feedback > .alert-danger").append($("<strong>").text("Your First Name and email address are required"))
                                .append('</strong>');

                            break; 

                        case "invalid":

                            // Invalid feedback
                            $("#feedback").html("<div class='alert alert-warning'></div>");
                            $("#feedback > .alert-warning").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                            $("#feedback > .alert-warning").append($("<strong>").text("Invalid inputs! Your First Name must contain only letters and white spaces. A valid email address is also required"))
                                .append('</strong>');

                            break;

                        case "exist":

                            // Exist feedback
                            $("#feedback").html("<div class='alert alert-info'></div>");
                            $("#feedback > .alert-info").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                            $("#feedback > .alert-info").append($("<strong>").text("Hi " + $firstname + ", your email address already exist in our database."))
                                .append('</strong>');

                            break;

                        case "saved":

                            // Success feedback
                            $("#feedback").html("<div class='alert alert-success'></div>");
                            $("#feedback > .alert-success").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                            $("#feedback > .alert-success").append($("<strong>").text("Hi " + $firstname + ", your email address was register successfully, thanks."))
                                .append('</strong>');

                            // Clear all fields and remove was-validated class
                            // when user's data is submitted successfully

                            var $notifyMeForm =  $(".notify-me-form");
                            $notifyMeForm.trigger("reset");
                            $notifyMeForm.removeClass("was-validated");

                            break;
                    }
                },

                error: function() {

                    // Error feedback
                    $("#feedback").html("<div class='alert alert-danger'></div>");
                    $("#feedback > .alert-danger").html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
                    $("#feedback > .alert-danger").append($("<strong>").text("Sorry " + $firstname + ", it seems that my server is not responding. Please try again later!"))
                        .append('</strong>'); 
                },

                complete: function() {
                            
                    // Re-enable submit button when AJAX call is completed
                    setTimeout(function() {
                        $notifytBtn.prop("disabled", false).val("NOTIFY ME");
                    }, 1500);
          
                    // Remove feedback, if focus, click events occur on the page after AJAX call is completed
                    $("html *").focus(function() {
                        $("#feedback").html("");
                    });
          
                    $("html *").click(function() {
                        $("#feedback").html("");
                    });
                  }

            }); // AJAX request

        } // notifyMe function
  
    }); // jQuery document ready function

})(); // Immediately Invoked Function Expression (IIFE)