// Contact Form Scripts

$(function() {

    var splitter = "-dejackies-";

    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var firstName = $("input#firstname").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var teamname = $("input#team-name").val();
            var type = $("select#type").val();
             // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            //if (firstName.indexOf(' ') >= 0) {
              //  firstName = name.split(' ').slice(0, -1).join(' ');
            //}


            var data = firstName+splitter+name+splitter+email+splitter+phone+splitter+teamname;

            data  = {
                firstName : firstName,
                name: name,
                email:  email,
                phone: phone,
                teamname: teamname,
                type: type
            }

            console.log(data)

            $("input#inschrijven").val = "uw aanvraag wordt verwerkt, even geduld.";

           var server = window.location.origin;
            console.log(server);
            if (server.indexOf("localhost") > 0){
               server = "http://localhost:8080"
           }
           server = server.concat("/subscribe");

            console.log(server);

            $.ajax({
                //url: "././mail/contact_me.php",
                url:server,
                type: "POST",
                crossDomain: true,
                /*data: {
                    name: name,
                    phone: phone,
                    email: email,
                    message: message
                },*/
                data:data,
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Uw aanvraag werd goed ontvangen. U ontvangt binnenkort een mail. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    console.log("error");
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that our mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
