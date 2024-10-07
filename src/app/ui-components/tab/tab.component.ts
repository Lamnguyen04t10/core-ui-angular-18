import { AfterContentInit, ChangeDetectorRef, Component, ContentChildren, forwardRef, Input, OnInit, QueryList } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Tab } from './types';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from './components/tab-item/tab-item.component';

@Component({
  selector: 'rfr-tab',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabComponent),
      multi: true
    }
  ]
})
export class TabComponent implements OnInit, ControlValueAccessor {
  @ContentChildren(TabItemComponent) tabItems!: QueryList<TabItemComponent>;

  @Input() tabs: Tab[] = [];
  private _value: any;

  value: any;

  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setDefaultActiveTab();
  }

  writeValue(value: any): void {
    this._value = value;
    this.value = value;
    this.updateActiveTab();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // Handle the disabled state if necessary
  }

  selectTab(tab: TabItemComponent, detectChange: boolean = true) {
    this.tabItems?.toArray()?.forEach(t => t.active = false);
    tab.active = true;
    this._value = tab.value;
    this.onChange(this._value);
    this.onTouched();

    if (detectChange) {
      this.cdr.detectChanges();
    }
  }

  private setDefaultActiveTab() {
    const activeTabs = this.tabItems?.filter(tab => tab.active);
    if (activeTabs) {
      if (activeTabs.length === 0 && this.tabItems.length > 0) {
        this.selectTab(this.tabItems.first, false);
        this.cdr.detectChanges();  // Ensure initial change detection
      }
    }
  }

  private updateActiveTab() {
    if (this.tabItems) {
      this.tabItems.forEach(tab => {
        tab.active = (tab.value === this._value);
      });
      this.cdr.detectChanges();
    }
  }
}
