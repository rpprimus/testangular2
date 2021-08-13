import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
//import { Message } from '../model/message';
import { Event } from '../config/event.enum';

import * as socketIo from 'socket.io-client';
import { Util } from './util';

@Injectable()
export class SocketIoService {
  
    constructor(private util: Util) { }
    private url = '';  //this.util.socketServerUrl.value;
    private socket;
    private channel = "";
    socketObservale: any;

    sendMessage(message) {
        this.socket.emit('sendMessage', message);
    }

    getMessages() {
        this.channel = this.util.socketChannel.value || 'ORDER_STATUS_TYPES';
        this.url = (<any>window).location.origin;   //comment this line for dev and local and enable the url value
        //console.log('redis URL', this.url);
        //console.log('channel', this.channel);
        return new Observable(observer => {
            // this.socket = new socketIo.connect(this.url, { reconnection: false });
            this.socket = socketIo.connect(this.url, { reconnection: false,transports: ['websocket'], upgrade: false }); //changes done for prod environment
            console.log(this.socket)
            this.socket.emit('setChannel', { channel: this.channel });  //  pass channel to Node server 

            this.socket.on('connect', (value) => {
                //console.log(this.socket, "value", value)
                //console.log("redis server Connected");
            });

            this.socket.on('message', (data) => {
                //console.log("0000000000000000000")
                if (data.channel == this.channel)
                    observer.next(data.data);
            });

            return () => {
                console.log("dis con")
                this.socket.disconnect();
            };
        })
    }
}
