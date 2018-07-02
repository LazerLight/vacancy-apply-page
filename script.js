$( ".menu-display" ).click(function() {    
    $("nav").animate({width:'toggle'},200);
});


$("#application-form").validate({
    rules: {
        "first-name": "required",
        //     "last-name": "required",
        //     gender: "required",
        //     birthdate: {
        //         required: true,
        //         date : true
        //     },
        //     email: {
        //         required: true,
        //         email : true
        //     },
        //     "phone-number": "required",
        //     "street-address": "required",
        //     city: "required",
        //     zipcode: {
        //         required: true,
        //         postalcodeNL : true
        //     },
        //     CV:{
        //         required: true,
        //         extension: "pdf|jpeg|doc|docx"
        //     },
        //     portfolio:{
        //         extension: "pdf|jpeg|doc|docx"
        //     },
        //     "cover-letter":{
        //         extension: "pdf|jpeg|doc|docx"
        //     },
        //     photo:{
        //         extension: "pdf|jpeg|doc|docx"
        //     }
    },
    messages: {
        email: "Enter a valid email address",
        zipcode: "Enter a valid Dutch Zipcode"
    },
    submitHandler: (form) => {
        $("#application-form")[0].reset();
        //successfulSubmit()
    },
    
    invalidHandler: (event, validator) => {
        let errors = validator.numberOfInvalids();
        if (errors) {
            $(".error-field").show();
        } else {
            $(".error-field").hide();
        }
    }
});




const successfulSubmit = (formSubmit) => {
    $(".submit-btn").prop('disabled', true);
    formSubmit.submit();
    $("#application-form")[0].reset();

    setTimeout(() =>{
        window.location.href = "http://www.wikipedia.com/";
    }, 3000);
};

const renderSuccessScreen = () =>{
    miscSection.hide();
    appSecion.hide();
    headlineTitle.html(`<h1>Thanks for your ${jobTitle.text()} application, hope to see you soon in ${jobLocation.text()}</h1>`)

}

const miscSection =  $(".miscellaneous-section");
const appSecion = $(".application-section")
const headlineTitle = $(".headline-title")
const jobTitle = $(".job-title")
const jobLocation = $(".job-location")
