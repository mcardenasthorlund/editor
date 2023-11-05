class Aplicacion {

    imagen;
    
    constructor() {


        this.imagen = document.getElementById("imgPreview");
        this.filtrar();
        document.getElementById("rng-saturacion").addEventListener("input", this.filtrar.bind(this));
        document.getElementById("rng-brillo").addEventListener("input", this.filtrar.bind(this));
        document.getElementById("rng-contraste").addEventListener("input", this.filtrar.bind(this));
        document.getElementById("rng-opacidad").addEventListener("input", this.filtrar.bind(this));
        document.getElementById("rng-blur").addEventListener("input", this.filtrar.bind(this));
        document.getElementById("rng-gris").addEventListener("input", this.filtrar.bind(this));

        document.getElementById('btn-saturacion').addEventListener("click", () => {
            this.mostrarFiltro(document.getElementById('saturacion'), 'SATURACION');
        });
        document.getElementById('btn-brillo').addEventListener("click", () => {
            this.mostrarFiltro(document.getElementById('brillo'), 'BRILLO');
        });
        document.getElementById('btn-contraste').addEventListener("click", () => {
            this.mostrarFiltro(document.getElementById('contraste'), 'CONTRASTE');
        });
        document.getElementById('btn-opacidad').addEventListener("click", () => {
            this.mostrarFiltro(document.getElementById('opacidad'), 'OPACIDAD');
        });
        document.getElementById('btn-blur').addEventListener("click", () => {
            this.mostrarFiltro(document.getElementById('blur'), 'BLUR');
        });
        document.getElementById('btn-gris').addEventListener("click", () => {
            this.mostrarFiltro(document.getElementById('gris'), 'GRIS');
        });
        document.getElementById('btn-descargar').addEventListener("click", () => {
            this.descargar();
        });
    }

    preview(event) {

        console.log('En preview');
        if (event.target.files.length > 0) {
            var src = URL.createObjectURL(event.target.files[0]);
            var preview = document.getElementById("imgPreview");
            preview.src = src;
            preview.style.display = "block";

            document.getElementById('btn-descargar').style.display = 'flex';
        }
    }

    filtrar() {

        console.log('En filtrar');
        document.getElementById('imgPreview').style.filter = 'saturate(' + document.getElementById("rng-saturacion").value + '%) ';
        document.getElementById('imgPreview').style.filter += 'brightness(' + document.getElementById("rng-brillo").value + '%) ';
        document.getElementById('imgPreview').style.filter += 'contrast(' + document.getElementById("rng-contraste").value + '%) ';
        document.getElementById('imgPreview').style.filter += 'blur(' + document.getElementById("rng-blur").value + 'px) ';
        document.getElementById('imgPreview').style.filter += 'grayscale(' + document.getElementById("rng-gris").value + '%) ';
        document.getElementById('imgPreview').style.filter += 'opacity(' + document.getElementById("rng-opacidad").value + ') ';

        document.getElementById('lbl-saturacion').innerHTML = document.getElementById("rng-saturacion").value + '%';
        document.getElementById('lbl-brillo').innerHTML = document.getElementById("rng-brillo").value + '%';
        document.getElementById('lbl-contraste').innerHTML = document.getElementById("rng-contraste").value + '%';
        document.getElementById('lbl-opacidad').innerHTML = document.getElementById("rng-opacidad").value;
        document.getElementById('lbl-blur').innerHTML = document.getElementById("rng-blur").value + 'px';
        document.getElementById('lbl-gris').innerHTML = document.getElementById("rng-gris").value + '%';
    }

    mostrarFiltro(div, nombre) {
        document.querySelectorAll('.div-filtro').forEach(element => {
            element.style.display = 'none';
        });

        div.style.display = 'block';
        document.getElementById('tipo-filtro').innerHTML = nombre;
        document.getElementById('valor-filtro').style.display = 'inline';
    }

    descargar() {

        //console.log(this.imagen.style.filter);
        var canvas = document.getElementById('image');
        canvas.width = document.getElementById('imgPreview').naturalWidth;
        canvas.height = document.getElementById('imgPreview').naturalHeight;
        var ctx = canvas.getContext('2d');
        ctx.filter = document.getElementById('imgPreview').style.filter;// "sepia(20%)";
        ctx.drawImage(document.getElementById('imgPreview'), 0, 0, canvas.width, canvas.height);

        var image = canvas.toDataURL('image/png');

        // Create a link
        var aDownloadLink = document.createElement('a');
        // Add the name of the file to the link
        aDownloadLink.download =  this.uuidv4() + '.png';
        // Attach the data to the link
        aDownloadLink.href = image;
        // Get the code to click the download link
        aDownloadLink.click();

    }

    uuidv4() { 
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g, function (c) { 
            const r = Math.random() * 16 | 0,  
                v = c == 'x' ? r : (r & 0x3 | 0x8); 
            return v.toString(16); 
        }); 
    }

}