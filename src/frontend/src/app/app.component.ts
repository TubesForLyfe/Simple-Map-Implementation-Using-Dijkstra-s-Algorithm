import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { range } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  map_list = [];
  src_map_list = [];
  dest_map_list = [];
  weight_map_list = [];

  choosen_src = "";
  choosen_dest = "";
  map_result = [];
  weight_result = [];
  distance_result = 0;
  iteration_result = 0;
  time_result = 0;
  map_message = "";
  constructor(private http: HttpClient) {}

  refresh() {
    this.map_list = [];
    this.src_map_list = [];
    this.dest_map_list = [];
    this.weight_map_list = [];

    this.choosen_src = "";
    this.choosen_dest = "";
    this.map_result = [];
    this.weight_result = [];
    this.distance_result = 0;
    this.iteration_result = 0;
    this.time_result = 0;
    this.map_message = "";
  }

  uploadFile(event: any) {
    this.refresh();
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.http.post('http://127.0.0.1:8000/create-map/', {
          map: reader.result
        }).subscribe((response: any) => {
          this.map_list = response.data;
          for (let i = 0; i < this.map_list.length; i++) {
            this.src_map_list.push(this.map_list[i]["src"]);
            this.dest_map_list.push(this.map_list[i]["dest"]);
            this.weight_map_list.push(this.map_list[i]["weight"]);
          }
        })
      }
      reader.onerror = () => {
        console.log('File error', reader.error);
      }
    }
  }

  chooseSrc(choice: any) {
    this.choosen_src = choice.src_maps;
  }

  chooseDest(choice: any) {
    this.choosen_dest = choice.dest_maps;
  }

  refreshResult() {
    this.map_result = [];
    this.weight_result = [];
    this.distance_result = 0;
    this.iteration_result = 0;
    this.time_result = 0;
    this.map_message = "";
  }

  showMap() {
    this.refreshResult();
    this.http.post('http://127.0.0.1:8000/show-map/', {
      src: this.choosen_src,
      dest: this.choosen_dest,
      map: this.map_list
    }).subscribe((response: any) => {
      if (response.data) {
        this.distance_result = response.data[0];
        response.data.shift();
        this.map_result = response.data;
        this.weight_result = response.weight;
        this.time_result = response.time;
        this.iteration_result = response.iteration;
      } else {
        this.map_message = response.message;
      }
    })
  }

  getIdx(e: any, arr: any) {
    let i;
    for (i = 0; i < arr.length - 1; i++) {
      if (arr[i] == e) {
        return i;
      }
    }
    return i;
  }

  showWeight(idx: any) {
    return this.weight_result[idx];
  }
}
