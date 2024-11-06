import { inject, Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Alert } from "../common/interfaces/alert.interface";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  message = inject(MessageService);

  call(severity: string, summary: string, detail: string): void {
    this.message.add({ severity, summary, detail });
  }
}
