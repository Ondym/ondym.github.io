function createLabel(forAttribute, text) {
  let label = document.createElement('label');
  label.setAttribute('for', forAttribute);
  label.textContent = text;
  return label;
}

function createInput(type, id, name, placeholder, required) {
  let input = document.createElement('input');
  input.setAttribute('type', type);
  input.setAttribute('id', id);
  input.setAttribute('name', name);
  input.setAttribute('placeholder', placeholder);
  if (required) {
    input.setAttribute('required', true);
  }
  return input;
}

function createSelect(id, name, required, options) {
  let select = document.createElement('select');
  select.setAttribute('id', id);
  select.setAttribute('name', name);
  if (required) {
    select.setAttribute('required', true);
  }
  options.forEach(option => {
    let optionElement = document.createElement('option');
    optionElement.setAttribute('value', option.value);
    optionElement.textContent = option.text;
    if (option.disabled) {
      optionElement.setAttribute('disabled', true);
    }
    if (option.selected) {
      optionElement.setAttribute('selected', true);
    }
    select.appendChild(optionElement);
  });
  return select;
}

function createMultipleChoice(radioParams, name, type) { //, id, name, value, text, required
  let radios = document.createElement("div");
  // console.log(radioParams);
  radios.className = "radiosWrapper";
  radioParams.forEach(r => {
    let radioWrapper = createLabel(r.id);
    radioWrapper.className = "radioLabel";
    let radio = document.createElement('input');
    radio.setAttribute('type', type);
    radio.setAttribute('id', r.id);
    radio.setAttribute('name', name);
    radio.setAttribute('value', r.value);
    if (r.required) {
      radio.setAttribute('required', true);
    }
    radioWrapper.appendChild(radio);
    let radioText = document.createElement("span");
    radioText.innerText = r.text;
    radioWrapper.appendChild(radioText);
    radios.appendChild(radioWrapper);
  });
  return radios;
}

function createCheckbox(id, name, value, label) {
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.setAttribute('id', id);
  checkbox.setAttribute('name', name);
  checkbox.setAttribute('value', value);

  const checkboxLabel = document.createElement('label');
  checkboxLabel.setAttribute('for', id);
  checkboxLabel.textContent = label;

  const container = document.createElement('div');
  container.appendChild(checkbox);
  container.appendChild(checkboxLabel);

  return container;
}

function createOption(id, value, text) {
  return { id, value, text };
}