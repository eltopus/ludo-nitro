import {Piece} from './piece'
import {Player} from './player'
import {ActivePath} from "./activePath"

export class AIPlayer extends Player {
    opposingPlayers: Array<Player>

    constructor(playerName: string, scene: Phaser.Scene) {
       super(playerName, scene)
        this.opposingPlayers = new Array<Player>()
    }

    playerRollDice(): void {
        let value1 =  Phaser.Math.Between(1, 6)
        let value2 =  Phaser.Math.Between(1, 6)
        //value1 = 6
        //value2 = 6
        setTimeout(()=> {
            this.scene.scene.get('SideScene').events.emit('rollDice', value1, value2)
        }, 1000);
    }

    playerPlayDice(activePaths: Array<ActivePath>): void {
        setTimeout(()=> {
            activePaths = activePaths.filter((path)=> {
                return path.isValid && path.activePiece !== null
            })
            activePaths.sort((p1, p2) => (p1.projectedIndex < p2.projectedIndex) ? 1 : -1)
            //activePaths.forEach((path) => console.log(path.pathToString()))

            let randPathIndex = this.getRandomIndex(activePaths)
            let peckingPaths = this.getPeckingPaths(activePaths)
            let passEnemy = this.getPassEnemyPaths(activePaths)
            let enemyAlong = this.getEnemiesAlongPaths(activePaths)
            
            let chosenPath = activePaths[randPathIndex]
            if (peckingPaths.length > 0){
                console.log("Choosing pecking path...............")
                chosenPath = peckingPaths[0]
            }else if (passEnemy.length > 0){
                console.log("Choosing pass enemy path...............")
                chosenPath = passEnemy[0]
            }else if (enemyAlong.length > 0){
                console.log("Choosing enemy along path...............")
                chosenPath = enemyAlong[0]
            }
            if (chosenPath){

            }
            let chosenPiece = chosenPath.activePiece
            this.determineDieId(chosenPath)
            chosenPiece.move(chosenPath.moveBy)
        }, 1000);
    }

    determineDieId(path: ActivePath): void {
        let moveBy = path.moveBy
        let dieOneValue = this.scene.registry.get('die1')
        let dieTwoValue = this.scene.registry.get('die2')
        if (moveBy > 6 || path.moveBy === (dieOneValue + dieTwoValue)){
            //this.scene.registry.set('die1', 0)
            //this.scene.registry.set('die2', 0)
            this.scene.scene.get('SideScene').events.emit('resetBothDice')
        }else {
            if (path.moveBy === dieOneValue){
                //this.scene.registry.set('die1', 0)
                this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die1')
            }
            else if (path.moveBy === dieTwoValue){
                //this.scene.registry.set('die2', 0)
                this.scene.scene.get('SideScene').events.emit('resetSingleDie', 'die2')
            }
        }
    }

    isVadidPath(currentPath: ActivePath, allPaths: Array<ActivePath>) {
        for (let path of allPaths){
          if (path.pathToString() === currentPath.pathToString()){
            return true
          }
        }
        return false
    }

    addOpposingPlayer(player: Player): void {
        if (this.playerName !== player.playerName){
            //console.log("PlayerName: " + this.playerName + " OpposingPlayer " + player.playerName)  
            this.opposingPlayers.push(player)
        }
        
    }
    getPeckingPaths(activePaths: Array<ActivePath>): Array<ActivePath> {
        let peckingPaths = [] 
        for (let player of this.opposingPlayers){
            peckingPaths = peckingPaths.concat(this.determinePeckingSituations(player, activePaths))
        }
        return peckingPaths
    }

    getEnemiesAlongPaths(activePaths: Array<ActivePath>): Array<ActivePath> {
        let ap = activePaths.concat()
        let enemyAlongPath = []
        
        for (let opposingPlayer of this.opposingPlayers){
            let activePieces = this.getAllInActivePiece()
            enemyAlongPath = enemyAlongPath.concat(opposingPlayer.getPiecesAlongHomeIndex(activePieces)) 
        }

        if (enemyAlongPath.length > 0){
            let groupedMap = this.groupByPieceId(enemyAlongPath)
            
            groupedMap = this.groupByLeastValues(groupedMap)
            //console.log(groupedMap)
            let alongPaths = activePaths.filter((path) => {
                return path.filterByJsonInActivePieces(groupedMap) === true
            })
            return alongPaths
        }else {
            //console.log("No enemy along home paths...")
            return []
        }
    }

    getPassEnemyPaths(activePaths: Array<ActivePath>): Array<ActivePath> {
        let ap = activePaths.concat()
        let passEnemyPath = []
        
        for (let opposingPlayer of this.opposingPlayers){
            let activePieces = this.getAllActivePiece()
            passEnemyPath = passEnemyPath.concat(opposingPlayer.getPiecesBetweenIndex(activePieces)) 
        }

        if (passEnemyPath.length > 0){
            let groupedMap = this.groupByPieceId(passEnemyPath)
            groupedMap = this.groupByLeastValues(groupedMap)
            //console.log(groupedMap)
            let enemyPaths = activePaths.filter((path) => {
                return path.filterByJson(groupedMap) === true
            })

            //enemyPaths.forEach((path) => console.log(path.pathToString()))
            //console.log(enemyPaths)
            return enemyPaths
        }else {
            //console.log("No pass enemy paths...")
            return []
        }
    }

    groupByPieceId(jsonPaths: any): any {
        return jsonPaths.reduce(
            (entryMap, e) => entryMap.set(e.playerPieceId, [...entryMap.get(e.playerPieceId)||[], e]),
            new Map())
    }

    groupByLeastValues(jsonPath: any): any {
        let minArr = []
        jsonPath.forEach((path)=> {
             path = path.reduce(function (first, next) {
                if (first.opposingPieceIndex < next.opposingPieceIndex){
                    return first
                }else {
                    return next
                }
             })
             minArr = minArr.concat(path)
          })
        return minArr
          
     }

    sortByOpposingIndex(jsonPath: any): any {
       jsonPath.forEach((path)=> {
            path.sort((j1, j2) => (j1["opposingPieceIndex"] > j2["opposingPieceIndex"]) ? 1 : -1) 
         })
    }

    
    determineEnemyPassSituations(activePaths: Array<ActivePath>, jsonPath: any): ActivePath[]{
        return activePaths.filter((path)=> {
            console.log(path.projectedIndex + " < " + jsonPath['opposingPieceIndex'] + " " + path.activePiece.pieceId)
            return path.activePiece.pieceId === jsonPath['playerPieceId'] && path.projectedIndex < jsonPath['opposingPieceIndex']
        })

    }

    determinePeckingSituations(player: Player, allPaths: Array<ActivePath>): Array<ActivePath> {
        let opposingPieces = player.getAllActivePiece()
        let peckingPaths = []
        for (let piece of opposingPieces){
            peckingPaths = peckingPaths.concat(this.peckingSituations(piece, allPaths))
        }
        return peckingPaths
    }

    peckingSituations(piece: Piece, allPaths: Array<ActivePath>): Array<ActivePath> {
        let peckingPaths = allPaths.filter((path) => {
            return path.projectedIndex === piece.index
        })
        peckingPaths.map((path) => {
            path.rating = 10
        })
        return peckingPaths
    }

    getRandomIndex(activePaths: Array<ActivePath>): number {
        let randPathIndex = Phaser.Math.Between(0, activePaths.length - 1)
        if (randPathIndex < 0){
            randPathIndex = 0
        }
        return randPathIndex       
    }

    getOpposingActivePieces(): Piece[] {
        let pieces = []
        for (let player of this.opposingPlayers){
            pieces = pieces.concat(player.getAllActivePiece())
        }
        return pieces
    }

    getAllActivePaths(activePaths: ActivePath[]): ActivePath[] {
        return activePaths.filter((path)=> {
            return path.activePiece.isActive()
        })
    }
}