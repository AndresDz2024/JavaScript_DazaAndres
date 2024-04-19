function solveNQueens(n, firstQueenRow = 0, firstQueenCol = 0) {
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    let solutionFound = false; // Variable para rastrear si se encontró una solución
    let solution = null; // Almacenará la solución encontrada
  
    function isSafe(row, col) {
      // Check row
      for (let i = 0; i < row; i++) {
        if (board[i][col] === 'Q') {
          return false;
        }
      }
  
      // Check upper diagonal
      for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 'Q') {
          return false;
        }
      }
  
      // Check lower diagonal
      for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
        if (board[i][j] === 'Q') {
          return false;
        }
      }
  
      return true;
    }
  
    function placeQueens(row) {
      if (row === n) {
        // Se ha encontrado una solución
        solution = [...board.map(row => [...row])];
        solutionFound = true;
        return;
      }
  
      // Iniciar desde firstQueenCol solo si es la primera fila
      let startCol = (row === firstQueenRow) ? firstQueenCol : 0;
  
      for (let col = startCol; col < n; col++) {
        if (isSafe(row, col)) {
          board[row][col] = 'Q';
          placeQueens(row + 1);
          if (solutionFound) return; // Si se encontró una solución, detener el proceso
          board[row][col] = '.';
        }
      }
    }
  
    placeQueens(0);
    return solution; // Devolver la solución encontrada
  }
  
  const n = 8;
  let firstQueenRow = parseInt(prompt("Ingrese la fila de la primera reina (1-8):")) - 1;
  let firstQueenCol = parseInt(prompt("Ingrese la columna de la primera reina (1-8):")) - 1;
  
  // Verificar si las posiciones ingresadas son válidas
  if (firstQueenRow < 0 || firstQueenRow >= n || firstQueenCol < 0 || firstQueenCol >= n) {
    console.log("Posición de reina inválida. Por favor, ingrese números del 1 al 8.");
  } else {
    const solution = solveNQueens(n, firstQueenRow, firstQueenCol);
  
    // Verificar si se encontró una solución con la reina en la posición especificada
    if (solution) {
      // Imprimir la solución encontrada
      console.log("Solución encontrada:");
      solution.forEach(row => console.log(row.join(' ')));
    } else {
      console.log("Una solución con esa reina en esa posición no existe.");
    }
  }
  