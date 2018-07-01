$( ".menu-display" ).click(function() {
    // if ( $( "nav" ).is( ":hidden" ) ) {
    //     $( "nav" ).slideLeft( "slow" );
    //   } else {
    //     $( "nav" ).hide();
    //   }

      $("nav").animate({width:'toggle'},200);
  });