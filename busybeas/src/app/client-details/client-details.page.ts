import { Component, OnInit } from '@angular/core';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.page.html',
  styleUrls: ['./client-details.page.scss'],
})
export class ClientDetailsPage implements OnInit {

  client: UserModel
  constructor(private activatedRoute: ActivatedRoute) { 
    this.client = new UserModel({
      id: activatedRoute.snapshot.params.id,
      email: activatedRoute.snapshot.params.email,
      firstName: activatedRoute.snapshot.params.firstName,
      lastName: activatedRoute.snapshot.params.lastName,
      isAdmin: activatedRoute.snapshot.params.isadmin
    })
  }

  ngOnInit() {
  }

}
