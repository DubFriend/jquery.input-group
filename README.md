#jquery.input-group

Adds validation and statuses to structured form groups, compatible with
Bootstrap form inputs.

install with bower
`bower install jquery.input-group`

or npm
`npm install jquery.input-group`

jquery.input-group needs a certain html structure minimally as follows
```xml
<group>
    <inputGroup>
        <input>
    </inputGroup>
</group>
```

jquery.input-group adds feedback classes and messages to this structure.
```xml
<group class="feedback-class feedback-type-class">
    <inputGroup>
        <input/>
        <feedbackIcon>
        <feedback>feedback message</feedback>
    </inputGroup>
</group>
```

Within this basic outline jquery.input-group aims to be as flexible as possible
allowing a wide range of structures, and is designed to work with Bootstrap
form groups

```html
<!-- twitter bootstrap form group example -->
<div class="form-group">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
        <input type="text"
               name="email"
               class="form-control"
               id="inputEmail3"
               placeholder="Email">
    </div>
</div>
```

here is an example of the previous bootstrap form group with jquery.input-group's
default error markup applied
```html
<div class="form-group has-feedback has-error">
    <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
    <div class="col-sm-10">
        <input type="text"
               name="email"
               class="form-control"
               id="inputEmail3"
               placeholder="Email">
        <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true">
        <span class="help-block">error message</span>
    </div>
</div>
```


##inputGroup
`error`, `warning`, or `success` markup and feedback message will be applied.
```javascript
$('.form-group').inputGroup({
    error: 'error message'
});

$('.form-group').inputGroup({
    warning: 'warning message'
});

$('.form-group').inputGroup({
    warning: 'warning message'
});

//if an array is passed, the message will be rendered as an unordered list.
$('.form-group').inputGroup({
    error: ['message A', 'message B']
});
```

`inputGroup` may be applied to more than one form group at once.  If this is
the case, then you may apply `error`, `warning`, or `success` markup as follows.
```javascript
$('.several-form-groups').inputGroup({
    error: { foo: 'error message for input group with input named "foo"' },
    success: { bar: 'success message for input group with input named "bar"' }
});
```
You may also format your statuses like this.
```javascript
$('.several-form-groups').inputGroup({
    foo: { error: 'error message for "foo" input' },
    bar: { success: 'success message for "bar" input' }
});
```

You may apply a status to a form group and omit a feedback message, by passing
`null` for the message value.
```javascript
$('.form-group').inputGroup({
    success: null
});
```
```javascript
$('.several-form-groups').inputGroup({
    success: { foo: null, bar: null }
});
```

`inputGroup` also takes a `validate` callback that will apply statuses on input
blur
```javascript
$('.form-group').inputGroup({
    validate: function (values, $blurredElement) {
        //validate should return a status object following the same format
        //detailed in the preceeding examples.
        if(!values.foo) {
            return { error: { foo: 'required' } };
        }
        else {
            return { success: { foo: null } };
        }
    }
});
```

##inputGroupClear
clears the select input groups of statuses
```javascript
$('.form-group').inputGroupClear();
```

##inputGroupValues
gets the values of named inputs of selected form groups.  `inputGroupValues`
is used by the validate callback to pass validate its values.  Radio input groups
return the value of checked radio inputs.  Checkbox input groups returns an
array of values of the values of checked checkboxes.
```javascript
$('.form-group').inputGroupValues();
```

##inputGroupConfig
`jquery.input-group` applies status markup compatible with bootstrap by default.
you may override this markup with your own custom markup.
```javascript
$.inputGroupConfig({
    classes: {
        feedback: 'custom-feedback',
        error: 'custom-error',
        warning: 'custom-warning',
        success: 'custom-success'
    },

    icons: {
        error: '<div class="custom-error-icon">',
        warning: '<div class="custom-warning-icon">',
        success: '<div class="custom-success-icon">'
    },

    feedback: {
        error: '<div class="custom-error-feedback">',
        warning: '<div class="custom-warning-feedback">',
        success: '<div class="custom-success-feedback">'
    }
});
```