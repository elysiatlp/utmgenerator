document.addEventListener('DOMContentLoaded', function () {
    const utmForm = document.getElementById('UTM');
    const utmoutputDiv = document.getElementById('utmoutput');
    const copyButton = document.getElementById('copybutton');
    const utmconfirmationLabel = document.createElement('p');
    utmconfirmationLabel.className = 'confirmation-label';
    utmoutputsection.appendChild(utmconfirmationLabel);

    utmForm.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission
        
        const name = utmForm.elements['name'].value.trim();
        const date = utmForm.elements['date'].value;
        const product = utmForm.elements['product'].value;
        const source = utmForm.elements['source'].value;
        const medium = utmForm.elements['medium'].value;

        if (!date) {
            utmconfirmationLabel.textContent = "Please select a date.";
            setTimeout(function () {
                utmconfirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (product === "") {
            utmconfirmationLabel.textContent = "Please select a product.";
            setTimeout(function () {
                utmconfirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (source === "") {
            utmconfirmationLabel.textContent = "Please select a source.";
            setTimeout(function () {
                utmconfirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (medium === "") {
            utmconfirmationLabel.textContent = "Please select a medium.";
            setTimeout(function () {
                utmconfirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        const dateFormatted = date.split('-').reverse().join('');
        let generatedString = `?utm_campaign=${dateFormatted}-${source}-${product}&utm_medium=${medium}&utm_source=${source}`;
        
        if (name) {
            generatedString = `?utm_campaign=${dateFormatted}-${source}-${name}-${product}&utm_medium=${medium}&utm_source=${source}`;
        }

        utmoutputDiv.textContent = generatedString;
        copyButton.disabled = false;
    });

    copyButton.addEventListener('click', function () {
        const generatedString = utmoutputDiv.textContent;

        navigator.clipboard.writeText(generatedString).then(function () {
            utmconfirmationLabel.textContent = "UTM copied to clipboard";
        }).catch(function (err) {
            utmconfirmationLabel.textContent = "Failed to copy UTM";
        });

        setTimeout(function () {
            utmconfirmationLabel.textContent = '';
        }, 5000);
    });
});