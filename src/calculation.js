  function moveRoomba(move, input, loc, dirt, wallsHit) {
    //if it's a vertical move
    if (move.y) {
      //to see if the first array is out of bounds
      if(input[loc[0]+move.y] === undefined) {
          return ({loc: [loc[0], loc[1]], dirt: false, wallsHit: true});
      }
      //if the move moving to an empty space
      else if (input[loc[0]+move.y][loc[1]] === "") {
        return ({loc: [loc[0]+move.y, loc[1]], dirt: false, wallsHit: false});
      }
      //if trash is in the space
      else if (input[loc[0]+move.y][loc[1]] === "*") {
        return ({loc: [loc[0]+move.y, loc[1]], dirt: true, wallsHit: false});
      }
      //Invalid move, wall hit
      else {
        return ({loc: [loc[0]+move.y, loc[1]], dirt: false, wallsHit: true});
  
      }
    }
    else if (move.x) {
      //if the move moving to an empty space
      
      if (input[loc[0]][loc[1]+move.x] === "") {
  
        return ({loc: [loc[0], loc[1]+move.x], dirt: false, wallsHit: false});
      }
      //if trash is in the space
      else if (input[loc[0]][loc[1]+move.x] === "*") {
        return ({loc: [loc[0], loc[1]+move.x], dirt: true, wallsHit: false});
      }
      //Invalid move, wall hit
      else {
        return ({loc: [loc[0], loc[1]], dirt: false, wallsHit: true});
  
      }
    }
  
  }
  
  //NAVIGATE room
  export default function driveRoomba(input, 
  output, 
  step = 1, 
  loc, 
  totalMoves,
  requirements) {
  
  //if it's no more steps are available
    if (output[output.length-1].step > totalMoves) {
      return { output, requirements, matrix: input };
    }
  
  // if direction is North
    if (requirements.drivingInstructions[output[output.length-1].step-1] === 'N') {
      //UPDATE dirt info
      const updatedInfo = moveRoomba({y:1}, input, output[output.length-1].loc, output[output.length-1].dirt, output[output.length-1].wallsHit);
  
    //add updated info to output
      output.push({
        step: step+1, 
        loc: updatedInfo.loc, 
        dirt: updatedInfo.dirt?  
              output[output.length-1].dirt+1 : 
              output[output.length-1].dirt, 
        wallsHit: updatedInfo.wallsHit? 
                  output[output.length-1].wallsHit+1 : 
                  output[output.length-1].wallsHit, 
        action: updatedInfo.wallsHit? '' : "N"
      });
    }
    // if direction is South
    else if (requirements.drivingInstructions[output[output.length-1].step-1] === 'S') {
      const updatedInfo = moveRoomba({y:-1}, input, output[output.length-1].loc, output[output.length-1].dirt, output[output.length-1].wallsHit);
  
      output.push({
        step: step+1, 
        loc: updatedInfo.loc, 
        dirt: updatedInfo.dirt?  
              output[output.length-1].dirt+1 : 
              output[output.length-1].dirt, 
        wallsHit: updatedInfo.wallsHit? 
                  output[output.length-1].wallsHit+1 : 
                  output[output.length-1].wallsHit,
        action: updatedInfo.wallsHit? '' : "S"
      });
    }
    // if direction is East
    else if (requirements.drivingInstructions[output[output.length-1].step-1] === 'E') {
      const updatedInfo = moveRoomba({x:1}, input, output[output.length-1].loc, output[output.length-1].dirt, output[output.length-1].wallsHit);
  
      output.push({
        step: step+1, 
        loc: updatedInfo.loc, 
        dirt: updatedInfo.dirt?  
              output[output.length-1].dirt+1 : 
              output[output.length-1].dirt,       
        wallsHit: updatedInfo.wallsHit? 
                  output[output.length-1].wallsHit+1 : 
                  output[output.length-1].wallsHit,  
        action: updatedInfo.wallsHit? '' : "E"
      });
    }
    // if direction is West
    else if (requirements.drivingInstructions[output[output.length-1].step-1] === 'W') {
      const updatedInfo = moveRoomba({x:-1}, input, output[output.length-1].loc, output[output.length-1].dirt, output[output.length-1].wallsHit);
  
      output.push({
        step: step+1, 
        loc: updatedInfo.loc, 
        dirt: updatedInfo.dirt?  
              output[output.length-1].dirt+1 : 
              output[output.length-1].dirt,        
        wallsHit: updatedInfo.wallsHit? 
                  output[output.length-1].wallsHit+1 : 
                  output[output.length-1].wallsHit, 
        action: updatedInfo.wallsHit? '' : "W"
      });
    }

return driveRoomba(input, output, (step+1), output[output.length-1].loc, totalMoves, requirements);
}
  
