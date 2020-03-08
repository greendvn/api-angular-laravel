import { Component, OnInit } from '@angular/core';
import {Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.css']
})
export class InputSearchComponent implements OnInit {
  @Output() key = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  search(event){
    let key = event.target.value;
    this.key.emit(key);
  }

}
