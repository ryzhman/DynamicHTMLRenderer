import {Injectable} from '@angular/core';
import {Element, FieldType} from './../models/element';
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class RenderService {

  constructor(private sanitizer: DomSanitizer) {
  }

  /**
   * Renders the text input and prepares an array of Elements that contain ready to use HTML snippets
   * @param changes
   */
  renderInput(changes: any): Element[] {
    let parsedElements = this.parseInput(changes);
    const decoratedElems = this.renderElementsToHTML(parsedElements);
    // method to order elements based on grid position
    const sortedElems = this.sortElemsByPosition(decoratedElems);
    return sortedElems;
  }

  /**
   * Sorts an array of Elements based on the grid rules:
   *  - sorting of elements in one column first
   *  - then aligning elements in one raw
   * @param elements
   * @private
   */
  private sortElemsByPosition(elements: Element[]): Element[] {
    return elements.sort((elemA, elemB) => {
      return elemA.vertical - elemB.vertical + elemA.horizontal - elemB.horizontal;
    })

  }

  /**
   * Deserializes the text input into the model object
   * @param text
   * @private
   */
  private parseInput(text: string): Element[] {
    let lines = text.replace('"', '').split('\n');

    let elements: Element[] = [];
    for (let line of lines) {
      if (!line) {
        continue;
      }
      let properties = line.split(';');
      const elem: Element = {
        vertical: +properties[0],
        horizontal: +properties[1],
        label: properties[2],
        elementType: <FieldType><unknown>properties[3],
        options: properties[4],
        renderedHtml: ''
      };
      elements.push(elem);
    }
    return elements;
  }

  private getHtmlInputType(type: FieldType): string {
    return type === FieldType.TEXT_INPUT ? 'text' : 'select';
  }

  /**
   * Sets up a sanitized ready-to-use HTML as a property to Element based on the element attributes from the text input
   * @param parsedElements
   * @private
   */
  private renderElementsToHTML(parsedElements: Element[]): Element[] {
    for (let elem of parsedElements) {
      if (!elem?.horizontal || !elem?.vertical || !elem?.elementType) {
        continue;
      }
      if (elem.elementType === FieldType.TEXT_INPUT) {
        elem.renderedHtml = `<p>
                        <label for="${elem.label}">${elem.label}</label>
                        <input type="${this.getHtmlInputType(elem.elementType)}" name="${elem.label}"
                                placeholder="${elem.options}"/>
                        </p>`
      } else {
        let optionsForSelection = elem.options.split(',');
        elem.renderedHtml = `
            <p>
              <label for="${elem.label}">${elem.label}:</label>
              <select name="${elem.label}" id="${elem.label}">
                    ${(() => optionsForSelection.map((selection) => `
                        <option value="${selection}">${selection}</option>`).join('<br>'))()}
              </select>
            </p>`;
      }
    }
    return parsedElements.map((item) => {
      // sanitazing is required otherwise inputs are not rendered by Angular
      item.renderedHtml = this.sanitizer.bypassSecurityTrustHtml(item.renderedHtml);
      return item;
    });
  }
}
