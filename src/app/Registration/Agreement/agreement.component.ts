import {
  Component,
  OnInit,
} from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { environment } from "../../../environments/environment";

@Component({
  selector: "agreement",
  templateUrl: "./agreement.component.html",
  styleUrls: ["./agreement.component.css"],
})
export class AgreementComponent implements OnInit {

  constructor(
    public _bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }
}
