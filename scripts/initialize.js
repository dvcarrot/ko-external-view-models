/**
 * Создание namespace
 * jQuery.namespace
 */
(function ($) {
    $.namespace = function () {
        var a = arguments, o = null, i, j, d;
        for (i = 0; i < a.length; i = i + 1) {
            d = a[i].split(".");
            o = window;
            for (j = 0; j < d.length; j = j + 1) {
                o[d[j]] = o[d[j]] || {};
                o = o[d[j]];
            }
        }
        return o;
    };
})(jQuery);

/**
 * Авто инициализация плагинов jQuery
 * @example $('[data-controller]').Instantiate()
 */
(function ($) {
    $.fn.Instantiate = function () {
        return this.each(function () {
            var $self = $(this);
            var $controller = $self.attr('data-controller');
            if ($self[$controller]) {
                var params = $self.data();
                $self[$controller](params);
            }
        });
    };
})(jQuery);

/**
 * Инициализация
 */
jQuery(function ($) {
    $.Win = $(window);
    $.Doc = $(document);
    $.Body = $('body');
    $('[data-controller]').Instantiate();
});

/**
 * Автобиндинг нокаут моделей
 */
(function ($, ko) {
    $.fn.ViewModel = function (params) {
        return this.each(function () {
            var self = this;
            self.setAttribute('data-bind', '{template: {name: \'Template.' + params.name + '\'}}');
            $.get('viewmodels/' + params.name + '.html', function (data) {
                $.Body.append(data);
                ko.applyBindings($.namespace(params.name)(params), self);
            });
        });
    };
})(jQuery, ko);
