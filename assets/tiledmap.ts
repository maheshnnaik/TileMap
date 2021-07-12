
import { _decorator, Component, Node } from 'cc';
import * as cc from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tiledmap')
export class Tiledmap extends Component {
    
    @property
    tilemap = null;

    @property(cc.Camera)
    stageCam: cc.Camera = null;
    start () {
        this.tilemap = this.node.getComponent(cc.TiledMap);
        console.log(this.tilemap);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN,(e: cc.EventMouse)=>{

            if(this.stageCam && this.tilemap){
                let eloc = e.getLocation()
                let worldLocation = cc.v3()
                
                const inVec:cc.Vec3 = cc.v3(eloc.x, eloc.y, 0)
                // this.stageCam.screenToWorld(inVec, worldLocation)
          
                let ut = this.node.getComponent(cc.UITransform)??undefined
                if(ut){
                  let nodePos:cc.Vec3 = ut.convertToNodeSpaceAR(worldLocation)
                  cc.log(ut.convertToNodeSpaceAR(worldLocation))
          
          
                  let ts = this.tilemap.getTileSize();
                  let ms = this.tilemap.getMapSize();
                  
                  //shift origin to top left 
                  nodePos.x += (ts.width * ms.width) * 0.5
                  nodePos.y += (ts.height * ms.height) * 0.5
                  nodePos.y = (ts.height * ms.height) - nodePos.y
                  nodePos.x = Math.floor(nodePos.x/ts.width)
                  nodePos.y = Math.floor(nodePos.y/ts.height)
          
                  let layer = this.tilemap.getLayer("bottom")
                  layer?.setTileGIDAt(1, nodePos.x, nodePos.y)
                }
              }


            // var tilePos = new cc.Vec2(0,0);
            // tilePos.x = Math.floor(e.getLocationInView().x / this.tilemap.getTileSize().width); 
            // tilePos.y = Math.floor(e.getLocationInView().y / this.tilemap.getTileSize().height); 

            // var tile1 = this.tilemap.getLayer("bottom");
            // console.log("tile1", tile1);
            // tile1._updateTileForGID(1, -6, -200);
            // var tile1 = this.tilemap.getObjectGroup('bottom');
            // var tile = tile1?.getTileSets()[0];
            // tile1.texGrids.get(1).x += 25;
            // console.log("tile set", tile);
            // tile1.setTileGIDAt(1, 16, 13);
            // console.log("tile layer", tile1);
            
            // if(tile1){
                // const url = "assets/tiled/iso-64x64-building.png";
                // cc.resources.load(url, (err, spriteFrame) => {
                // const node = new Node("New Sprite");
                // const sprite = node.addComponent(Sprite);
                // // tile?.sourceImage = spriteFrame;
                // node.parent = self.node;
                // });
                // console.log("Clicked tile");
                // if(e.getButton() == cc.EventMouse.BUTTON_RIGHT){
                    // this.tilemap.getLayer("bottom");
                    // console.log("Removed");
    //             }
    //         }
     });
    }

    onKeyUp(e: cc.EventKeyboard){
        // toggle between the layer
        var tileasset = this.node.getComponent(cc.TiledMap);
        // console.log(tileasset?.getTileSize());
        if(e.keyCode == cc.macro.KEY.q){
            let layer = tileasset?.getLayer("bottom");
            // layer.enabled = !layer.enabled;
            layer.enabled = !layer.enabled;
            // console.log("Toggled Bottom", layer);
        }
        if(e.keyCode == cc.macro.KEY.w){
            let layer = tileasset?.getLayer("top");
            layer.enabled = !layer.enabled;
        }
            // layer.enabled = !layer.enabled;           
    }
    // update (deltaTime: number) {
    //     // [4]
    // }
}