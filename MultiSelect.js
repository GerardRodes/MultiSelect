function Display(value, text, multiSelect){
  var displayItem = this
  this.value = value
  this.text = text
  this.multiSelect = multiSelect
  this.element = createElement('div', {class: 'item-display'})
  this.text = createElement('span', {class: 'item-text', innerText: text})
  this.input = createElement('input', {type: 'hidden', readonly: 'readonly', value: value})
  this.buttonRemove = createElement('button', {class:'remove-value', innerHTML: '-'})

  this.element.appendChild(this.text)
  this.element.appendChild(this.input)
  this.element.appendChild(this.buttonRemove)

  this.buttonRemove.onclick = function(e){
    displayItem.multiSelect.removeValue(displayItem.value)
  }
}

function MultiSelect(element, defaultOption){
  this.selectedOption = function(){
    return multiSelect.element.children[ multiSelect.element.selectedIndex ]
  }

  this.addValue = function(option){
    var value = option.value ? option.value : option
    if (multiSelect.selectedValues.indexOf(value) == -1) {
      var exists = false
      multiSelect.options.forEach(function(validOption){
        if (validOption.value == value) {
          exists = true
        }
      })
      if (exists) {
        multiSelect.selectedValues.push(value)
      }
    }
    multiSelect.update()
  }

  this.removeValue = function(option){
    var value = option.value ? option.value : option,
        valueIndex = this.selectedValues.indexOf(value)
    if (valueIndex != -1) {
      this.selectedValues.splice(valueIndex, 1)
    }
    multiSelect.update()
  }

  this.update = function(){
    multiSelect.options.forEach(function(option){
      var filteredChildsOptions = multiSelect.getChildrenOptions(function(childOption){ return childOption.value == option.value }),
          filteredChildsDisplay = []

      multiSelect.displayItems.forEach(function(display, index){
        if(display.value == option.value) {
          filteredChildsDisplay.push(display)
        }
      })

      if (multiSelect.selectedValues.indexOf(option.value) == -1) {
        //Not selected
        if (filteredChildsOptions.length == 0) {
          //Option doesn't exist on dom
          multiSelect.element.appendChild(option)

          var currentIndex = multiSelect.element.children.length - 1,
              originalIndex = multiSelect.options.indexOf(option) + 1
          //position the option in his original position
          multiSelect.element.insertBefore(multiSelect.element.children[currentIndex], multiSelect.element.children[originalIndex])
        }
        if (filteredChildsDisplay.length > 0){
          //remove from multiSelect.displayItems
          var index = multiSelect.displayItems.indexOf(filteredChildsDisplay[0])
          multiSelect.displayItems.splice(index, 1)
          //Display item exists on dom
          multiSelect.display.removeChild(filteredChildsDisplay[0].element)
        }
      } else {
        //Selected
        if (filteredChildsOptions.length > 0) {
          //Option exists on dom
          multiSelect.element.removeChild(filteredChildsOptions[0])
        }
        if (filteredChildsDisplay.length == 0){
          //Display item doesn't exists on dom
          var displayItem = multiSelect.getDisplayItem(option.value)
          if (!displayItem) {
            displayItem = new Display(option.value, (option.innerText ? option.innerText : option.innerHTML) , multiSelect)
            multiSelect.displayItems.push(displayItem)
          }
          multiSelect.display.appendChild(displayItem.element)
        }
      }
    })

    multiSelect.value = multiSelect.selectedValues.join(';')
    multiSelect.output.value = multiSelect.value
    multiSelect.element.selectedIndex = 0
  }

  this.getChildrenOptions = function(filter){
    return filterChilds(this.element, filter)
  }

  this.getChildrenDisplay = function(filter){
    return filterChilds(this.display, filter)
  }

  this.getDisplayItem = function(value){
    for (var i = 0; i < multiSelect.displayItems.length; i++) {
      if (multiSelect.displayItems[i].value == value) {
        return multiSelect.displayItems[i]
      }
    }
    return false
  }

  var multiSelect = this
  this.element = element
  this.created = new Date()
  this.id      = 'multiselect-' + (this.element.getAttribute('name') ? this.element.getAttribute('name') : this.element.getAttribute('id'))
  this.wrapper = createElement('div', {class:'wrapper-multiselect', id: this.id + '-output'})
  this.display = createElement('div', {class:'display'})
  this.output = createElement('input', {type:'hidden', name:this.id})
  this.selectWrapper = createElement('div', {class:'wrapper-select'})
  this.buttonAdd = createElement('button', {class:'add-value', innerHTML: '+'})
  this.selectedValues = []
  this.options = this.getChildrenOptions()
  this.displayItems = []

  this.element.parentNode.insertBefore(this.wrapper, this.element)
  this.selectWrapper.appendChild(this.element)
  this.selectWrapper.appendChild(this.buttonAdd)
  this.wrapper.appendChild(this.output)
  this.wrapper.appendChild(this.display)
  this.wrapper.appendChild(this.selectWrapper)
  this.element.insertBefore(
    createElement('option',{innerText: defaultOption ? defaultOption : 'Choose an option', value: ''}),
    this.element.children[0]
  )
  this.value = ''


  this.buttonAdd.onclick = function(e){
    var selectedOption = multiSelect.selectedOption()
    if (selectedOption.value && selectedOption.value != '') {
      multiSelect.addValue(selectedOption.value)
    }
  }

  this.element.selectedIndex = 0
}


function createElement(tag, attributes, callback) {
  var element = document.createElement(tag)
  if (attributes) {
    for (var attr in attributes) {
      if (attributes.hasOwnProperty(attr)) {
        element[attr] !== undefined ? element[attr] = attributes[attr] : element.setAttribute(attr, attributes[attr])
      }
    }
  }

  if (typeof attributes == 'function') {
    attributes(element)
  } else if (typeof callback == 'function') {
    callback(element)
  }

  return element
}

function forEach(list, callback){
  return Array.prototype.forEach.call(list, callback)
}

function filterChilds(parent, filter){
  var childs = []
  forEach(parent.children, function(child){
    var tagName = child.tagName.toLowerCase()
    if (tagName == 'option') {
      if (filter && typeof filter == 'function') {
        if (filter(child)) {
          childs.push(child)
        }
      } else {
        childs.push(child) 
      }
    }
  })
  return childs
}

Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) {
    var a;
    if (null == this) throw new TypeError('"this" is null or not defined');
    var c = Object(this),
        b = c.length >>> 0;
    if (0 === b) return -1;
    a = +e || 0;
    Infinity === Math.abs(a) && (a = 0);
    if (a >= b) return -1;
    for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) {
        if (a in c && c[a] === d) return a;
        a++
    }
    return -1
});