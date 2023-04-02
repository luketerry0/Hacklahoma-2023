// keep track of players connected, index should correspond to player number
export var players: number[] = []
import gameSocketConnection from './gameSocket';

export default function controllerSocket(app : any){
    app.ws('/', function(ws: any, req: any) {
        // when a new player is connected, send a message to that player with their number
        players.push(players.length + 1);
        ws.send(JSON.stringify({"player_num": players.length + 1}));

        ws.on('message', function(msg : any) {
          // figure out what the endpoint should do
          const contents = JSON.parse(msg);

          switch(contents["TYPE"]){
          case "DISCONNECT":
            // remove player from active players list
            players.splice(players.indexOf(contents["PLAYER"]),1)
            break;
          case "BUTTON":
            // code block
            break;
          case "JOYSTICK":
            console.log(contents)
            break;
          default:
            // code block
          }
        });
      });
}