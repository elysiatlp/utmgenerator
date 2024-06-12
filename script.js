document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('UTM');
    const outputDiv = document.getElementById('output');
    const copyButton = document.getElementById('copybutton');
    const confirmationLabel = document.createElement('p');
    confirmationLabel.className = 'confirmation-label';
    outputsection.appendChild(confirmationLabel);

    form.addEventListener('submit', function (event) {
        event.preventDefault();  // Prevent form submission
        
        const name = form.elements['name'].value.trim();
        const date = form.elements['date'].value;
        const product = form.elements['product'].value;
        const source = form.elements['source'].value;
        const medium = form.elements['medium'].value;

        if (!date) {
            confirmationLabel.textContent = "Please select a date.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (product === "") {
            confirmationLabel.textContent = "Please select a product.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (source === "") {
            confirmationLabel.textContent = "Please select a source.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        if (medium === "") {
            confirmationLabel.textContent = "Please select a medium.";
            setTimeout(function () {
                confirmationLabel.textContent = '';
            }, 5000);
            return;
        }

        const dateFormatted = date.split('-').reverse().join('');
        let generatedString = `?utm_campaign=${dateFormatted}-${source}-${product}&utm_medium=${medium}&utm_source=${source}`;
        
        if (name) {
            generatedString = `?utm_campaign=${dateFormatted}-${source}-${name}-${product}&utm_medium=${medium}&utm_source=${source}`;
        }

        outputDiv.textContent = generatedString;
        copyButton.disabled = false;
    });

    copyButton.addEventListener('click', function () {
        const generatedString = outputDiv.textContent;

        navigator.clipboard.writeText(generatedString).then(function () {
            confirmationLabel.textContent = "UTM copied to clipboard";
        }).catch(function (err) {
            confirmationLabel.textContent = "Failed to copy UTM";
        });

        setTimeout(function () {
            confirmationLabel.textContent = '';
        }, 5000);
    });
});
