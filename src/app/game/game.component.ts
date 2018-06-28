import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Socket } from 'ng-socket-io';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor(private _httpService:HttpService ,private _socket:Socket,private _route:Router) {

    
   }
  currentUser;
  table=[];
  hand;
  ngOnInit() {
   
    let obs = this._httpService.isLogged();
    obs.subscribe(data=>{
      console.log('in game comp',JSON.parse(data['_body']).user)
      this.currentUser=JSON.parse(data['_body']).user
      // this.currentUser=JSON.parse(data['_body']).user['first_name']
      console.log("the user in game",this.currentUser)
      this._socket.emit('new_game',this.currentUser)

      this._socket.on('load_user',function(user){
        
        // console.log("printing user name",user.first_name)
        console.log("printing user hand",user.hand)
        this.hand=user.hand;
        console.log("the user in game after the socket update",this.hand)

        // console.log("printing currentUser hand",this.currentUser)


    })

      
      
    })
    
  }
  

}
