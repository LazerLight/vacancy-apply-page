const appForm = $("#application-form");
const miscSection =  $(".miscellaneous-section");
const appSecion = $(".application-section");
const headlineTitle = $(".headline-title");
const jobTitle = $(".job-title");
const jobLocation = $(".job-location");
const clearFormButton = $(".clear-btn");
const applicantEmail = $("#email")
const messageField =  $(".message-field");
const sendCopy = $(".sendCopy");
const singleFaq = $('.faq h5');

const resetForm = () =>{
    appForm[0].reset();
}

$( document ).ready(() =>{
    //By clearing form on page load, will help prevent accidental duplicate submissions in case of going back.
    resetForm();
});

$( ".menu-display" ).click(() => {  
    //for mobile version  
    $("nav").animate({width:'toggle'},200);
});


$("#sendCopy").click(()=>{
    let email = applicantEmail.val()
    
    if (!$("#sendCopy").is(':checked')){
        messageField.hide();
        return
    } else if ($("#sendCopy").is(':checked') && email != ""){
        messageField.text(`A copy will be sent to '${email}'`)
        messageField.show();
        
    } else {
        messageField.text(`Give us an email address first!`)
        messageField.show();
        
    }
})

clearFormButton.click(()=>{
    resetForm();
})

singleFaq.click(function() {
    $(this).siblings().slideToggle();
    $(this).find('.fa-plus-square').toggle();
    $(this).find('.fa-minus-square').toggle();
});
/*

Submission stuff

*/

const renderSuccessScreen = () =>{
    miscSection.hide();
    appSecion.hide();
    let applicantName = `${$("#first-name").val()} ${$("#last-name").val()}`
    
    timer = 10
    setInterval(() => {
        
        console.log(timer)
        if(timer < 0){
            return
        } else{
            $(".headline-section").animate({height:'80vh'},200)
            headlineTitle.html(`<h1>Thanks ${applicantName}! 
            Hope to see you soon in ${jobLocation.text()} 
            as a ${jobTitle.text()}!</h1><br>
            <h2>(This page will redirect in ${timer} seconds)</h2>`);
            timer--;
        }
    }, 1000)
    
}

const successfulSubmit = (formSubmit) => {
    $(".submit-btn").prop('disabled', true);
    renderSuccessScreen();
    setTimeout(() =>{      
        //Redirect to help prevent accidental duplicate submissions
        window.location.href = "http://www.example.com/";
    }, 10000);
};


/*

Validation stuff

*/

$.validator.addMethod( "maxsize", function( value, element, param ) {
	if ( this.optional( element ) ) {
		return true;
	}
    
	if ( $( element ).attr( "type" ) === "file" ) {
		if ( element.files && element.files.length ) {
			for ( var i = 0; i < element.files.length; i++ ) {
				if ( element.files[ i ].size > param ) {
					return false;
				}
			}
		}
	}
    
	return true;
}, $.validator.format( "Must be .pdf, .rtf, .txt or .doc/.docx format not exceeding 4 megabytes." ) );

appForm.validate({
    //Gender and age may be optional based on NL law?
    ignore: ".ignore",
    rules: {
        "first-name": "required",
        "last-name": "required",
        email: {
            required: true,
            email : true
        },
        "phone-number": "required",
        "street-address": "required",
        city: "required",
        zipcode: {
            required: true,
            postalcodeNL : true
        },
        CV:{
            required: true,
            extension: "pdf,rtf,txt,doc,docx",
            maxsize: 4000000,
        },
        portfolio:{
            extension: "pdf,rtf,txt,doc,docx",
            maxsize: 4000000,
        },
        "cover-letter":{
            extension: "pdf,rtf,txt,doc,docx",
            maxsize: 4000000,
        },
    },
    messages: {
        email: "Enter a valid email address.",
        zipcode: "Enter a valid Dutch Zipcode.",
        CV: {extension: "Must be .pdf, .rtf, .txt or .doc/.docx format not exceeding 4 megabytes."},
        portfolio: {extension: "Must be .pdf, .rtf, .txt or .doc/.docx format not exceeding 4 megabytes."},    
        "cover-letter": {extension: "Must be .pdf, .rtf, .txt or .doc/.docx format not exceeding 4 megabytes."},    
        photo: {extension: "Must be .pdf, .rtf, .txt or .doc/.docx format not exceeding 4 megabytes."},    

    },
    submitHandler: (form) => {
        successfulSubmit(form)
    },
    
    invalidHandler: (event, validator) => {
        let amountOfErrors = validator.numberOfInvalids();
        if (amountOfErrors) {
            messageField.text(`Please fill out the required fields (${amountOfErrors} missing)`)
            messageField.show();
        } else {
            messageField.hide();
        }
    }
});