window.onload = function() {
    
    function imageManager() {

        var image;
        var canvas;
        var context;
        var button;
        var input;
        var fileButton;
        var body;
        var download;

        var event;

        var canvasWidth;
        var canvasHeight;
        var frame;
        var image;
        var x, y;

        this.init = function() {
            this.cacheHTML();
            this.uploadImage();
            this.dragImage();
            this.saveImage();
            this.bgAnimation();
        }

        this.cacheHTML = function() {
            canvas     = document.getElementById('canvas');
            context    = canvas.getContext('2d');
            button     = document.getElementById('upload');
            // input      = document.getElementById('path');
            fileButton = document.getElementById('file');
            range      = document.getElementById('range');
            download   = document.getElementById('download');
            
            body       = document.body;

            canvasWidth  = canvas.width;
            canvasHeight = canvas.height;


            context.webkitImageSmoothingEnabled = false;
            context.mozImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false; 

            frame = new Image();
            frame.setAttribute('crossOrigin', 'anonymous');
        
            frame.onload = function() {
                drawFrame();
            }

            frame.src = 'https://raw.githubusercontent.com/gapgag55/Salaya-tour-2017-profile/master/images/frame2.png';

        }

        this.uploadImage = function() {
            fileButton.addEventListener('change', readURL, true);

            button.addEventListener("click", function() {
                fileButton.click();
            });

            // input.addEventListener('change', function() {
            //     drawCanvas(input.value);
            // })
        }

        this.dragImage = function() {
            var isDragging = false;

            // Start point = mousedown
            var dragX;
            var dragY;

            // Move point = mousemove
            var moveX;
            var moveY;

            // Rezize 
            var width;
            var height;

            mousedown = mobileEvent("touchstart", "mousedown");
            canvas.addEventListener(mousedown, function(e) {
                isDragging = true;

                if(mousedown == "touchstart") {
                    dragX = e.touches[0].pageX;
                    dragY = e.touches[0].pageY;
                    return;
                } 

                dragX = e.clientX;
                dragY = e.clientY;
            })

            mouseup = mobileEvent("touchend", "mouseup");
            body.addEventListener(mouseup, function() {
                isDragging = false;
                x = moveX;
                y = moveY;
            })

            mousemove = mobileEvent("touchmove", "mousemove");
            body.addEventListener(mousemove, function(e) {
              
                if(isDragging) {

                    if(mousemove == "touchmove") {
                        moveX = x + (e.touches[0].pageX - dragX);
                        moveY = y + (e.touches[0].pageY - dragY);
                    } else {
                        moveX = x + (e.clientX - dragX);
                        moveY = y + (e.clientY - dragY);
                    }

                    if(!width && !height) {
                        width = image.width;
                        height = image.height;
                    }
                    
                    context.clearRect(0, 0, canvasWidth, canvasHeight);
                    context.drawImage(image, moveX, moveY, width, height);
                    drawFrame();
                }
            })

            range.addEventListener('input', function() {
                x = 0;
                y = 0;

                moveX = x;
                moveY = y;

                width =  (this.value/100) * image.width
                height = (this.value/100) * image.height

                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(image, x, y, width, height);
                drawFrame();
            })
        }

        this.saveImage = function() {
            download.addEventListener("click", function() {
                var image = canvas.toDataURL("image/png")
                this.href = image;
            })
        }

        this.bgAnimation = function() {
            var partNum = 70;


            var c = document.getElementById('c');
            var ctx = c.getContext('2d');

            var w = window.innerWidth;
            var h = window.innerHeight;

            var mouse = {
            x: w / 2, 
            y: 0
            };

            document.addEventListener('mousemove', function(e){ 
                mouse.x = e.clientX || e.pageX; 
                mouse.y = e.clientY || e.pageY 
            }, false);

            var particles = [];
            for(i = 0; i < partNum; i++) {
            particles.push(new particle);
            }

            function particle() {
            this.x = Math.random() * w - w / 5;
            this.y = Math.random() * h;
            
            this.r = Math.random() * 7.5 + 3.25;
            }

            var draw = function() {
            c.width = w;
            c.height = h;
            
            for(t = 0; t < particles.length; t++) {
                var p = particles[t];
                var nowX = p.r + mouse.x / 4.6;
                var nowY = p.r + mouse.y / 4.6;
                var color = 'rgba(255, 255, 255, .3)';
                
                if(p.r < 10) {
                nowX = p.x + mouse.x / 0.5;
                nowY = p.y + mouse.y / 0.5;
                };
                if(p.r < 9) {
                nowX = p.x + mouse.x / 2;
                nowY = p.y + mouse.y / 2;
                };
                if(p.r < 8) {
                nowX = p.x + mouse.x / 3.5;
                nowY = p.y + mouse.y / 3.5;
                };
                if(p.r < 7) {
                nowX = p.x + mouse.x / 5;
                nowY = p.y + mouse.y / 5;
                };
                if(p.r < 6) {
                nowX = p.x + mouse.x / 6.5;
                nowY = p.y + mouse.y / 6.5;
                };
                if(p.r < 5) {
                nowX = p.x + mouse.x / 8;
                nowY = p.y + mouse.y / 8;
                };
                if(p.r < 4) {
                nowX = p.x + mouse.x / 9.5;
                nowY = p.y + mouse.y / 9.5;
                };
                if(p.r < 3) {
                nowX = p.x + mouse.x / 11;
                nowY = p.y + mouse.y / 11;
                };
                if(p.r < 2) {
                nowX = p.x + mouse.x / 12.5;
                nowY = p.y + mouse.y / 12.5;
                };
                if(p.r < 1) {
                nowX = p.x + mouse.x / 15;
                nowY = p.y + mouse.y / 15;
                };
                
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.arc(nowX, nowY, p.r, Math.PI * 2, false);
                ctx.fill();
            }
            }

            setInterval(draw, 33);
        }

        /* Private function */
        var readURL = function() {
            var file   = fileButton.files[0];
            var reader = new FileReader();

            function _base64ToArrayBuffer(base64) {
                var binary_string = window.atob(base64.split(",")[1]);
                var len = binary_string.length;
                var bytes = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
                }
                return bytes.buffer;
            }

            reader.onloadend = function() {
                drawCanvas(this.result)
            }
            reader.readAsDataURL(file);
        }


        var drawCanvas = function(url) {
            image = new Image()
            x = 0;
            y = 0;

            image.src = url;

            image.onload = function() {
                context.drawImage(image, 0, 0)
                drawFrame();
            }

        }

        var drawFrame = function() {
            var x = 0;
            var y = 0;
            var width  = 400;
            var height = 400;
            context.drawImage(frame, x, y, width, height);
        }

        var mobileEvent = function(mobile, browser) {
            console.log()
            return (navigator.userAgent.match(/(Android|iPod|iPhone|iPad)/i)) ? mobile : browser;
        }

    }

    (new imageManager()).init();
}

var randomColor = function() {
    var colors = ['#27ae60', '#3498db', '#9b59b6', '#e74c3c', '#f39c12'];
    document.body.style.backgroundColor = colors[Math.round(
        Math.random() * colors.length
    )];
}

randomColor();