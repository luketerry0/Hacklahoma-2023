// keep track of players connected, index should correspond to player number
export var players: number[] = []
var dims: any = []
export var positions: Array<Array<Number>> = [];
export var gameSocketConnection: any;

export default function controllerSocket(app: any) {
  app.ws('/', function (ws: any, req: any) {
    // when a new player is connected, send a message to that player with their number
    players.push(players.length + 1);
    ws.send(JSON.stringify({ "player_num": players.length + 1 }));

    ws.on('message', function (msg: any) {
      // figure out what the endpoint should do
      const contents = JSON.parse(msg);

      switch (contents["TYPE"]) {
        case "DISCONNECT":
          // remove player from active players list
          players.splice(players.indexOf(contents["PLAYER"]), 1)
          break;
        case "BUTTON":
          // code block
          break;
        case "JOYSTICK":
          console.log(gameSocketConnection)
          break;
        case "INITIALIZE":
          // remove player from active players list
          dims = [contents["WINDOW_X"], contents["WINDOW_Y"]];

          // calculate initial positions
          for (let i = 0; i < players.length; i++) {
            let pos = [
              Math.floor(Math.random() * dims[0]),
              Math.floor(Math.random() * dims[1])
            ]
            positions.push(pos)
          }
          ws.send(JSON.stringify(positions));
          break;
        case "SET_HOST":
          console.log(contents);

        break;
        default:
        // code block
      }
    });
  });
}