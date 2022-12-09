import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UsuarioService } from '../usuario.service';
import { environment } from '../../../environments/environment';
// import { Crypt } from '../../utils/crypt';

const URL = environment.UrlService;
const IMAGE = URL + '/image/';

@Injectable({providedIn: 'root'})
export class ImagePostService {

    constructor(private http: HttpClient,
                private usuarioService: UsuarioService) {
        this.usuarioService.usuario$.subscribe(user => this.id = user.id);
    }

    private id: string;

    public setImageUpload(file: File): Observable<HttpEvent<any>> {

        const formData: FormData = new FormData();
        formData.append('file', file);
        // formData.append('id',new Crypt().encrypt(this.id));

        const req = new HttpRequest('POST', IMAGE, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }
}
