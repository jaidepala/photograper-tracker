import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertLineBreak'
})
export class ConvertLineBreakPipe implements PipeTransform {

	transform(value: any, args ? : any): any {

		var lineBreak = value.replace(/(?:\r\n|\r|\n)/g, '<br>');

    	return lineBreak;
  	}

}
