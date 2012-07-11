
/**
 *
 * Injected on any page on tf2tp.com
 *
 */



setup();



//the item id attribute on the div elements
var ITEM_ID_ATTR = "data-tf2itemid";
//item name
var ITEM_NAME_ATTR = "data-name";
//new line var
var _NL = "<br />";


/**
 * inits all scripts and makes sure items are loaded
 */
function setup()
{
    //on page load
    $(function() {
        //find all elements with the attribute that links to an item id
        $("div[" + ITEM_ID_ATTR + "]").each(function(index, element) {
        
            //$(element).click(function() {
                //send a message to background to get item details
                getItemDetails($(element).attr(ITEM_NAME_ATTR), function(response) {
                    
                    var itemDetails = formatItemDetails(element, response);
                
                    //add a qtip popup
                    $(element).qtip({
                        content: itemDetails,
                        style: { 
                            name: 'dark',
                            width: {
                                min: 10, 
                                max: 600
                            }
                        },
                        position: {
                            corner: {
                                target: 'bottomRight',
                                tooltip: 'bottomLeft'
                            }
                        },
                        show: { event: 'mouseover' },
                        hide: 'mouseout'
                    }).qtip("updateWidth");
                    
                    $(element).qtip("updateWidth");
                    $(element).qtip("api").updateContent(itemDetails, true);
                });
            //});
        });
    });
}



//formats item detail description
function formatItemDetails(element, response)
{
    var itemDetails = "";
    if(response.items.length == 0) {
        itemDetails += "ERROR: Cannot find item";
    }
    else {
        for(var i=0; i<response.items.length; i++)
        {
            var item = response.items[i];
            itemDetails += "(" + item.quality + ") " + item.name + " (Est: " + item.est_price + ")" + _NL;
        }
    }
    
    return itemDetails;
}


//ensures the data is valid before adding it to the string
function validateDetails(name, object)
{
    if(object && object != "-1")
    {
        return "<p>" + name + ": " + object + "</p>";
    }
    else return "";
}



function getItemDetails(name, callback)
{
    chrome.extension.sendMessage({type: "item_details", itemName: name}, function(response) {
        callback(response);
    });
}
