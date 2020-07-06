let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let ta = document.getElementById("text")
let img_div = document.getElementById("img_div")

function generateGif() {
  let img_tab = [];
  
  img_tab[0] = updateCanvas(30, ta.value)
  img_tab[1] = updateCanvas(35, ta.value)
  img_tab[2] = updateCanvas(40, ta.value)
  img_tab[3] = updateCanvas(35, ta.value)
  
  gifshot.createGIF({
    'images': img_tab
  },function(obj) {
    if(!obj.error) {
      var image = obj.image,
      animatedImage = document.createElement('img');
      animatedImage.src = image;
      
      img_div.innerHTML = ""
      img_div.appendChild(animatedImage);
    }
  });
}

function updateCanvas(taille, text) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgb(254,254,254)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "black";
  ctx.font = taille + "px Arial";
  
  line = text.split("\n");
  
  line.forEach((l, i) => {
    ctx.fillText(l, 10, (taille+5) * (i+1));
  })

  return canvas.toDataURL();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.split(' ');
  var line = '';

  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}