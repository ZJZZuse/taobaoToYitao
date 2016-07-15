

openYiTao = (searchWord) ->

  chrome.tabs.create({url : 'http://www.etao.com/'},
    (tab) ->

      chrome.tabs.executeScript(tab.id, {code: "searchWord='#{searchWord}'"});

      chrome.tabs.executeScript(tab.id, {file: 'async.js'});
      chrome.tabs.executeScript(tab.id, {file: 'jquery.min.js'});

      chrome.tabs.executeScript(tab.id, {file: 'myLib.js'}
        ,
        ->
          chrome.tabs.executeScript(tab.id, {file: 'yiTaoPageAction.js'})
      )




  )



myChromePlugTools.onReceiveKey("openYiTaoAndSearch",
  (obj, sender, key)->
    openYiTao(obj['searchWord'])
)

