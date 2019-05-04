import { HttpResponse } from '@angular/common/http';

export class HttpAdapter {
  static baseAdapter(res: any, adapterFn?: Function): any {
    try {
      let jsonRes = res.json();
      return adapterFn ? adapterFn.call(undefined, jsonRes) : jsonRes;
    } catch (e) {
      return res;
    }
  }
}
