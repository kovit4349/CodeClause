const imageInput = document.getElementById('image-input');
const originalImage = document.getElementById('original-image');
const resultImage = document.getElementById('result-image');
const removeBackgroundBtn = document.getElementById('remove-background-btn');

let originalImageUrl = null;
let resultImageUrl = null;

// Display the selected image
imageInput.addEventListener('change', function() {
	const file = imageInput.files[0];
	const reader = new FileReader();

	reader.addEventListener('load', function() {
		originalImageUrl = reader.result;
		originalImage.setAttribute('src', originalImageUrl);
	});

	reader.readAsDataURL(file);
});

// Remove the background from the selected image
removeBackgroundBtn.addEventListener('click', function() {
	if (originalImageUrl !== null) {
		// Show a loading spinner while the image is being processed
		resultImage.setAttribute('src', 'loading.gif');

		// Create a FormData object with the image file
		const formData = new FormData();
		formData.append('image_file', imageInput.files[0]);

		// Call the removeBackground API to remove the background from the image
		fetch('https://api.remove.bg/v1.0/removebg', {
			method: 'POST',
			headers: {
				'X-Api-Key': 'jqbjuXSHn1W9HokDjrQUpxcT'				//Put your own API key here
			},
			body: formData
		})
		.then(response => response.blob())
		.then(blob => {
			// Display the resulting image
			resultImageUrl = URL.createObjectURL(blob);
			resultImage.setAttribute('src', resultImageUrl);
		})
		.catch(error => {
			console.error(error);
			alert('There was an error processing the image.');
			resultImage.setAttribute('src', '');
		});
	}
});
