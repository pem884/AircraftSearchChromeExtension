chrome.contextMenus.onClicked.addListener(contextClick);

function contextClick(info, tab) {
    const { menuItemId } = info

    if (menuItemId === 'contextMenuItem1') {
        searchWord(info,tab);
    }
    if (menuItemId === 'contextMenuItem2') {
        searchByTailNumber(info,tab);
    }
    if (menuItemId === 'contextMenuItem3') {
        showHistoryByHex(info,tab);
    }
};

chrome.contextMenus.removeAll()

function searchWord(info,tab) {
    console.log("Word " + info.selectionText + " was clicked and searched with Google.");
    chrome.tabs.create({  
      url: "http://www.google.com/search?q=" + info.selectionText
    });
}
function searchByTailNumber(info, tab) {
    console.log("Word " + info.selectionText + " was clicked and searched against the FAA registry.");
    chrome.tabs.create({  
        url: "https://registry.faa.gov/AircraftInquiry/Search/NNumberResult?nNumberTxt=" + info.selectionText
    })
}
function showHistoryByHex(info, tab) {
    console.log("Word " + info.selectionText + " was clicked and sent as the mode-S hex to adsbexchange for viewing.");
    chrome.tabs.create({
        'url': 'http://globe.adsbexchange.com/?sitelat=40.854&sitelon=-74.059&zoom=11&icao=' + info.selectionText
    })
}

let contextMenuItem1 = {
    "id": "contextMenuItem1",
    "title": "Search: %s",
    "contexts": ["selection", "editable"]
};
let contextMenuItem2 = {
    "id": "contextMenuItem2",
    "title": "Search for selected tail number",
    "contexts": ["selection", "editable"]
};
let contextMenuItem3 = {
    "id": "contextMenuItem3",
    "title": "Show flight history for ICAO hex",
    "contexts": ["selection", "editable"]
};

chrome.contextMenus.create(contextMenuItem1);
chrome.contextMenus.create(contextMenuItem2);
chrome.contextMenus.create(contextMenuItem3);