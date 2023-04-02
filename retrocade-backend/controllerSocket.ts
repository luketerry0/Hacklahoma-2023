// keep track of players connected, index should correspond to player number
export var players: number[] = []
var dims: any = []
var positions: Array<Array<number>> = [];

export default function controllerSocket(app: any) {
  var HOST: any;
  app.ws('/', function (ws: any, req: any) {
    // when a new player is connected, send a message to that player with their number
    players.push(players.length + 1);
    ws.send(JSON.stringify({ "player_num": players.length + 1 }));

    ws.on('message', function (msg: any) {
      // figure out what the endpoint should do
      const contents = JSON.parse(msg);


      switch (contents["TYPE"]) {
        case "SET_HOST":
          // set the host
          players.pop();
          HOST = ws;

          console.log("SETTING HOST")
          break;
        case "DISCONNECT":
          // remove player from active players list
          players.splice(players.indexOf(contents["PLAYER"]), 1)
          break;
        case "BUTTON":
          // code block
          break;
        case "JOYSTICK":
          // change that ships value
          positions[contents["PLAYER"] - 2][0] += contents["dx_y"][0];
          positions[contents["PLAYER"] - 2][1] += contents["dx_y"][1];
          positions[contents["PLAYER"] - 2][2] = contents["ANGLE"]+Math.PI

          // reset the ship to the other side if it is out of bounds
          const x = positions[contents["PLAYER"] - 2][0]
          const y = positions[contents["PLAYER"] - 2][1]
          if (x < 0){
            positions[contents["PLAYER"] - 2][0] = dims[0];
          }else if (x > dims[0]){
            positions[contents["PLAYER"] - 2][0] = 0;
          }

          if (y < 0){
            positions[contents["PLAYER"] - 2][1] = dims[1];
          }else if (y > dims[1]){
            positions[contents["PLAYER"] - 2][1] = 0;
          }

          // send the new positions
          HOST === undefined ? console.log("wtf?") : HOST.send(JSON.stringify(positions));
          break;

        case "INITIALIZE":
          // remove player from active players list
          dims = [contents["WINDOW_X"], contents["WINDOW_Y"]];

          // calculate initial positions
          positions = [];
          for (let i = 0; i < players.length - 1; i++) {
            let pos = [
              Math.floor(Math.random() * dims[0]),
              Math.floor(Math.random() * dims[1]),
              0
            ]
            positions.push(pos)
          }
          console.log(positions)
          ws.send(JSON.stringify(positions));
          break;

        default:
        // code block
      }
    });
  });
}