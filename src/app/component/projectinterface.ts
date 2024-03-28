import { Time } from "@angular/common";
import { Data } from "@angular/router";

export interface Projectinterface {
    "id": number,
    "name":string,
    "description":string,
    "status":string,
    "date":Data,
    "time":Time
}
