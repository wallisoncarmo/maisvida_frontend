import { CidadeDTO } from './cidade.dto';
import { EspecialidadeDTO } from "./especialidade.dto";

export interface MedicoDTO {
    id : string;
    first_name : string;
    last_name : string;
    lastName? : string;
    email : string;
    active : boolean;
    status : boolean;
    especialidade ? : EspecialidadeDTO;
    cidade ? : CidadeDTO;
}