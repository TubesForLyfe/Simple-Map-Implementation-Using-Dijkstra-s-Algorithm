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
            if (!this.isIn(this.map_list[i]["src"], this.src_map_list)) {
              this.src_map_list.push(this.map_list[i]["src"]);
            }
            if (!this.isIn(this.map_list[i]["dest"], this.dest_map_list)) {
              this.dest_map_list.push(this.map_list[i]["dest"]);
            }
          }
        })
      }
      reader.onerror = () => {
        console.log('File error', reader.error);
      }
    }
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
