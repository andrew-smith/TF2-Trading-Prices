
/**
 * Injected on any page on tf2tp.com
 */

setup();

//the item id attribute on the div elements
var ITEM_ID_ATTR = "data-tf2itemid";
//item name
var ITEM_NAME_ATTR = "data-name";

/**
 * inits all scripts and makes sure items are loaded
 */
function setup()
{
    //on page load
    $(function() {
        //find all elements with the attribute that links to an item id
        $("div[" + ITEM_ID_ATTR + "]").each(function(index, element) {
            //send a message to background to get item details
            getItemDetails($(element).attr(ITEM_NAME_ATTR), function(response) {
                
                var itemDetails = formatItemDetails(element, response);
                hoverDetails(element, itemDetails);
            });
        });
    });
}
