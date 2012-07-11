

/**
 * Injected on any page on tf2b.com
 */

setup();

/**
 * inits all scripts and makes sure items are loaded
 */
function setup()
{
    //on page load
    $(function() {
        //find all ul elements
        $("li").each(function(index, element) {
            //find the div with the name
            var itemName = $(element).children('div').children('div').html();
            console.log(itemName);
        
            getItemDetails(itemName, function(response) {
                var itemDetails = formatItemDetails(element, response);
                hoverDetails(element, itemDetails);
            });
        });
    });
}
