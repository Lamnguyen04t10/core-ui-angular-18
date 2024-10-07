import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { HeaderTextComponent } from './header-text/header-text.component';
import { TextComponent } from './text/text.component';
import { ButtonComponent } from './button/button.component';
import { TabComponent } from './tab/tab.component';
import { TabItemComponent } from './tab/components/tab-item/tab-item.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CardComponent,
    HeaderTextComponent,
    TextComponent,
    ButtonComponent,
    TabComponent,
    TabItemComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    SpinnerComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    CardComponent,
    HeaderTextComponent,
    TextComponent,
    ButtonComponent,
    TabComponent,
    TabItemComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    SpinnerComponent,
    FooterComponent,
    HeaderComponent
  ]
})
export class UiComponentsModule { }
