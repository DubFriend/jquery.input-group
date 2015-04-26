// jquery.input-group version 1.1.0
// https://github.com/DubFriend/jquery.input-group
// (MIT) 26-04-2015
// Brian Detering
(function ($) {
'use strict';

var isObject = function (value) {
    return Object.prototype.toString.call(value) === '[object Object]';
};

var isArray = function (value) {
    return Object.prototype.toString.call(value) === '[object Array]';
};

var inArray = function (array, target) {
	return array.indexOf(target) !== -1;
};

var foreach = function (collection, callback) {
    for(var i in collection) {
        if(collection.hasOwnProperty(i)) {
            callback(collection[i], i, collection);
        }
    }
};

var reduce = function (collection, callback, carry) {
	var reduced = carry;
	foreach(collection, function (val, key) {
		reduced = callback(reduced, val, key, collection);
	});
	return reduced;
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

		var message = (function () {
			var message = isObject(fig.message) ?
				fig.message[inputName] || '' : fig.message;

			if(isArray(message) && message.length === 1) {
				return message[0];
			}
			else if(isArray(message)) {
				if(message.length) {
					return '<ul>' + reduce(
						message,
						function (carry, val) {
							return carry + '<li>' + val + '</li>';
						}, ''
					) + '</ul>';
				}
				else {
					return '';
				}
			}
			else {
				return message;
			}
		}());

		if(
			isObject(fig.message) && fig.message[inputName] ||
			!isObject(fig.message)
		) {
			$group.addClass(classes.feedback + ' ' + classes[statusType]);

			if(!(
				isArray(fig.noIcon) && inArray(fig.noIcon, inputName) ||
				fig.noIcon === true
			)) {
				$groupInput.append(
					$(icons[statusType])
						.attr('data-input-group-feedback-icon', '')
				);
			}

			if(message) {
				$groupInput.append(
					$(feedback[statusType])
						.attr('data-input-group-feedback', '')
						.html(message)
				);
			}
		}
	});
};

var applyStatuses = function ($self, fig) {
	$self.inputGroupClear();
	if(fig) {
		if(fig.error !== undefined) {
			setGroup($self, 'error', $.extend(fig, { message: fig.error }));
		}

		if(fig.success !== undefined) {
			setGroup($self, 'success', $.extend(fig, { message: fig.success }));
		}

		if(fig.warning !== undefined) {
			setGroup($self, 'warning', $.extend(fig, { message: fig.warning }));
		}
	}
};

$.inputGroupConfig = function (fig) {
	classes = $.extend(classes, fig.classes);
	icons = $.extend(icons, fig.icons);
	feedback = $.extend(feedback, fig.feedback);
};

$.fn.inputGroupValues = function () {
	var values = {};

	$(this).each(function () {
		var $input = $(this).find('input, select, textarea');
		var name = $input.attr('name');
		var value;

		if(name) {
			if($input.is('input[type="radio"]')) {
				$input.each(function () {
					if($(this).is(':checked')) {
						value = $(this).val();
					}
				});
			}
			else if($input.is('input[type="checkbox"]')) {
				value = [];
				$input.each(function () {
					if($(this).is(':checked')) {
						value.push($(this).val());
					}
				});
			}
			else if($input.is('textarea')) {
				value = $input.html();
			}
			else {
				value = $input.val();
			}

			values[name] = value;
		}
	});

	return values;
};

$.fn.inputGroup = function (fig) {
	var $self = $(this);
	applyStatuses($self, fig);
	if(fig.validate) {
		$self.find('input, select, textarea').blur(function () {
			applyStatuses($self, fig.validate($self.inputGroupValues()));
		});
	}
};

$.fn.inputGroupClear = function () {
	$(this).each(function () {
		var $group = $(this);
		var $groupInput = $group.children().last();
		foreach(classes, function (className) {
			$group.removeClass(className);
		});
		$groupInput.find('[data-input-group-feedback-icon]').remove();
		$groupInput.find('[data-input-group-feedback]').remove();
	});
};

}(jQuery));