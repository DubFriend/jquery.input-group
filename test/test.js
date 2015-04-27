QUnit.module('main', {
    setup: function () {
        this.$fixture = $('#qunit-fixture');
        this.$fixture.html($('#template').html());
        this.$foo = this.$fixture.find('[data-foo]');
        this.$bar = this.$fixture.find('[data-bar]');
        this.$all = this.$fixture.find('[data-input]');
        this.$inputTypes = this.$fixture.find('[data-input-types]');
        this.expectedInputTypeValues = {
            text: "value",
            radio: "a",
            checkbox: ["a"],
            select: "a",
            textarea: "value"
        };
    }
});

var buildStatusTests = function (assert, $elem, statusType, fig) {
    var $inputGroup = $elem.children().last();
    $elem.inputGroup(fig);
    assert.ok($elem.hasClass('has-feedback'), 'has feedback class');
    assert.ok($elem.hasClass('has-' + statusType), 'has ' + statusType + ' class');
    assert.strictEqual(
        $inputGroup.find('[data-input-group-feedback-icon]').length, 1,
        'has feedback icon'
    );
    assert.strictEqual(
        $inputGroup.find('[data-input-group-feedback]').length, 1,
        'has feedback element'
    );
    assert.strictEqual(
        $inputGroup.find('[data-input-group-feedback]').text(),
        'message',
        'feedback element has message'
    );
};

QUnit.test('foo error single element', function (assert) {
    buildStatusTests.call(this, assert, this.$foo, 'error', { error: 'message' });
});

QUnit.test('foo success single element', function (assert) {
    buildStatusTests.call(this, assert, this.$foo, 'success', { success: 'message' });
});

QUnit.test('foo warning single element', function (assert) {
    buildStatusTests.call(this, assert, this.$foo, 'warning', { warning: 'message' });
});

QUnit.test('bar error single element', function (assert) {
    buildStatusTests.call(this, assert, this.$bar, 'error', { error: 'message' });
});

QUnit.test('bar success single element', function (assert) {
    buildStatusTests.call(this, assert, this.$bar, 'success', { success: 'message' });
});

QUnit.test('bar warning single element', function (assert) {
    buildStatusTests.call(this, assert, this.$bar, 'warning', { warning: 'message' });
});

QUnit.test('foo apply multiple times', function (assert) {
    buildStatusTests.call(this, assert, this.$foo, 'error', { error: 'message' });
    buildStatusTests.call(this, assert, this.$foo, 'success', { success: 'message' });
    assert.ok(!this.$foo.hasClass('has-error'), 'error class removed');
});

QUnit.test('foo no icon', function (assert) {
    this.$foo.inputGroup({ error: 'message', noIcon: true });
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback-icon]').length, 0
    );
});

QUnit.test('foo error status falsey has no feedback message', function (assert) {
    this.$foo.inputGroup({ error: '' });
    assert.ok(this.$foo.hasClass('has-feedback'), 'has feedback class');
    assert.ok(this.$foo.hasClass('has-error'), 'has error class');
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback-icon]').length, 1,
        'has feedback icon'
    );
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').length, 0,
        'does not have feedback element'
    );
});

QUnit.test('foo error status named falsey has no feedback message', function (assert) {
    this.$foo.inputGroup({ error: { foo: null } });
    assert.ok(this.$foo.hasClass('has-feedback'), 'has feedback class');
    assert.ok(this.$foo.hasClass('has-error'), 'has error class');
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback-icon]').length, 1,
        'has feedback icon'
    );
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').length, 0,
        'does not have feedback element'
    );
});

QUnit.test('foo error status empty array has no feedback message', function (assert) {
    this.$foo.inputGroup({ error: [] });
    assert.ok(this.$foo.hasClass('has-feedback'), 'has feedback class');
    assert.ok(this.$foo.hasClass('has-error'), 'has error class');
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback-icon]').length, 1,
        'has feedback icon'
    );
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').length, 0,
        'does not have feedback element'
    );
});

QUnit.test('all no icon on foo only', function (assert) {
    this.$all.inputGroup({ error: 'message', noIcon: ['foo'] });
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback-icon]').length, 0,
        'foo has no icon'
    );
    assert.strictEqual(
        this.$bar.find('[data-input-group-feedback-icon]').length, 1,
        'bar does have an icon'
    );
});

QUnit.test('all multi message', function (assert) {
    this.$all.inputGroup({
        error: { foo: 'foo message', bar: 'bar message' }
    });

    assert.ok(this.$foo.hasClass('has-feedback'), 'foo has feedback class');
    assert.ok(this.$foo.hasClass('has-error'), 'foo has error class');
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').text(),
        'foo message',
        'foo gets correct message'
    );
    assert.ok(this.$bar.hasClass('has-feedback'), 'foo has feedback class');
    assert.ok(this.$bar.hasClass('has-error'), 'foo has error class');
    assert.strictEqual(
        this.$bar.find('[data-input-group-feedback]').text(),
        'bar message',
        'bar gets correct message'
    );
});

QUnit.test('all multi message only on foo', function (assert) {
    this.$all.inputGroup({
        error: { foo: 'foo message' }
    });

    assert.ok(this.$foo.hasClass('has-feedback'), 'foo has feedback class');
    assert.ok(this.$foo.hasClass('has-error'), 'foo has error class');
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').text(),
        'foo message',
        'foo gets correct message'
    );
    assert.ok(!this.$bar.hasClass('has-feedback'), 'bar has no feedback class');
    assert.ok(!this.$bar.hasClass('has-error'), 'bar has no error class');
    assert.strictEqual(
        this.$bar.find('[data-input-group-feedback]').length,
        0,
        'bar does not have feedback message'
    );
});

var testMultiStatuses = function (assert) {
    assert.ok(this.$foo.hasClass('has-feedback'), 'foo has feedback class');
    assert.ok(this.$foo.hasClass('has-error'), 'foo has error class');
    assert.ok(!this.$foo.hasClass('has-success'), 'foo does not have error class');
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').text(),
        'foo message',
        'foo gets correct message'
    );
    assert.ok(this.$bar.hasClass('has-feedback'), 'bar has feedback class');
    assert.ok(this.$bar.hasClass('has-success'), 'bar has success class');
    assert.ok(!this.$bar.hasClass('has-error'), 'bar does not have error class');
    assert.strictEqual(
        this.$bar.find('[data-input-group-feedback]').text(),
        'bar message',
        'bar gets correct message'
    );
};

QUnit.test('all multi statuses', function (assert) {
    this.$all.inputGroup({
        error: { foo: 'foo message' },
        success: { bar: 'bar message' }
    });
    testMultiStatuses.call(this, assert);
});

QUnit.test('all multi statuses grouped by input names', function (assert) {
    this.$all.inputGroup({
        foo: { error: 'foo message' },
        bar: { success: 'bar message' }
    });
    testMultiStatuses.call(this, assert);
});

QUnit.test('custom html tags and classes', function (assert) {
    $.inputGroupConfig({
        classes: {
            feedback: 'custom-feedback',
            error: 'custom-error'
        },

        icons: {
            error: '<div class="custom-icon">'
        },

        feedback: {
            error: '<div class="custom-feedback">'
        }
    });
    this.$foo.inputGroup({ error: 'message' });
    assert.ok(this.$foo.hasClass('custom-feedback'), 'has custom feedback class');
    assert.ok(this.$foo.hasClass('custom-error'), 'has custom error class');
    assert.ok(
        this.$foo.find('div[data-input-group-feedback]')
            .hasClass('custom-feedback'),
        'has custom feedback block'
    );
    assert.ok(
        this.$foo.find('div[data-input-group-feedback-icon]')
            .hasClass('custom-icon'),
        'has custom feedback icon'
    );
});

QUnit.test('inputGroupClear', function (assert) {
    this.$all.inputGroup({ error: 'message' });
    this.$all.inputGroupClear();
    assert.ok(!this.$all.hasClass('custom-feedback'), 'no custom feedback class');
    assert.ok(!this.$all.hasClass('custom-error'), 'no custom error class');
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').length, 0,
        'has no custom feedback block'
    );
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback-icon]').length, 0,
        'has no custom feedback icon'
    );
});

QUnit.test('array of messages', function (assert) {
    this.$foo.inputGroup({ error: ['a', 'b'] });
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').html(),
        '<ul><li>a</li><li>b</li></ul>',
        'renders array of messages as unordered list'
    );
});

QUnit.test('array of length 1 messages', function (assert) {
    this.$foo.inputGroup({ error: ['a'] });
    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').html(),
        'a',
        'renders without unordered list'
    );
});

QUnit.test('inputGroupValues', function (assert) {
    assert.deepEqual(
        this.$inputTypes.inputGroupValues(),
        this.expectedInputTypeValues
    );
});

QUnit.test('validate validates on blur', function (assert) {
    var $input = this.$foo.find('input');

    this.$foo.inputGroup({
        validate: function (values) {
            return { error: 'message' };
        }
    });

    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').length, 0,
        'no feedback initially rendered'
    );

    $input.blur();

    assert.strictEqual(
        this.$foo.find('[data-input-group-feedback]').length, 1,
        'feedback on blur'
    );
});

QUnit.test('validate passes values', function (assert) {
    var done = assert.async();
    var self = this;
    this.$inputTypes.inputGroup({
        validate: function (values) {
            assert.deepEqual(values, self.expectedInputTypeValues);
            done();
        }
    });
    this.$inputTypes.find('textarea').blur();
});

QUnit.test('validate passes blurred element', function (assert) {
    var done = assert.async();
    var self = this;
    this.$inputTypes.inputGroup({
        validate: function (values, $blurredElem) {
            assert.strictEqual($blurredElem.attr('name'), 'textarea');
            done();
        }
    });
    this.$inputTypes.find('textarea').blur();
});