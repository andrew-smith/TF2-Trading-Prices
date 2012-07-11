
//the background script page

//all the items are kept in this array
var ITEMS = [];





//assign listener to handle all messages
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    
    switch(request.type)
    {
        case "item_details": getItemDetails(request, sendResponse); break;
        case "price_update": priceUpdate(request); break;
    }
});



function priceUpdate(request)
{
    var item = request.item;
    
    //find the item and replace it
    var foundItem = false;
    for(var i=0; i<ITEMS.length && !foundItem; i++)
    {
        if(ITEMS[i].name == item.name && ITEMS[i].quality == item.quality)
        {
            foundItem = true;
            ITEMS[i] = item;
        }
    }
    
    if(!foundItem) //then put it into the array
    {
        ITEMS.push(item);
    }
}

//generic words that shouldn't be searched for
var EXCLUDE_WORDS = ["Vintage", "The", "Strange", "Unusual", "Genuine"];


//gets an item and its details
function getItemDetails(request, response)
{
    var itemName = request.itemName;
    
    //store all teh found items
    var foundItems = [];
    
    if(itemName && itemName.length > 0)
    {
        //loop through all the items and try and find it
        for(var i=0; i<ITEMS.length; i++)
        {
            if(ITEMS[i].name.indexOf(itemName) != -1)
            {
                foundItems.push(ITEMS[i]);
            }
        }
        
        //try and find related items then...
        if(foundItems.length == 0)
        {
            console.log("founditems empty for " + itemName);
            //remove all the occurances of the exclude words
            for(var i=0; i<EXCLUDE_WORDS.length; i++)
            {
                if(itemName.indexOf(EXCLUDE_WORDS[i] + " ") != -1)
                {
                    itemName = itemName.replace(EXCLUDE_WORDS[i] + " ", "");
                }
            }
            
            console.log("now searching for #" + itemName + "#");
            
            //now perform the search again
            //loop through all the items and try and find it
            for(var i=0; i<ITEMS.length; i++)
            {
                if(ITEMS[i].name.indexOf(itemName) != -1)
                {
                    foundItems.push(ITEMS[i]);
                }
            }
        }
        
    }
    
    response({items: foundItems});
}

