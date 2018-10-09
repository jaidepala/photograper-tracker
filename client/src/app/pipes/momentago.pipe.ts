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

        if( daysDifference )
        {
            if( daysDifference < 2 ) {
                var addS = '';

                if( daysDifference > 1 )
                    addS += 's';

                msg = daysDifference + ' day'+ addS +' ago.' ;
            }
            else {

                var theDate = new Date( parseInt( thatDate ) );

                msg = theDate.toDateString();
            }
        }
        else {

            if( hoursDifference ) {
                var addS = '';

                if( hoursDifference > 1 )
                    addS += 's';

            	msg = hoursDifference + ' hour'+ addS +' ago.' ;
            }
            else if( minutesDifference ) {
                var addS = '';

                if( minutesDifference > 1 )
                    addS += 's';

            	msg = minutesDifference + ' minute'+ addS +' ago.' ;
            }
            else if( secondsDifference ) {
                var addS = '';

                if( secondsDifference > 1 )
                    addS += 's';

                msg = secondsDifference + ' second'+ addS +' ago.' ;
            }
            else {
            	msg = 'few moments ago.' ;
            }
        }

		return msg;
	};

}
