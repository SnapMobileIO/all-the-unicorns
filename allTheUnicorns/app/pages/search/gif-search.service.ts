import {Page, NavController, NavParams} from 'ionic-angular';
import {URLSearchParams, Http, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
import {Datum} from './giphyData.interface'

@Injectable()
export class GifSearch {
	gifs: Datum[];
	display: string;
	scrolling: boolean = false;
	searchLimit: number;

	constructor(private http: Http) {}

	getSearchResults(searchTerms, offset, limit) {
		this.display = searchTerms;
		let params: URLSearchParams = new URLSearchParams();

		params.set('q', `${searchTerms}`);
		params.set('api_key', 'dc6zaTOxFJmzC');
		params.set('offset', `${offset}`);
		params.set('limit', `${limit}`);

		this._makeRequest('search', params)
	}

	getTrendingGifs(offset, limit) {
		this.display = 'Trending'
		let params: URLSearchParams = new URLSearchParams();

		params.set('api_key', 'dc6zaTOxFJmzC');
		params.set('offset', `${offset}`);
		params.set('limit', `${limit}`);

		this._makeRequest('trending', params)
	}

	_makeRequest(endPoint, params: URLSearchParams) {
		this.http.get(`http://api.giphy.com/v1/gifs/${endPoint}?`, { search: params })
			.map((res: Response) => res.json())
			.subscribe(
				data => { 
					if (this.scrolling === false) {
						this.gifs = data.data;
						this.searchLimit = parseInt(data.pagination.total_count)
					} else {
						data.data.forEach(d => this.gifs.push(d))
						this.scrolling = false;
					}
				},
				err => console.error(err),
				() => console.log('done')
			);		
	}
}