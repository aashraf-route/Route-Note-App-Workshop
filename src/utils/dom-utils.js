// /**
//  * Sum two numbers
//  * @param {number} a
//  * @param {number} b
//  * @example
//  * let a = 1;
//  * let b = 2;
//  * console.log(sum(a,b)) // 3
//  * @returns {number}
//  */
// export const sum = (a, b) => {};

/**
 * Add classes to element
 * @param {HTMLElement} element
 * @param {Array<string>} classList
 */
export const addClass = (element, classList) => {
  element.classList.add(...classList);
};

/**
 * Set multiple attrs at once
 * @param {HTMLElement} element
 * @param {Object} attributes
 */
export const setAttributes = (element, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

/**
 * Generate DOM Element based on options
 * @param {Object} options
 * @param {string} [options.tagName] element tag
 * @param {string | Array<string>} [options.classes]
 * @param {string} [options.html]
 * @param {string} [options.text]
 * @param {Object} [options.attributes]
 * @returns {HTMLElement}
 */
export const generateElement = function ({
  tagName = "div",
  classes = "",
  text = "",
  html = "",
  attributes = {},
}) {
  // 1- craete element
  const element = document.createElement(tagName);

  // 2- Assign classes
  if (classes) {
    const classList = Array.isArray(classes) ? classes : classes.split(" ");
    if (classList.length > 0) {
      addClass(element, classList);
    }
  }

  // 3- Set Text
  if (text) {
    element.textContent = text;
  }
  // 4- Set HTML
  if (html) {
    element.innerHTML = html;
  }

  // 5- Set Attributes

  if (Object.keys(attributes).length) {
    setAttributes(element, attributes);
  }

  return element;
};

const DomeUtils = {
  generateElement,
  addClass,
  setAttributes,
};

Object.freeze(DomeUtils);

export default DomeUtils;
