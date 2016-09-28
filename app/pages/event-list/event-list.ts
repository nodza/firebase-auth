import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventDetailPage } from '../event-detail/event-detail';
import { EventData } from '../../providers/event-data/event-data';

/*
  Generated class for the EventListPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/event-list/event-list.html',
  providers: [EventData]
})
export class EventListPage {

  private eventList: any;

  constructor(private navCtrl: NavController, private eventData: EventData) {

    this.navCtrl = navCtrl;
    this.eventData = eventData;

    this.eventData.getEventList().on('value', snapshot => {
      let rawList = [];
      snapshot.forEach( snap => {
        rawList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date
        });
      });
      this.eventList = rawList;
    });

  }

  goToEventDetail(eventDetail){
    this.navCtrl.push(EventDetailPage, {
      eventDetail: eventDetail,
    });
  }

}
