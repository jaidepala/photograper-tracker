import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'momentago'
})
export class MomentagoPipe implements PipeTransform {

	transform(thatDate: any, args ? : any): any {

		var thisDate = new Date().getTime();

		var difference = Math.abs(thatDate - thisDate);

        var daysDifference = Math.floor(difference/1000/60/60/24);
        difference -= daysDifference*1000*60*60*24

       	var hoursDifference = Math.floor(difference/1000/60/60);
        difference -= hoursDifference*1000*60*60

        var minutesDifference = Math.floor(difference/1000/60);
        difference -= minutesDifference*1000*60

        var secondsDifference = Math.floor(difference/1000);

        var msg = '';

        if( daysDifference ) {
        	msg = daysDifference + ' days ago.' ;
        }
        else if( hoursDifference ) {
        	msg = hoursDifference + ' hours ago.' ;
        }
        else if( minutesDifference ) {
        	msg = minutesDifference + ' minutes ago.' ;
        }
        else if( secondsDifference ) {
        	msg = secondsDifference + ' seconds ago.' ;
        }

		return msg;
	};

}
