import { el } from 'redom';
import TomSelect from 'tom-select';
import './Select.scss';

class Select {
  constructor({
    options = {},
    placeholder = '',
    id = '',
    search = false,
    className = '',
    onChange = () => {},
    required = false
  }) {
    this.options = options;
    this.placeholder = placeholder;
    this.id = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    this.onChange = onChange;
    this.search = search;
    this.required = required;

    this.select = el('select', { 
      id: this.id,
      required: this.required
    });
    
    this.container = el(`div.select-container${'.' + className}`, this.select);

    this.updateOptions(this.options);

    this.tomSelectInstance = null;
  }

  onmount() {
    this.initTomSelect();
  }

  initTomSelect() {
    if (this.tomSelectInstance) {
      this.tomSelectInstance.destroy();
    }

    this.tomSelectInstance = new TomSelect(this.select, {
      placeholder: this.placeholder,
      searchField: this.search ? ['text'] : [],
      onChange: (value) => {
        this.onChange(value);
        const controlInput = this.container.querySelector('.ts-control input');
        controlInput?.remove();
      },
    });
  }

  updateOptions(newOptions) {
    this.options = newOptions;
    this.select.innerHTML = '';

    Object.entries(this.options).forEach(([value, text]) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = text;
      this.select.appendChild(option);
    });

    if (this.tomSelectInstance) {
      this.tomSelectInstance.clearOptions();
      this.tomSelectInstance.addOptions(
        Object.entries(this.options).map(([value, text]) => ({
          value,
          text,
        }))
      );
      this.tomSelectInstance.refreshOptions();
    }
  }

  get el() {
    return this.container;
  }

  get value() {
    return this.tomSelectInstance ? this.tomSelectInstance.getValue() : '';
  }

  set value(val) {
    if (this.tomSelectInstance) {
      this.tomSelectInstance.setValue(val);
    }
  }
}

export default Select;
