
initView = (ele) ->

  myCommonUITools.addDefaultButton(
    ->
      ele

    ,
    ->

      goalEle = $(this).parent().find('h1')

      if goalEle.length == 0
        goalEle = $(this).parent().find('h3')

      text = goalEle.text().trim()

      myChromePlugTools.sendMsg("openYiTaoAndSearch",{searchWord : text})

    ,
    '打开一淘'

  )




controller = new PageActionControllerZ()

controller.add(
  new PageActionJQ(
    ->
      if $('.tb-detail-hd').length != 0
        return $('.tb-detail-hd')

      return $('#J_Title')

  ,
    (ele)->
      initView(ele)
  )

)

controller.doAction()