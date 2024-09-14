import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgFor,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  StaffDetails: any[] = [];
  DetailsForm = new FormGroup({
    StaffId: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]*'),
      Validators.minLength(6),
      Validators.maxLength(6),
    ]),
  });
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}
  get StaffId() {
    return this.DetailsForm.get('StaffId');
  }

  public getStaffData() {
    const id = this.DetailsForm.value.StaffId;
    console.log(id);
    this.StaffDetails = [];

    this.http
      .get(`http://localhost:3000/Api/hallstaffDetails/${id}`)
      .subscribe((data: any) => {
        this.StaffDetails.push(data);
        console.log(this.StaffDetails);
      });
  }
}
