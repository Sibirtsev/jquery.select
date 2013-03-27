;(function($, window, document, undefined) {
    var pluginName = 'select',
        defaults = {
            selected: 0
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }
    Plugin.prototype = {

        init: function() {
            var _this = this;
            var $container = $(this.element);
            var $selector = $container;
            var $select = $selector.find('select');
            var $options = $select.find('option');

            var $input = $('<span class="select-text" />');

            var $optionsDataValues = {};

            $options.each(function(key, value) {
                var optionValue = $(value).val();
                var optionText = $(value).text();
                $optionsDataValues[optionValue] = optionText;
                if (optionValue == _this.options.selected) {
                    $input.text(optionText);
                }
            });

            $select.hide();

            var $list = $('<ul class="list" style="display: none;">');
            for (var i in $optionsDataValues) {
                $list.append($('<li data-value="' + i + '">' + $optionsDataValues[i] + '</li>'));
            }

            $list.find('li').click(function(e) {
                var selected = $(this).text();
                var index = $(this).attr('data-value');
                $input.text(selected);
                $select.val(index);
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

            $container.append($input);
            $container.append($list);
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };
})(jQuery, window, document);