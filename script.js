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
const successfulSubmit = (formSubmit) => {
    $(".submit-btn").prop('disabled', true);
    renderSuccessScreen();
    setTimeout(() =>{      
        window.location.href = "http://www.example.com/";
    }, 10000);
};

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


$( document ).ready(() =>{
    resetForm();
});

$( ".menu-display" ).click(() => {    
    $("nav").animate({width:'toggle'},200);
});

singleFaq.click(function() {
    $(this).siblings().slideToggle();
    $(this).find('.fa-plus-square').toggle();
    $(this).find('.fa-minus-square').toggle();
});


clearFormButton.click(()=>{
    resetForm();
})

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
}, $.validator.format( "Must be .pdf, .jpeg/.jpg or .doc/.docx format not exceeding 4 megabytes." ) );

appForm.validate({
    rules: {
        "first-name": "required",
        //     "last-name": "required",
        //     gender: "required",
        //     birthdate: {
        //         required: true,
        //         date : true
        //     },
        // email: {
        //     required: true,
        //     email : true
        // },
        //     "phone-number": "required",
        //     "street-address": "required",
        //     city: "required",
        //     zipcode: {
        //         required: true,
        //         postalcodeNL : true
        //     },
    //     CV:{
    //         // required: true,
    //         extension: "pdf,jpeg,jpg,doc,docx",
    //         filesize: 4000000,
    //     },
    //     portfolio:{
    //         extension: "pdf,jpeg,jpg,doc,docx",
    //         filesize: 4000000,
    //     },
    //     "cover-letter":{
    //         extension: "pdf,jpeg,jpg,doc,docx",
    //         filesize: 4000000,
    //     },
    //     photo:{
    //         extension: "pdf,jpeg,jpg,doc,docx",
    //         filesize: 4000000,
    //     }
    },
    messages: {
        email: "Enter a valid email address",
        zipcode: "Enter a valid Dutch Zipcode",
        
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


$("#sendCopy").click(()=>{
    let email = applicantEmail.val()
    
    if (!$("#sendCopy").is(':checked')){
        messageField.hide();
        return
    } else if ($("#sendCopy").is(':checked') && email != ""){
        console.log('a copy')
        messageField.text(`A copy will be sent to '${email}'`)
        messageField.show();
        
    } else {
        console.log("need email")
        messageField.text(`Give us an email address first!`)
        messageField.show();
        
    }
})


