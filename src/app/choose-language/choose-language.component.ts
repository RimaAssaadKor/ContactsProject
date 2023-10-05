import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-choose-language',
  templateUrl: './choose-language.component.html',
  styleUrls: ['./choose-language.component.css']
})
export class ChooseLanguageComponent {
  availableLangs: string[] = ['en', 'de'];
  public selectedLang :string ='en'
  constructor( public translocoService : TranslocoService) {}

  changeLanguage(selectedLang: string) {
    this.translocoService.setActiveLang(selectedLang);
    console.log("selectedLang" ,selectedLang)
  }
}
