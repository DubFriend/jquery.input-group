QUnit.module('main', {
    setup: function () {
        this.$fixture = $('#qunit-fixture');
        this.$fixture.html($('#template').html());
        this.$foo = this.$fixture.find('[data-foo]');
        this.$bar = this.$fixture.find('[data-bar]');
        this.$all = this.$fixture.find('[data-input]');
    }
});

var buildStatusTests = function (assert, $elem, statusType, fig) {
    var $inputGroup = $elem.children().last();
    $elem.inputGroup(fig);
    assert.ok($elem.hasClass('has-feedback'), 'has feedback class');
    assert.ok($elem.hasClass('has-' + statusType), 'has error class');
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

QUnit.test('all multi statuses', function (assert) {
    this.$all.inputGroup({
        error: { foo: 'foo message' },
        success: { bar: 'bar message' }
    });
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