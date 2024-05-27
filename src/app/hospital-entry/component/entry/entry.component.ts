import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ComServerService } from '../../../shared/services/com-server.service';

@Component({
  selector: 'app-entry',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent implements OnInit {
  entry: any[] = [];
  exit: any[] = [];
  userId!: number;
  stayId!: number;
  infoUser!: any[];

  constructor(private comServerService: ComServerService) {}

  ngOnInit(): void {
    this.getEntry();
    this.getExit();
  }

  getEntry() {
    this.comServerService
      .getData('entryStay')
      .subscribe((data: { entryStay: any[] }) => {
        if (data.entryStay && Array.isArray(data.entryStay)) {
          this.entry = data.entryStay;
        } else {
          console.error(
            'Invalid data format: entry property is missing or not an array'
          );
        }
      });
  }
  getExit() {
    this.comServerService
      .getData('exitStay')
      .subscribe((data: { exitStay: any[] }) => {
        if (data.exitStay && Array.isArray(data.exitStay)) {
          this.exit = data.exitStay;
        } else {
          console.error(
            'Invalid data format: exit property is missing or not an array'
          );
        }
      });
  }
  openModal(userId: number, stayId: number) {
    this.getInfoUser(userId, stayId);
  }

  getInfoUser(userId: number, stayId: number) {
    const url = `infoUser?userId=${userId}&stayId=${stayId}`;
    this.comServerService
      .getData(url)
      .subscribe((data: { infoUser: any[] }) => {
        if (data.infoUser && Array.isArray(data.infoUser)) {
          this.infoUser = data.infoUser;
        } else {
          console.error(
            'Invalid data format: user property is missing or not an array'
          );
        }
      });
  }
}
