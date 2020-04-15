
chrome.webRequest.onHeadersReceived.addListener(handleHeadersReceived, {
  urls: ["https://open.spotify.com/*"],
  types: ["main_frame", "xmlhttprequest"]
}, ['blocking', 'responseHeaders'])


function handleHeadersReceived(details) {
  let newHeaders = []
  let hasCsp = false 

  details.responseHeaders.forEach(header => {
    if (header.name.trim().toLowerCase() !== "content-security-policy") {
      newHeaders.push({name: header.name, value: header.value, binaryValue: header.binaryValue})
    } else {
      hasCsp = true 
    }
  })

  if (hasCsp) {
    return {responseHeaders: newHeaders} 
  }
}

