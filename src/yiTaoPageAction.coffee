

controller = new PageActionControllerZ()

controller.add(
  new PageActionJQ(

    ->
      $('#J_searchIpt')
  ,

    (ele) ->
      ele.val(searchWord)

      setTimeout(
        ->
          $('div.s-btn-container input').click()
      ,
        1000


      )

  )


)

controller.doAction()