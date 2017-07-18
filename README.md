# MultiSelect
Transform a select tag into a MultiSelect, which lets choose multiple options

## Online demo
[here](https://htmlpreview.github.io/?https://github.com/GerardRodes/MultiSelect/blob/master/index.html)

## Usage
1. Import the script  
2. Execute the code

```html
<script type="text/javascript" src="MultiSelect.min.js"></script>
<script type="text/javascript">

  var selects = document.getElementsByTagName('select')
  forEach(selects, function (node) {
    new MultiSelect(node, 'Selecciona una opció')
  });

</script>
```

## Parameters  
MultiSelect(element, defaultOption)  
**element**: Select element  
**defaultOption**: Text for the default option, by default it's "Choose an option"  

to get the value you can do it form the attribute `value` from the created instance or a input element created inside the wrapper:
```html
  <input type="hidden" name="multiselect-{name of you select}" value="value1;value2;value3">
```

You can initilize the Multi Select to some values adding the attribute `data-init-value` to the `select` element.
```html
<select data-init-values="14;8;9">
.
.
.
```
