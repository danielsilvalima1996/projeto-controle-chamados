import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.css']
})
export class TestingComponent implements OnInit {

  testingForm: FormGroup = this.fb.group({
    data: ['', []],
    juros: ['', []],
    total: ['', []]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.controls.data.valueChanges.subscribe((data) => {
      console.log(data);
      

    })

  }

  get controls() {
    return this.testingForm.controls;
  }

}
