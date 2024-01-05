document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('video');
    const audios = document.querySelectorAll('audio');
    const imagenesExpandibles = document.querySelectorAll('.expandible');
    const modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);

    imagenesExpandibles.forEach(imagen => {
        imagen.addEventListener('click', function () {
            const descripcion = imagen.alt;
            mostrarModal(imagen.src, descripcion);
        });
    });

    modal.addEventListener('click', function () {
        cerrarModal();
    });

    function mostrarModal(src, descripcion) {
        const imagenModal = document.createElement('img');
        imagenModal.src = src;
        imagenModal.alt = descripcion;

        const descripcionModal = document.createElement('p');
        descripcionModal.textContent = descripcion;

        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', function () {
            cerrarModal();
        });

        modal.innerHTML = '';
        modal.appendChild(imagenModal);
        modal.appendChild(descripcionModal);
        modal.appendChild(closeBtn);
        modal.style.display = 'flex';
    }

    function cerrarModal() {
        modal.style.display = 'none';
    }

    function togglePlay() {
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    }

    videos.forEach(video => {
        video.addEventListener('click', togglePlay);
    });

    audios.forEach(audio => {
        audio.addEventListener('click', togglePlay);
    });

    let currentIndex = 0;

    function playNextAudio() {
        if (currentIndex < audios.length) {
            audios[currentIndex].play();
            currentIndex++;

            if (currentIndex > 1) {
                audios[currentIndex - 2].pause();
                audios[currentIndex - 2].currentTime = 0;
            }
        }
    }

    playNextAudio();

    audios.forEach(audio => {
        audio.addEventListener('ended', playNextAudio);
    });
});
