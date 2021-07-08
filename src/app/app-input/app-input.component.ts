import {Component, Input, OnInit} from '@angular/core';
import {RenderService} from "../../services/render.service";
import {Element} from "../../models/element";

@Component({
  selector: 'app-app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.css']
})
export class AppInputComponent {
  @Input() textToRender: string = '';
  compiledHtmlElems: Element[] = [];

  constructor(private renderService: RenderService) {
  }

  changeModel(changes: any) {
    this.compiledHtmlElems = this.renderService.renderInput(changes);
  }
}
