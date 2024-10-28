import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Alert } from "../common/interfaces/alert.interface";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(private message: MessageService) {}

  call(severity: string, summary: string, detail: string): void {
    console.log(`INCOMING`, { severity, summary, detail });
    this.message.add({ severity, summary, detail });
  }
}
