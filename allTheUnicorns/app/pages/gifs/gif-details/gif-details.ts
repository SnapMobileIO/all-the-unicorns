import {Page, NavController, NavParams} from 'ionic-angular';


@Page({
  templateUrl: 'build/pages/gifs/gif-details/gif-details.html'
})

export class GifDetailsPage {
	selectedGif: any;

	constructor(private nav: NavController, navParams: NavParams) {
    this.selectedGif = navParams.get('gif');
  }
}