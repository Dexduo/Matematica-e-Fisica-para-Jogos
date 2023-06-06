class vector{
  constructor(){
    //usarei parseInt para truncar em um número inteiro, onde irá facilitar e confiabilizar as operações
    this.x1 = parseInt(random(-200, 200));
    this.y1 = parseInt(random(-200, 200));
    this.x2 = parseInt(random(-200, 200));
    this.y2 = parseInt(random(-200, 200));
  }
  
  drawVector(){
    return arrow(this.x1, this.y1, this.x2, this.y2);
  }
  
}

let vec1;
let vec2;
let colision = false;

var vectorAB
var vectorAC
var vectorAD  
var vectorCD
var vectorCA
var vectorCB

function setup() {
  createCanvas(400, 400);
  vec1 = new vector();
  vec2 = new vector();
  vec1transl = translateOrigin(vec1);
  colisionExist(vec1, vec2);//preciso analisar e corrigir o produto vetorial já que a origem não é no (0, 0) então o que fazer?
}

function draw() {
  goCartesian();
  colore(52, 152, 219)
  vec1.drawVector();
  texto("A", vec1.x1, vec1.y1)
  texto("B", vec1.x2, vec1.y2)
  colore(230, 126, 34)
  vec2.drawVector();
  texto("C", vec2.x1, vec2.y1)
  texto("D", vec2.x2, vec2.y2)
  
  /*colore(75, 86, 101)
  arrow(vectorAB.x1, vectorAB.y1, vectorAB.x2, vectorAB.y2)
  arrow(vectorAC.x1, vectorAC.y1, vectorAC.x2, vectorAC.y2)
  arrow(vectorAD.x1, vectorAD.y1, vectorAD.x2, vectorAD.y2)
  
  colore(210, 28, 28)
  arrow(vectorCD.x1, vectorCD.y1, vectorCD.x2, vectorCD.y2)
  arrow(vectorCA.x1, vectorCA.y1, vectorCA.x2, vectorCA.y2)
  arrow(vectorCB.x1, vectorCB.y1, vectorCB.x2, vectorCB.y2)*/
  
  if(colision == true){
    texto("Colisão Existe", 0, 0);
  }
  
  /*texto("A", vectorAB.x1+5, vectorAB.y1+5)
  texto("B", vectorAB.x2, vectorAB.y2)
  texto("C", vectorCD.x1-10, vectorCD.y1-10)
  texto("D", vectorCD.x2, vectorCD.y2)*/
 
}

//-------------------------------------------------
function calc_n_colision(vec1, vec2){
  let vector1;
  vector1 = {...vec1}; //já é o próprio vetor AB
  let vector2;
  vector2 = {...vec2}; //será o vetor AC
  
  vector2.x2 = vector2.x1;
  vector2.y2 = vector2.y1;
  vector2.x1 = vector1.x1;
  vector2.y1 = vector1.y1;
  
  console.log(vector1);
  console.log(vector2);
  
  return prodVec(vector1, vector2);

}
//-------------------------------------------------
function prodVec(vector1, vector2){
  //se estamos em 2D o produto vetorial produz apenas a cordenada Z
  let productVector = (vector1.x2*vector2.y2) - (vector1.y2*vector2.x2);
  console.log(productVector)
  return productVector;
}
//-------------------------------------------------
function colisionExist(vector1, vector2){
  //AB x AC e AB x AD tem mesmo sinal? então sem interseção
  //CD x CA e CD x CB tem mesmo sinal? então sem interseção
  
  vectorAB = {...vector1}; //já é o próprio vetor AB
  vectorAC = {...vector1}; //será o vetor AC
  vectorAC.x2 = vector2.x1; vectorAC.y2 = vector2.y1;
  vectorAD = {...vector1}; //será o vetor AD
  vectorAD.x2 = vector2.x2; vectorAD.y2 = vector2.y2;
  
  vectorCD = {...vector2}
  vectorCA = {...vector2}
  vectorCA.x2 = vector1.x1; vectorCA.y2 = vector1.y1;
  vectorCB = {...vector2}
  vectorCB.x2 = vector1.x2; vectorCB.y2 = vector1.y2;
  
  console.log(vectorAB);
  console.log(vectorAC);
  console.log(vectorAD);
  console.log(vectorCD);
  console.log(vectorCA);
  console.log(vectorCB);
  
  vectorAB = translateOrigin(vectorAB);
  vectorAC = translateOrigin(vectorAC);
  vectorAD = translateOrigin(vectorAD);
  vectorCD = translateOrigin(vectorCD);
  vectorCA = translateOrigin(vectorCA);
  vectorCB = translateOrigin(vectorCB);
  
  console.log("AB:", vectorAB);
  console.log("AC:", vectorAC);
  console.log("AD:", vectorAD);
  console.log("CD:", vectorCD);
  console.log("CA:", vectorCA);
  console.log("CB:", vectorCB);
  
  //ESSA VERIFICAÇÃO MUITO PROVAVELMENTE ESTÁ ERRADA, REVISAR.
  //OU ENTÃO A TRANSLADAÇÃO PARA A ORIGEM
  
  if(
    ((prodVec(vectorAB, vectorAC) >= 0 && prodVec(vectorAB, vectorAD) < 0) || (prodVec(vectorAB, vectorAC) < 0 && prodVec(vectorAB, vectorAD) >= 0))
    &&
    ((prodVec(vectorCD, vectorCA) >= 0 && prodVec(vectorCD, vectorCB) < 0) || (prodVec(vectorCD, vectorCA) < 0 && prodVec(vectorCD, vectorCB) >= 0))
    ){
    colision = true
    console.log("Entrou AB e CD verdadeiro");
    return
  }
  console.log("Finalizou laço")
  return
  
}
//-------------------------------------------------
  
function translateOrigin(vectorOriginal){ //Translada os segmentos partindo da origem (0,0); usamos para calcularmos p produto vetorial.
  var vector = {...vectorOriginal};
  
  vector.x2 = vector.x2-vector.x1;
  vector.y2 = vector.y2-vector.y1;
  
  vector.x1 = 0;
  vector.y1 = 0;
  
  return vector;
}
//-------------------------------------------------

function goCartesian()
{
  background(255)
  
  mouseXC = mouseX - width/2
  mouseYC = height/2 - mouseY
  
  colore(213, 216, 220)
  arrow(0,height/2,width, height/2)
  colore(213, 216, 220)
  arrow(width/2,height,width/2, 0)
  
  translate(width/2,height/2)
  scale(1,-1,1)  
}

//precisamos redeclarar colore, pois, como a utilizamos em goCartesian() e essas e essas funções são iniciadas antes do draw() é como se colore ainda não existisse (comente a função e veja).
function colore(c1,c2,c3,c4)
{
  if(c4 != null)
  {
    fill(c1,c2,c3,c4)
    stroke(c1,c2,c3,c4)
    return
  }
  if(c3 != null)
  {
    fill(c1,c2,c3)
    stroke(c1,c2,c3)
    return
  }
  
  if(c2 == null )
  {
    fill(c1)
    stroke(c1)
  }
  else
  {
    fill(c1,c1,c1,c2)
    stroke(c1,c1,c1,c2)
  }    
}
    
function arrow(x1,y1,x2,y2)
{
  line(x1,y1,x2,y2)
  var dx = x2-x1, dy = y2-y1
  var le = sqrt(dx*dx + dy*dy)
  var vx = dx/le, vy = dy/le
  var ux = -vy
  var uy = vx
  triangle(x2,y2,
           x2-5*vx+2*ux, y2-5*vy+2*uy,
           x2-5*vx-2*ux, y2-5*vy-2*uy)
}
    
function texto(str,x,y)
{
  push()
    resetMatrix();
    translate(width/2,height/2)
    // desenha o texto normalmente
    text(str,x,-y)
  pop()
}