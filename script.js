const appForm = $("#application-form");
const miscSection =  $(".miscellaneous-section");
const appSecion = $(".application-section");
const headlineTitle = $(".headline-title");
const jobTitle = $(".job-title");
const jobLocation = $(".job-location");
const clearFormButton = $(".clear-btn");

$( document ).ready(() =>{
    resetForm();
});

$( ".menu-display" ).click(function() {    
    $("nav").animate({width:'toggle'},200);
});

clearFormButton.click(()=>{
    resetForm();
})
appForm.validate({
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
        successfulSubmit(form)
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


const resetForm = () =>{
    appForm[0].reset();
}

const successfulSubmit = (formSubmit) => {
    $(".submit-btn").prop('disabled', true);
    console.log(formSubmit)
    renderSuccessScreen();
    setTimeout(() =>{      
        window.location.href = "http://www.example.com/";
    }, 10000);
};

const renderSuccessScreen = () =>{
    miscSection.hide();
    appSecion.hide();
    let applicantName = `${$("#first-name").val()} ${$("#last-name").val()}`
    headlineTitle.html(`<h1>Thanks ${applicantName}! 
                        Hope to see you soon in ${jobLocation.text()} 
                        as a ${jobTitle.text()}!</h1><br>
                        <h6>(This page will redirect in 10 seconds)</h6>`)
}
