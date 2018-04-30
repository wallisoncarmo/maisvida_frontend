import { EspecialidadeDTO } from './../../models/especialidade.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class EspecialidadeService{

    constructor(public http:HttpClient){}

    findAll() : Observable<EspecialidadeDTO[]> {
        return this.http.get<EspecialidadeDTO[]>(`${API_CONFIG.baseUrl}/especialidades`);
    }
}