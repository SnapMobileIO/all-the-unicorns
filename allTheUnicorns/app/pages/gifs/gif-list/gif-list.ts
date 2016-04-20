import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {GifDetailsPage} from '../gif-details/gif-details';
import {GifSearch} from '../../search/gif-search.service';


@Page({
	selector: 'GifListPage',
  templateUrl: 'build/pages/gifs/gif-list/gif-list.html',
  providers: [GifSearch]
})

export class GifListPage {
	viewing: string;
	selectedGif: any;
	numScrollRequests: number;
	searchParameter: string;
	searchbar: any;
	numImages: number = 100;

	constructor(private nav: NavController, navParams: NavParams, private _gifSearch: GifSearch) {
		this.displayGifs();
	}

	displayGifs() {
		if (this.viewing === 'trending') {
			this._gifSearch.getTrendingGifs(0, this.numImages)
		} else { 
			this._gifSearch.getSearchResults('unicorns', 0, this.numImages)
		}
	}

	doInfinite(infiniteScroll) {
		this._gifSearch.scrolling = true;
		this.numScrollRequests ? this.numScrollRequests += 1 : this.numScrollRequests = 1;

		if ((this.numScrollRequests * this.numImages) >= this._gifSearch.searchLimit) {
			this.numScrollRequests = 0;
		}

		switch (this.viewing) {
			case 'unicorns':
				this._gifSearch.getSearchResults('unicorns', (this.numScrollRequests * this.numImages), this.numImages);
				break;
			case 'search':
				this._gifSearch.getSearchResults(this.searchbar.value, (this.numScrollRequests * this.numImages), this.numImages);
				break;
			case 'trending':
				this._gifSearch.getTrendingGifs((this.numScrollRequests * this.numImages), this.numImages);
				break;
			default:
				this._gifSearch.getSearchResults('unicorns', (this.numScrollRequests * this.numImages), this.numImages);
				break;
		}

		infiniteScroll.complete();
  }

	handleSearchbarSearch(searchbar) {
		this.viewing = 'search';
		this.numScrollRequests = 0;
		this.searchbar = searchbar;
		this._gifSearch.getSearchResults(this.searchbar.value, 0, this.numImages);
	}

	handleClickTrending(event) {
		this.viewing = 'trending'
		this.numScrollRequests = 0;
		this._gifSearch.getTrendingGifs(0, this.numImages);
	}

	handleGifTapped(event, gif) {
		this.selectedGif = gif;
		this.nav.push(GifDetailsPage, { gif: gif });
	}
}

