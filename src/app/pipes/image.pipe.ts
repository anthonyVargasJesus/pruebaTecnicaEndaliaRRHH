import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  _imagesURL: string = 'assets/images/employees/';

  transform(image: string): any {
    return this._imagesURL + image + '.jpg';
  }

}
