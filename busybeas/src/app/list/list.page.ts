import { Component, OnInit } from '@angular/core';
import { ClientService } from '../providers/client.service';
import { Route, Router } from '@angular/router';
import { UserModel } from '../models/user-model';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private selectedItem: any;

  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor(private clientService: ClientService,
              private router: Router) {

  }

  ngOnInit() {
  }

  getClients() {
    return this.clientService.clientList;
  }

  openProfile(client: UserModel) {
    this.router.navigateByUrl('/client-details', {queryParams:client })
  }
}
