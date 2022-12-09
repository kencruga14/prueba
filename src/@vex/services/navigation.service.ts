import { Injectable } from '@angular/core';
import { NavigationDropdown, NavigationItem, NavigationLink, NavigationSubheading } from '../interfaces/navigation-item.interface';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { environment } from '../../environments/environment';

const httpconf = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class NavigationService {

  items: NavigationItem[] = [];

  private _openChangeSubject = new Subject<NavigationDropdown>();
  openChange$ = this._openChangeSubject.asObservable();

  constructor(private http: HttpClient) { 
  }

  triggerOpenChange(item: NavigationDropdown) {
    this._openChangeSubject.next(item);
  }

  isLink(item: NavigationItem): item is NavigationLink {
    return item.type === 'link';
  }

  isDropdown(item: NavigationItem): item is NavigationDropdown {
    return item.type === 'dropdown';
  }

  isSubheading(item: NavigationItem): item is NavigationSubheading {
    return item.type === 'subheading';
  }

  findDataUser(user: String) {
    let menuItems
    return this.http.get(environment.menu + user + '/pf01', httpconf).pipe(
      map(
        (res: any) => {
          if (res.opciones) {
            menuItems = Array.from(
              new Set(res.opciones.map(x => x.opcion))
            ).map(datos => {
              return {
                type: "link",
                label: res.opciones.find(s => s.opcion === datos).opcion,
                route: res.opciones.find(s => s.opcion === datos).url,
                icon: res.opciones.find(s => s.opcion === datos).icono,
              };
            });

          }
          localStorage.setItem('menu', JSON.stringify(menuItems));
          return menuItems;
        },
        error => {
          console.log('Error: ', error);
        }
      )
    );
  }



}
