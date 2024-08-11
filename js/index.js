
        document.getElementById('downloadForm').addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah form dari reload halaman

            const videoUrl = document.getElementById('videoUrl').value;
            const apiUrl = `https://fbdown.vercel.app/api/get?url=${encodeURIComponent(videoUrl)}`;

            // Mengambil elemen result dan error
            const resultDiv = document.getElementById('result');
            const errorDiv = document.getElementById('error');

            // Mengosongkan elemen result dan error sebelum mengirim permintaan
            resultDiv.innerHTML = '';
            errorDiv.textContent = '';

            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Gagal mendapatkan link video. Pastikan URL video dapat diakses secara publik.');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.hd || data.sd) {
                        if (data.hd) {
                            resultDiv.innerHTML += `<a href="${data.hd}" target="_blank">Download Video HD</a>`;
                            console.log(data.hd)
                        }
                        if (data.sd) {
                            resultDiv.innerHTML += `<a href="${data.sd}" target="_blank">Download Video SD</a>`;
                            console.log(data.sd)
                        }
                    } else {
                        throw new Error('Tidak ditemukan link download untuk video ini.');
                    }
                })
                .catch(error => {
                    console.error(error);
                    errorDiv.textContent = error.message;
                });
        });
    