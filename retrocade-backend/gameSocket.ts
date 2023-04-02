// keep track of players connected, index should correspond to player number
var dims: any = []
let positions : Array<Array<Number>> = [];
export var gameSocketConnection : WebSocket[] = [];

import players from './controllerSocket';

export default function gameSockets(app : any){
    app.ws('/game', function(ws: any, req: any) {

        // expose websocket
        gameSocketConnection.push(ws);

        ws.on('message', function(msg : any) {
          // figure out what the endpoint should do
          const contents = JSON.parse(msg);

          switch(contents["MODE"]){
          case "INITIALIZE":
            // remove player from active players list
            dims = [contents["WINDOW_X"],contents["WINDOW_Y"]];

            // calculate initial positions
            for (let i = 0; i < players.length; i++){
                let pos = [
                    Math.floor(Math.random() * dims[0]),
                    Math.floor(Math.random() * dims[1])
                ]
                positions.push(pos)
            }
            ws.send(JSON.stringify(positions));
            break;
          default:
            // code block
          }
        });
      });
}