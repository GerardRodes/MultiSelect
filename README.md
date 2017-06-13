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
