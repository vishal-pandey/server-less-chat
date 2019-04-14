import { Component, OnInit } from '@angular/core';
import {MainService} from '../../services/main.service';
declare var Peer: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  mypeerid:any;
  peer:any;
  remotePeerId:any;

  localconn:any;
  remoteconn:any;

  isConnected:boolean = false;

  remoteMessage:any = "";
  toggle:boolean = true;

  ngOnInit() {
  	this.peer = new Peer();
	var $this = this;

    this.peer.on('open', function(id) {
	  console.log('My peer ID is: ' + id);
	  $this.mypeerid = id;
	});
	this.peer.on('connection', function(conn) { 
		$this.isConnected = true;
		console.log(conn);
		$this.remoteconn = conn;
		$this.remotePeerId = $this.remoteconn.id;
		// $this.remoteconn.on('data', function(data) {
		// 	console.log('Received', data);
		// 	$this.remoteMessage = $this.remoteMessage;
		// })
		$this.remoteconn.on('data', (data)=>{
			$this.remoteMessage = data;
			console.log('Received', data);
			document.querySelector('.messageBox').innerHTML = data;
			// $this.receive(data)
		})
	});
	this.peer.on('data', function(data) {
		console.log('Received', data);
	})
  }

  connect(id){
  	console.log(id);
  	this.remoteconn = this.peer.connect(id);
  	console.log(this.remoteconn);

  	var $this = this;

  	this.remoteconn.on('open', function() {
	  // Receive messages
	  $this.isConnected = true;
	  $this.remotePeerId = $this.remoteconn.id;
	  // $this.remoteconn.on('data', function(data) {
	  //   console.log('Received', data);
	  //   $this.remoteMessage = $this.remoteMessage;
	  // });
	  $this.remoteconn.on('data', (data)=>{
			$this.remoteMessage = data;
			console.log('Received', data);
			document.querySelector('.messageBox').innerHTML = data;
			// $this.receive(data)
		})
	});
  }

  send(data){
  	this.remoteconn.send(data);
  }

  receive(data){
	this.remoteMessage = data;
  }


  copyInputMessage(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
