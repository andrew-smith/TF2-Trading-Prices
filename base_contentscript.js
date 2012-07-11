
//new line var
var _NL = "<br />";

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

//creates a hovering element next to an element
function hoverDetails(element, itemDetails)
{
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

}