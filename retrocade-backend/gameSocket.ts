// keep track of players connected, index should correspond to player number
var players: any = []

export default function gameSockets(app : any){
    app.ws('/game', function(ws: any, req: any) {

        ws.on('message', function(msg : any) {
            console.log(msg)
        });
    });
}