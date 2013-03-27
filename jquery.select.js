(function($) {
  $.fn.select = function() {
    return this.each(function() {
      var $this = $(this);
      var $selector = $this;
      var $select = $selector.find('select');
      var $options = $select.find('option');

      var $optionsDataValues = [];
      var $optionsDataTexts = [];

      $options.each(function(key, value){
        $optionsDataTexts.push($(value).text());
        $optionsDataValues.push($(value).val());
      });

      $select.hide();

      var $input = $("<input type='text' name='" + $select.attr('name') + "_input' value='' readonly autocomlete='off' />");
      var $list = $("<ul class="list" style="display: none;">");
      for(var i in $optionsDataTexts) {
        $list.append($("<li>" + $optionsDataTexts[i] + "</li>"));
      }

      $list.find('li').click(function(e){
        var selected = $(this).text();
        var index = $.inArray(selected, $optionsDataTexts);
        $input.val(selected);
        $select.val($optionsDataValues[index]);
        $list.hide();
      });

      $input.click(function(){
        $list.show()
      });
      $list.mouseover(function(){
        $list.show();
      });
      $list.mouseout(function(){
        $list.hide();
      });

      $selector.append($input);
      $selector.append($list);
    });
  }
})(jQuery)
