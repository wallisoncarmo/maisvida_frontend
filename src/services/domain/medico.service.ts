import { MedicoDTO } from './../../models/medico.dto';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../../config/api.config";
import { Observable } from "rxjs/Rx";

@Injectable()
export class MedicoService {

    constructor(public http: HttpClient) { }

    findById(id: string): Observable<MedicoDTO> {
        return this.http.get<MedicoDTO>(`${API_CONFIG.baseUrl}/medicos/${id}`);
    }

    findAll(especialidade_id: string,page:number=0,linesPerPage:number=24): Observable<MedicoDTO[]> {
        return this.http.get<MedicoDTO[]>(`${API_CONFIG.baseUrl}/medicos/page?especialidade=${especialidade_id}&page=${page}&linesPerPage=${linesPerPage}`);
    }

    insert(obj: MedicoDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/medicos`,
            obj, {
                observe: 'response',
                responseType: 'text'
            }
        );
    }

    update(obj: MedicoDTO) {
        return this.http.put(
            `${API_CONFIG.baseUrl}/medicos/${obj.id}`,
            obj, {
                observe: 'response',
                responseType: 'text'
            }
        );
    }
    
    delete(id: string) {
        return this.http.delete(`${API_CONFIG.baseUrl}/clientes/${id}`);
    }

}