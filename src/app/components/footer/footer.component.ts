import { Component, Input, TemplateRef } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent  {
  @Input() customTemplate: TemplateRef<any>;
  test: Date = new Date();
  initial: string = "";
  version: string = environment.version;
}
