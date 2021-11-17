let timer = null;
const max = 3;
let count = 0;
let eTime;

const APPLICATION_KEY = "e0bd460ddaa733fb60fa17d76805eb473c049abcb4e95b57208d408034dce139";
const CLIENT_KEY = "4269fe883a87cfb7bcad851004edca12ffdbd3fb4c03234ede73d36fb3d30da8";
const ncmb = new NCMB(APPLICATION_KEY,CLIENT_KEY);
const DBName = "GameScore";

let GameScore = ncmb.DataStore(DBName);

function init() {
  if (timer == null) {
    start = new Date();
    time();
    gameStart();
  }
}

function gameStart() {
  let size = 5;
  let qNum =Math.floor(Math.random()*q.length);
  for(let i=0;i<size*size;i++){
    let s = document.createElement("span");
    s.textContent = q[qNum][0];
    s.setAttribute("id", "num"+i);

    s.addEventListener('click',function () {
      if(this.textContent == q[qNum][1]){
        correct.play();
        while(cells.firstChild){
          cells.removeChild(cells.firstChild)
        }
        count++;
        if(count<max){
          gameStart();
        }else{

          save();
          load();
          clearTimeout(timer);
        }
      }else{
        wrong.play();
      }
    });

    cells.appendChild(s);
    if(i % size == size -1){
      const br = document.createElement("br");
      cells.appendChild(br);
    }
  }
  let p = Math.floor(Math.random()*size*size);
  let ans = document.getElementById("num"+p);

  ans.textContent = q[qNum][1];
}

function time() {
  let now = new Date();
  eTime = parseInt((now.getTime() - start.getTime())/1000);
  score.textContent = eTime;
  timer = setTimeout("time()",1000);
}

function save(){
  let test = new GameScore();
  let key = "score";
  let value = eTime;
  test.set(key, parseInt(value));
  test.save()
  .then(function(){
    console.log("成功");
  })
  .catch(function(err){
    console.log("エラー発生：" + err);
  });
}
function load(){
  GameScore
  .order("score")
  .fetchAll()
  .then(function(results){
    if(eTime<results[0].score){
      alert("ハイスコア");
    }else{
      alert("クリア");
    }
  })
  .catch(function(err){
    console.log("エラー発生：" + err);
  });
}
