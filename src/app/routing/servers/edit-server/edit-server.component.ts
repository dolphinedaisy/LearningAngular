import { Component, OnInit } from '@angular/core';
import {ServersService} from "../servers.service";
import {ActivatedRoute, Route, Params} from "@angular/router";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {

  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';

  allowEdit = false;

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    console.log("queryParams");
    console.log(this.activatedRoute.snapshot.queryParams);

    console.log("fragment");
    console.log(this.activatedRoute.snapshot.fragment);

    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.allowEdit = params['allowEdit'] === '1' ? true : false;
    });

    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }


}