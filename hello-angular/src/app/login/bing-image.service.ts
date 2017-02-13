import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Image } from '../domain/entities';

@Injectable()
export class BingImageService {

  imageUrl: string;
  headers = new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key': '63b3793626b14327830abb8cef0de7ae'
  });

  constructor(private http: Http) {
    const q = '火影忍者+桌面壁纸';
    const baseUrl: string = `https://api.cognitive.microsoft.com/bing/v5.0/images/search`;
    this.imageUrl = baseUrl + `?q=${q}&count=6&mkt=zh-CN&imageType=Photo&size=Large`;
  }

  getImageUrl(): Observable<Image[]>{
    return this.http.get(this.imageUrl, { headers: this.headers })
            .map(res => res.json().value as Image[])
            .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
  // yieldByInterval(items, time) {
  //   return Observable.from(items).zip(
  //     Observable.interval(time),
  //     (item, index) => item
  //   );
  // }
}
