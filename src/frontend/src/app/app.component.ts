import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  constructor(private http: HttpClient) {}

  uploadFile(event: any) {
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

  showMap() {
    this.http.post('http://127.0.0.1:8000/show-map/', {
      src: this.choosen_src,
      dest: this.choosen_dest,
      map: this.map_list
    }).subscribe((response: any) => {

    })
  }

  isIn(elmt: any, list: any) {
    let i = 0;
    while (i < list.length) {
      if (elmt == list[i]) {
        return true;
      } else {
        i++;
      }
    }
    return false;
  }
}
