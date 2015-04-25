// jquery.bootstrap-form-input version 1.0.0
// https://github.com/DubFriend/jquery.boostrap-form-input
// (MIT) 25-04-2015
// Brian Detering
(function ($) {
'use strict';

var isArray = function (value) {
    return $.isArray(value);
};

var isObject = function (value) {
    return !isArray(value) && (value instanceof Object);
};

var foreach = function (collection, callback) {
    for(var i in collection) {
        if(collection.hasOwnProperty(i)) {
            callback(collection[i], i, collection);
        }
    }
};

var classes = {
	feedback: 'has-feedback',
	error: 'has-error',
	warning: 'has-warning',
	success: 'has-success'
};

var icons = {
	error: '<span class="glyphicon glyphicon-remove ' +
			'form-control-feedback" ' +
			'aria-hidden="true">',
	warning: '<span class="glyphicon glyphicon-warning-sign ' +
			'form-control-feedback" ' +
			'aria-hidden="true">',
	success: '<span class="glyphicon glyphicon-ok ' +
			'form-control-feedback" ' +
			'aria-hidden="true">'
};

var feedback = {
	error: '<span class="help-block">',
	warning: '<span class="help-block">',
	success: '<span class="help-block">'
};

var setGroup = function ($self, statusType, fig) {
	$self.each(function () {
		var $group = $(this);
		var $groupInput = $group.children().last();
		var inputName = $groupInput.find('[name]').attr('name');

		var message = isObject(fig.message) ?
			fig.message[inputName] || '' : fig.message;

		if(
			isObject(fig.message) && fig.message[inputName] ||
			!isObject(fig.message)
		) {
			foreach(classes, function (className) {
				$group.removeClass(className);
			});
			$group.addClass(classes.feedback + ' ' + classes[statusType]);

			$groupInput.find('[data-input-group-feedback-icon]').remove();
			if(!fig.noIcon) {
				$groupInput.append(
					$(icons[statusType])
					.attr('data-input-group-feedback-icon', '')
				);
			}

			$groupInput.find('[data-input-group-feedback]').remove();
			$groupInput.append(
				$(feedback[statusType])
				.attr('data-input-group-feedback', '')
				.text(message)
			);
		}
	});
};

$.inputGroupConfig = function (fig) {
	classes = $.extend(classes, fig.classes);
	icons = $.extend(icons, fig.icons);
	feedback = $.extend(feedback, fig.feedback);
};

$.fn.inputGroup = function (fig) {
	var $self = $(this);
	if(fig.error) {
		setGroup($self, 'error', $.extend(fig, { message: fig.error }));
	}

	if(fig.success) {
		setGroup($self, 'success', $.extend(fig, { message: fig.success }));
	}

	if(fig.warning) {
		setGroup($self, 'warning', $.extend(fig, { message: fig.warning }));
	}
};

}(jQuery));